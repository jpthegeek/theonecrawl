// ---------------------------------------------------------------------------
// TheOneCrawl — Media extraction and optimization
// ---------------------------------------------------------------------------

import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { writeFile, mkdir, readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import type { MediaAsset } from './types.js';
import { fetchWithSsrfProtection } from '../shared/ssrf.js';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const MAX_IMAGE_WIDTH = 1920;
const MAX_IMAGE_HEIGHT = 1920;
const JPEG_QUALITY = 82;
const WEBP_QUALITY = 80;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB max download
const DOWNLOAD_TIMEOUT = 15_000;
const MAX_RETRIES = 2;
const CONCURRENT_DOWNLOADS = 5;

// Supported image MIME types
const IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/avif',
  'image/tiff',
  'image/bmp',
]);

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Download, deduplicate, and optimize images from the crawled pages.
 *
 * @param urls - Array of image URLs to process
 * @param outputDir - Directory to store optimized images
 * @returns Array of processed media assets
 */
export async function downloadMedia(
  urls: string[],
  outputDir: string,
): Promise<MediaAsset[]> {
  await mkdir(outputDir, { recursive: true });

  // Deduplicate by URL
  const uniqueUrls = [...new Set(urls.filter(isValidImageUrl))];
  const assets: MediaAsset[] = [];
  const seenHashes = new Map<string, string>(); // hash -> localPath (for content dedup)

  // Process in batches to limit concurrency
  for (let i = 0; i < uniqueUrls.length; i += CONCURRENT_DOWNLOADS) {
    const batch = uniqueUrls.slice(i, i + CONCURRENT_DOWNLOADS);
    const results = await Promise.allSettled(
      batch.map((url) => processImage(url, outputDir, seenHashes)),
    );

    for (const result of results) {
      if (result.status === 'fulfilled' && result.value) {
        assets.push(result.value);
      }
    }
  }

  return assets;
}

/**
 * Generate a thumbnail for a given image buffer.
 */
