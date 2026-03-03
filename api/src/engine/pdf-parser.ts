// ---------------------------------------------------------------------------
// TheOneCrawl — PDF content extraction
// ---------------------------------------------------------------------------

import { PDFParse } from 'pdf-parse';

export interface PdfResult {
  text: string;
  numPages: number;
  metadata: {
    title?: string;
    author?: string;
    subject?: string;
    creator?: string;
    producer?: string;
  };
}

/**
 * Parse a PDF buffer and extract text content + metadata.
 */
export async function parsePdf(buffer: Buffer): Promise<PdfResult> {
  const parser = new PDFParse({ data: new Uint8Array(buffer) });

  const textResult = await parser.getText();
  const infoResult = await parser.getInfo();

  const info = infoResult?.info as Record<string, unknown> | undefined;

  return {
    text: (textResult?.text ?? '').replace(/\s+/g, ' ').trim(),
    numPages: infoResult?.total ?? 0,
    metadata: {
      title: (info?.['Title'] as string) || undefined,
      author: (info?.['Author'] as string) || undefined,
      subject: (info?.['Subject'] as string) || undefined,
      creator: (info?.['Creator'] as string) || undefined,
      producer: (info?.['Producer'] as string) || undefined,
    },
  };
}

/**
 * Check if a URL points to a PDF file.
 */
export function isPdfUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.pathname.toLowerCase().endsWith('.pdf');
  } catch {
    return false;
  }
}