export async function generateThumbnail(
  inputPath: string,
  outputDir: string,
  maxDim: number = 300,
): Promise<string | null> {
  try {
    const buffer = await readFile(inputPath);
    const ext = extname(inputPath);
    const baseName = inputPath
      .replace(extname(inputPath), '')
      .split('/')
      .pop();

    const thumbPath = join(outputDir, `${baseName}_thumb${ext}`);

    await sharp(buffer)
      .resize(maxDim, maxDim, { fit: 'inside', withoutEnlargement: true })
      .toFile(thumbPath);

    return thumbPath;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Image processing pipeline
// ---------------------------------------------------------------------------

async function processImage(
  url: string,
  outputDir: string,
  seenHashes: Map<string, string>,
): Promise<MediaAsset | null> {
  let buffer: Buffer;
  let mimeType: string;

  try {
    const result = await downloadWithRetry(url);
    buffer = result.buffer;
    mimeType = result.mimeType;
  } catch (err) {
    console.warn(`[media] Failed to download ${url}: ${err}`);
    return null;
  }

  // Validate MIME type
  if (!IMAGE_MIME_TYPES.has(mimeType) && !guessImageType(url)) {
    console.warn(`[media] Skipping non-image: ${url} (${mimeType})`);
    return null;
  }

  // Content hash for deduplication
  const hash = contentHash(buffer);
  const existingPath = seenHashes.get(hash);
  if (existingPath) {
    // Return a reference to the existing file
    const fileStat = await stat(existingPath).catch(() => null);
    return {
      originalUrl: url,
      localPath: existingPath,
      mimeType,
      fileSize: fileStat?.size || buffer.length,
      optimized: true,
      hash,
    };
  }

  // Skip SVG optimization (pass through)
  if (mimeType === 'image/svg+xml') {
    const fileName = `${hash}.svg`;
    const localPath = join(outputDir, fileName);
    await writeFile(localPath, buffer);
    seenHashes.set(hash, localPath);
    return {
      originalUrl: url,
      localPath,
      mimeType: 'image/svg+xml',
      fileSize: buffer.length,
      optimized: false,
      hash,
    };
  }

  // Optimize raster images
  try {
    const optimized = await optimizeImage(buffer, mimeType);
    const outputMime = optimized.format === 'webp' ? 'image/webp' : mimeType;
    const ext = optimized.format === 'webp' ? '.webp' : mimeExtension(mimeType);
    const fileName = `${hash}${ext}`;
    const localPath = join(outputDir, fileName);

    await writeFile(localPath, optimized.buffer);
    seenHashes.set(hash, localPath);

    return {
      originalUrl: url,
      localPath,
      mimeType: outputMime,
      width: optimized.width,
      height: optimized.height,
      fileSize: optimized.buffer.length,
      optimized: true,
      hash,
    };
  } catch (err) {
    // If optimization fails, save the original
    console.warn(`[media] Optimization failed for ${url}: ${err}`);
    const ext = mimeExtension(mimeType);
    const fileName = `${hash}${ext}`;
    const localPath = join(outputDir, fileName);
    await writeFile(localPath, buffer);
    seenHashes.set(hash, localPath);

    return {
      originalUrl: url,
      localPath,
      mimeType,
      fileSize: buffer.length,
      optimized: false,
      hash,
    };
  }
}

// ---------------------------------------------------------------------------
// Image optimization with sharp
// ---------------------------------------------------------------------------

interface OptimizedResult {
  buffer: Buffer;
  width: number;
  height: number;
  format: string;
}

async function optimizeImage(
  buffer: Buffer,
  mimeType: string,
): Promise<OptimizedResult> {
  let pipeline = sharp(buffer);
  const metadata = await pipeline.metadata();

  const inputWidth = metadata.width || 0;
  const inputHeight = metadata.height || 0;

  // Resize if larger than max dimensions
  if (inputWidth > MAX_IMAGE_WIDTH || inputHeight > MAX_IMAGE_HEIGHT) {
    pipeline = pipeline.resize(MAX_IMAGE_WIDTH, MAX_IMAGE_HEIGHT, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  // Convert to WebP for best compression (except for animated GIFs)
  const isAnimated = metadata.pages && metadata.pages > 1;

  if (isAnimated) {
    // Keep animated GIFs as-is but resize
    const result = await pipeline.gif().toBuffer({ resolveWithObject: true });
    return {
      buffer: result.data,
      width: result.info.width,
      height: result.info.height,
      format: 'gif',
    };
  }

  // Try WebP first (best general-purpose compression)
  const webpResult = await pipeline
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toBuffer({ resolveWithObject: true });

  // If WebP is larger than original, fall back to optimized JPEG/PNG
  if (webpResult.data.length > buffer.length * 0.95) {
    if (mimeType === 'image/png' || metadata.hasAlpha) {
      const pngResult = await sharp(buffer)
        .resize(MAX_IMAGE_WIDTH, MAX_IMAGE_HEIGHT, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .png({ quality: 85, compressionLevel: 9, adaptiveFiltering: true })
        .toBuffer({ resolveWithObject: true });

      return {
        buffer: pngResult.data,
        width: pngResult.info.width,
        height: pngResult.info.height,
        format: 'png',
      };
    }

    const jpegResult = await sharp(buffer)
      .resize(MAX_IMAGE_WIDTH, MAX_IMAGE_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer({ resolveWithObject: true });

    return {
      buffer: jpegResult.data,
      width: jpegResult.info.width,
      height: jpegResult.info.height,
      format: 'jpeg',
    };
  }

  return {
    buffer: webpResult.data,
    width: webpResult.info.width,
    height: webpResult.info.height,
    format: 'webp',
  };
}

// ---------------------------------------------------------------------------
// Download with retry and size limits
// ---------------------------------------------------------------------------

interface DownloadResult {
  buffer: Buffer;
  mimeType: string;
}

async function downloadWithRetry(
  url: string,
  retries: number = MAX_RETRIES,
): Promise<DownloadResult> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await downloadImage(url);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < retries) {
        // Exponential backoff
        await sleep(500 * Math.pow(2, attempt));
      }
    }
  }

  throw lastError || new Error(`Failed to download ${url}`);
}

async function downloadImage(url: string): Promise<DownloadResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DOWNLOAD_TIMEOUT);

  try {
    // Use SSRF-safe fetch to validate URL and each redirect hop
    const response = await fetchWithSsrfProtection(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'TheOneCrawl/1.0 (+https://theonecrawl.app/bot; compatible)',
        Accept: 'image/*',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Check content length before downloading
    const contentLength = parseInt(
      response.headers.get('content-length') || '0',
      10,
    );
    if (contentLength > MAX_FILE_SIZE) {
      throw new Error(
        `File too large: ${contentLength} bytes (max: ${MAX_FILE_SIZE})`,
      );
    }

    const mimeType =
      response.headers.get('content-type')?.split(';')[0]?.trim() || 'application/octet-stream';

    // Stream the response and enforce size limit
    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const chunks: Uint8Array[] = [];
    let totalSize = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalSize += value.length;
      if (totalSize > MAX_FILE_SIZE) {
        reader.cancel();
        throw new Error(
          `File too large: exceeded ${MAX_FILE_SIZE} bytes during download`,
        );
      }
      chunks.push(value);
    }

    const buffer = Buffer.concat(chunks);
    return { buffer, mimeType };
  } finally {
    clearTimeout(timeout);
  }
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function contentHash(buffer: Buffer): string {
  return createHash('sha256').update(buffer).digest('hex').substring(0, 16);
}

function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith('data:')) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function guessImageType(url: string): boolean {
  const ext = extname(new URL(url).pathname).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif', '.bmp', '.tiff', '.ico'].includes(ext);
}

function mimeExtension(mimeType: string): string {
  const map: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
    'image/avif': '.avif',
    'image/tiff': '.tiff',
    'image/bmp': '.bmp',
  };
  return map[mimeType] || '.bin';
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
