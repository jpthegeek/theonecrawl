// ---------------------------------------------------------------------------
// TheOneCrawl — Content extraction using Cheerio
// ---------------------------------------------------------------------------

import * as cheerio from 'cheerio';
import type {
  ExtractedContent,
  ExtractedHeading,
  ExtractedImage,
  ExtractedLink,
  ExtractedNavItem,
  ExtractedForm,
  ExtractedFormField,
  ExtractedSocialLink,
  ExtractedContact,
  ExtractedSection,
  ExtractedList,
  ExtractedTable,
  ExtractedVideo,
  ExtractedTestimonial,
  ExtractedFaq,
  ExtractedPricingPlan,
  ExtractedStat,
  PageType,
} from './types.js';

/** AnyNode from cheerio's DOM — the type passed to .each() callbacks. */
type AnyDomNode = NonNullable<ReturnType<cheerio.CheerioAPI>['0']>;
/** Element node with tagName — narrowed from AnyNode for use in element-specific casts. */
type DomElement = Extract<AnyDomNode, { tagName: string }>;

// ---------------------------------------------------------------------------
// Social platform detection patterns
// ---------------------------------------------------------------------------

const SOCIAL_PLATFORMS: Record<string, RegExp> = {
  facebook: /facebook\.com|fb\.com/i,
  twitter: /twitter\.com|x\.com/i,
  instagram: /instagram\.com/i,
  linkedin: /linkedin\.com/i,
  youtube: /youtube\.com|youtu\.be/i,
  tiktok: /tiktok\.com/i,
  pinterest: /pinterest\.com/i,
  github: /github\.com/i,
  dribbble: /dribbble\.com/i,
  behance: /behance\.net/i,
  medium: /medium\.com/i,
  reddit: /reddit\.com/i,
  discord: /discord\.gg|discord\.com/i,
  slack: /slack\.com/i,
  whatsapp: /whatsapp\.com|wa\.me/i,
  telegram: /t\.me|telegram\.org/i,
  yelp: /yelp\.com/i,
  glassdoor: /glassdoor\.com/i,
};

// ---------------------------------------------------------------------------
// Contact info patterns
// ---------------------------------------------------------------------------

const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE_REGEX =
  /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
const ADDRESS_REGEX =
  /\d{1,5}\s[\w\s]{1,50}(?:Street|St|Avenue|Ave|Boulevard|Blvd|Drive|Dr|Road|Rd|Lane|Ln|Way|Court|Ct|Place|Pl|Circle|Cir|Suite|Ste|Highway|Hwy|Parkway|Pkwy|Trail|Trl)\.?,?\s*[\w\s]*,?\s*[A-Z]{2}\s*\d{5}(?:-\d{4})?/gi;

// ---------------------------------------------------------------------------
// Technology detection patterns
// ---------------------------------------------------------------------------

const TECH_SIGNATURES: Record<string, (html: string, $: cheerio.CheerioAPI) => boolean> = {
  WordPress: (html) => /wp-content|wp-includes/i.test(html),
  Shopify: (html) => /cdn\.shopify\.com|shopify\.com/i.test(html),
  Wix: (html) => /wix\.com|wixsite\.com|parastorage\.com/i.test(html),
  Squarespace: (html) => /squarespace\.com|sqsp\.com/i.test(html),
  Webflow: (html) => /webflow\.com|assets\.website-files\.com/i.test(html),
  'Next.js': (html) => /__next|_next\/static/i.test(html),
  Gatsby: (html) => /gatsby/i.test(html),
  React: (html) => /__react|react-root|data-reactroot/i.test(html),
  Vue: (html) => /vue\.js|v-cloak|data-v-/i.test(html),
  Angular: (html) => /ng-app|ng-version|angular\.io/i.test(html),
  Bootstrap: (html) => /bootstrap\.min\.css|bootstrap\.css/i.test(html),
  Tailwind: (html) => /tailwindcss|tailwind\.css/i.test(html),
  'Google Tag Manager': (html) => /googletagmanager\.com/i.test(html),
  HubSpot: (html) => /hubspot\.com|hsstatic\.net|hs-scripts\.com/i.test(html),
  Drupal: (html) => /drupal\.org|sites\/default\/files/i.test(html),
  Joomla: (html) => /joomla/i.test(html),
  Framer: (html) => /framer\.com|framerusercontent\.com/i.test(html),
  Ghost: (html) => /ghost\.org|ghost\.io/i.test(html),
};

// ---------------------------------------------------------------------------
// Font detection
// ---------------------------------------------------------------------------

const GOOGLE_FONT_REGEX = /fonts\.googleapis\.com\/css[^"']*family=([^"'&]+)/gi;
const FONT_FACE_REGEX = /font-family:\s*['"]?([^'";},]+)/gi;
const SYSTEM_FONTS = new Set([
  'inherit', 'initial', 'unset', 'revert', 'sans-serif', 'serif',
  'monospace', 'cursive', 'fantasy', 'system-ui', '-apple-system',
  'blinkmacsystemfont', 'segoe ui', 'roboto', 'helvetica neue',
  'arial', 'noto sans', 'liberation sans', 'helvetica', 'verdana',
  'trebuchet ms', 'georgia', 'times new roman', 'times', 'courier new',
  'courier', 'lucida console', 'monaco', 'consolas', 'menlo',
]);

// ---------------------------------------------------------------------------
// Color extraction from inline styles and CSS
// ---------------------------------------------------------------------------

const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{3,4}){1,2}\b/g;
const RGB_COLOR_REGEX = /rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*[\d.]+)?\s*\)/g;
const HSL_COLOR_REGEX = /hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?(?:\s*,\s*[\d.]+)?\s*\)/g;

// ---------------------------------------------------------------------------
// Main extraction function
// ---------------------------------------------------------------------------

export function extractContent(html: string, pageUrl: string): ExtractedContent {
  const $ = cheerio.load(html);
  const baseUrl = new URL(pageUrl);

  // Remove script and style tags for cleaner text extraction
  const $clean = cheerio.load(html);
  $clean('script, style, noscript, svg, path').remove();

  return {
    headings: extractHeadings($clean),
    paragraphs: extractParagraphs($clean),
    images: extractImages($, baseUrl),
    links: extractLinks($, baseUrl),
    navigation: extractNavigation($, baseUrl),
    forms: extractForms($),
    socialLinks: extractSocialLinks($),
    contactInfo: extractContactInfo($clean),
    colorPalette: extractColors(html),
    fonts: extractFonts(html),
    sections: extractSections($, baseUrl),
    lists: extractLists($clean),
    tables: extractTables($clean),
    videos: extractVideos($, baseUrl),
    testimonials: extractTestimonials($clean),
    faqs: extractFaqs($clean),
    pricingPlans: extractPricingPlans($clean),
    stats: extractStats($clean),
  };
}

// ---------------------------------------------------------------------------
// Site metadata extraction
// ---------------------------------------------------------------------------

export function extractSiteMetadata(
  html: string,
  pageUrl: string,
): {
  title: string;
  description: string;
  favicon: string;
  ogImage: string;
  language: string;
  generator?: string;
} {
  const $ = cheerio.load(html);
  const baseUrl = new URL(pageUrl);

  const title =
    $('meta[property="og:title"]').attr('content') ||
    $('title').first().text().trim() ||
    '';

  const description =
    $('meta[name="description"]').attr('content') ||
    $('meta[property="og:description"]').attr('content') ||
    '';

  let favicon =
    $('link[rel="icon"]').attr('href') ||
    $('link[rel="shortcut icon"]').attr('href') ||
    '/favicon.ico';
  favicon = resolveUrl(favicon, baseUrl);

  let ogImage =
    $('meta[property="og:image"]').attr('content') ||
    $('meta[name="twitter:image"]').attr('content') ||
    '';
  if (ogImage) ogImage = resolveUrl(ogImage, baseUrl);

  const language = $('html').attr('lang') || 'en';
  const generator = $('meta[name="generator"]').attr('content') || undefined;

  return { title, description, favicon, ogImage, language, generator };
}

export function detectTechnology(html: string): string[] {
  const $ = cheerio.load(html);
  const detected: string[] = [];
  for (const [tech, detector] of Object.entries(TECH_SIGNATURES)) {
    if (detector(html, $)) {
      detected.push(tech);
    }
  }
  return detected;
}

// ---------------------------------------------------------------------------
// Heading extraction
// ---------------------------------------------------------------------------

function extractHeadings($: cheerio.CheerioAPI): ExtractedHeading[] {
  const headings: ExtractedHeading[] = [];
  $('h1, h2, h3, h4, h5, h6').each((_i, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    if (!text) return;
    const tagName = (el as DomElement).tagName?.toLowerCase() || 'h2';
    const level = parseInt(tagName.replace('h', ''), 10);
    if (isNaN(level)) return;
    headings.push({
      level,
      text,
      id: $el.attr('id') || undefined,
    });
  });
  return headings;
}

// ---------------------------------------------------------------------------
// Paragraph extraction
// ---------------------------------------------------------------------------

function extractParagraphs($: cheerio.CheerioAPI): string[] {
  const paragraphs: string[] = [];
  $('p').each((_i, el) => {
    const text = $(el).text().trim();
    if (text && text.length > 10) {
      paragraphs.push(text);
    }
  });
  return paragraphs;
}

// ---------------------------------------------------------------------------
// Image extraction
// ---------------------------------------------------------------------------

function extractImages(
  $: cheerio.CheerioAPI,
  baseUrl: URL,
): ExtractedImage[] {
  const images: ExtractedImage[] = [];
  const seen = new Set<string>();

  // Standard <img> tags
  $('img').each((_i, el) => {
    const $el = $(el);
    const src =
      $el.attr('data-src') || $el.attr('data-lazy-src') || $el.attr('src');
    if (!src || src.startsWith('data:')) return;

    const resolved = resolveUrl(src, baseUrl);
    if (seen.has(resolved)) return;
    seen.add(resolved);

    const parentTag = ($el.parent()[0] as DomElement)?.tagName?.toLowerCase() || '';
    const parentClass = $el.parent().attr('class') || '';
    const isLogo =
      /logo/i.test($el.attr('class') || '') ||
      /logo/i.test($el.attr('alt') || '') ||
      /logo/i.test($el.attr('id') || '') ||
      /logo/i.test(parentClass);

    const isHero =
      /hero/i.test($el.closest('section, div').attr('class') || '') ||
      /hero/i.test($el.closest('section, div').attr('id') || '');

    const width = parseInt($el.attr('width') || '0', 10) || undefined;
    const height = parseInt($el.attr('height') || '0', 10) || undefined;

    images.push({
      src: resolved,
      alt: $el.attr('alt')?.trim() || '',
      width,
      height,
      isBackground: false,
      isLogo,
      isHero,
    });
  });

  // Background images from inline styles
  $('[style*="background"]').each((_i, el) => {
    const style = $(el).attr('style') || '';
    const match = /url\(['"]?([^'")\s]+)['"]?\)/i.exec(style);
    if (!match?.[1] || match[1].startsWith('data:')) return;
    const resolved = resolveUrl(match[1], baseUrl);
    if (seen.has(resolved)) return;
    seen.add(resolved);
    images.push({
      src: resolved,
      alt: '',
      isBackground: true,
      isLogo: false,
      isHero: /hero/i.test($(el).attr('class') || ''),
    });
  });

  return images;
}

// ---------------------------------------------------------------------------
// Link extraction
// ---------------------------------------------------------------------------

function extractLinks(
  $: cheerio.CheerioAPI,
  baseUrl: URL,
): ExtractedLink[] {
  const links: ExtractedLink[] = [];
  const seen = new Set<string>();

  $('a[href]').each((_i, el) => {
    const $el = $(el);
    const href = $el.attr('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    const resolved = resolveUrl(href, baseUrl);
    if (seen.has(resolved)) return;
    seen.add(resolved);

    let isExternal = false;
    try {
      const linkUrl = new URL(resolved);
      isExternal = linkUrl.hostname !== baseUrl.hostname;
    } catch {
      // relative URLs are internal
    }

    links.push({
      text: $el.text().trim(),
      href: resolved,
      isExternal,
      rel: $el.attr('rel') || undefined,
    });
  });

  return links;
}

// ---------------------------------------------------------------------------
// Navigation extraction
// ---------------------------------------------------------------------------

function extractNavigation(
  $: cheerio.CheerioAPI,
  baseUrl: URL,
): ExtractedNavItem[] {
  const navItems: ExtractedNavItem[] = [];

  // Try explicit <nav> element first
  const $nav = $('nav').first();
  const $target = $nav.length
    ? $nav
    : $('header').first();

  if (!$target.length) return navItems;

  // Get top-level list items or direct links
  const $topLinks = $target.find('> ul > li, > div > ul > li, > div > div > ul > li');

  if ($topLinks.length > 0) {
    $topLinks.each((_i, el) => {
      const item = extractNavItem($, el, baseUrl);
      if (item) navItems.push(item);
    });
  } else {
    // Fallback: collect all direct anchor tags
    $target.find('a[href]').each((_i, el) => {
      const $a = $(el);
      const href = $a.attr('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
      const label = $a.text().trim();
      if (!label || label.length > 60) return;
      navItems.push({
        label,
        url: resolveUrl(href, baseUrl),
      });
    });
  }

  return deduplicateNav(navItems);
}

function extractNavItem(
  $: cheerio.CheerioAPI,
  el: DomElement,
  baseUrl: URL,
): ExtractedNavItem | null {
  const $el = $(el);
  const $link = $el.find('> a').first();
  const label = $link.text().trim() || $el.contents().first().text().trim();
  if (!label || label.length > 60) return null;

  const href = $link.attr('href') || '';
  const url = href && !href.startsWith('#') && !href.startsWith('javascript:')
    ? resolveUrl(href, baseUrl)
    : '';

  const children: ExtractedNavItem[] = [];
  $el.find('> ul > li, > div > ul > li').each((_i, child) => {
    const childItem = extractNavItem($, child as DomElement, baseUrl);
    if (childItem) children.push(childItem);
  });

  return {
    label,
    url,
    children: children.length > 0 ? children : undefined,
  };
}

function deduplicateNav(items: ExtractedNavItem[]): ExtractedNavItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.label}::${item.url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ---------------------------------------------------------------------------
// Form extraction
// ---------------------------------------------------------------------------

function extractForms($: cheerio.CheerioAPI): ExtractedForm[] {
  const forms: ExtractedForm[] = [];

  $('form').each((_i, el) => {
    const $form = $(el);
    const fields: ExtractedFormField[] = [];

    $form.find('input, textarea, select').each((_j, fieldEl) => {
      const $field = $(fieldEl);
      const type =
        (fieldEl as DomElement).tagName === 'textarea'
          ? 'textarea'
          : (fieldEl as DomElement).tagName === 'select'
            ? 'select'
            : $field.attr('type') || 'text';

      // Skip hidden and submit fields
      if (type === 'hidden' || type === 'submit') return;

      const name = $field.attr('name') || $field.attr('id') || '';
      if (!name) return;

      // Try to find associated label
      const id = $field.attr('id');
      let label =
        id ? $form.find(`label[for="${id}"]`).text().trim() : '';
      if (!label) {
        label = $field.closest('label').text().trim();
      }
      if (!label) {
        label = $field.attr('placeholder') || name;
      }

      const options: string[] = [];
      if (type === 'select') {
        $field.find('option').each((_k, opt) => {
          const text = $(opt).text().trim();
          if (text) options.push(text);
        });
      }

      fields.push({
        name,
        type,
        label,
        placeholder: $field.attr('placeholder') || undefined,
        required: $field.attr('required') !== undefined,
        options: options.length > 0 ? options : undefined,
      });
    });

    if (fields.length > 0) {
      forms.push({
        action: $form.attr('action') || '',
        method: ($form.attr('method') || 'post').toLowerCase(),
        fields,
      });
    }
  });

  return forms;
}

// ---------------------------------------------------------------------------
// Social link extraction
// ---------------------------------------------------------------------------

function extractSocialLinks($: cheerio.CheerioAPI): ExtractedSocialLink[] {
  const socials: ExtractedSocialLink[] = [];
  const seen = new Set<string>();

  $('a[href]').each((_i, el) => {
    const href = $(el).attr('href');
    if (!href) return;

    for (const [platform, regex] of Object.entries(SOCIAL_PLATFORMS)) {
      if (regex.test(href) && !seen.has(platform)) {
        seen.add(platform);
        socials.push({ platform, url: href });
        break;
      }
    }
  });

  return socials;
}

// ---------------------------------------------------------------------------
// Contact info extraction
// ---------------------------------------------------------------------------

function extractContactInfo($: cheerio.CheerioAPI): ExtractedContact[] {
  const contacts: ExtractedContact[] = [];
  const bodyText = $('body').text();
  const seen = new Set<string>();

  // Email addresses
  const emails = bodyText.match(EMAIL_REGEX);
  if (emails) {
    for (const email of emails) {
      const normalized = email.toLowerCase();
      if (!seen.has(normalized) && !normalized.includes('example.com') && !normalized.includes('sentry.io')) {
        seen.add(normalized);
        contacts.push({ type: 'email', value: normalized });
      }
    }
  }

  // Also check mailto: links
  $('a[href^="mailto:"]').each((_i, el) => {
    const href = $(el).attr('href') || '';
    const email = href.replace('mailto:', '').split('?')[0]?.toLowerCase().trim();
    if (email && !seen.has(email)) {
      seen.add(email);
      contacts.push({ type: 'email', value: email });
    }
  });

  // Phone numbers
  $('a[href^="tel:"]').each((_i, el) => {
    const href = $(el).attr('href') || '';
    const phone = href.replace('tel:', '').trim();
    if (phone && !seen.has(phone)) {
      seen.add(phone);
      contacts.push({ type: 'phone', value: phone });
    }
  });

  const phones = bodyText.match(PHONE_REGEX);
  if (phones) {
    for (const phone of phones.slice(0, 3)) {
      const normalized = phone.replace(/\s+/g, ' ').trim();
      if (!seen.has(normalized)) {
        seen.add(normalized);
        contacts.push({ type: 'phone', value: normalized });
      }
    }
  }

  // Addresses
  const addresses = bodyText.match(ADDRESS_REGEX);
  if (addresses) {
    for (const addr of addresses.slice(0, 2)) {
      const normalized = addr.replace(/\s+/g, ' ').trim();
      if (!seen.has(normalized)) {
        seen.add(normalized);
        contacts.push({ type: 'address', value: normalized });
      }
    }
  }

  return contacts;
}

// ---------------------------------------------------------------------------
// Color palette extraction
// ---------------------------------------------------------------------------

function extractColors(html: string): string[] {
  const colorCounts = new Map<string, number>();

  const addColor = (color: string) => {
    const normalized = color.toLowerCase().trim();
    // Skip black, white, transparent, and very common defaults
    if (['#000', '#000000', '#fff', '#ffffff', 'transparent', '#0000', '#00000000', 'inherit'].includes(normalized)) return;
    if (/^rgba?\(\s*0\s*,\s*0\s*,\s*0/.test(normalized)) return;
    if (/^rgba?\(\s*255\s*,\s*255\s*,\s*255/.test(normalized)) return;
    colorCounts.set(normalized, (colorCounts.get(normalized) || 0) + 1);
  };

  // Extract hex colors
  const hexColors = html.match(HEX_COLOR_REGEX);
  if (hexColors) hexColors.forEach(addColor);

  // Extract rgb/rgba colors
  const rgbColors = html.match(RGB_COLOR_REGEX);
  if (rgbColors) rgbColors.forEach(addColor);

  // Extract hsl/hsla colors
  const hslColors = html.match(HSL_COLOR_REGEX);
  if (hslColors) hslColors.forEach(addColor);

  // Sort by frequency and return top colors
  return Array.from(colorCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([color]) => color);
}

// ---------------------------------------------------------------------------
// Font extraction
// ---------------------------------------------------------------------------

function extractFonts(html: string): string[] {
  const fonts = new Set<string>();

  // Google Fonts imports
  let match: RegExpExecArray | null;
  const gfRegex = new RegExp(GOOGLE_FONT_REGEX.source, GOOGLE_FONT_REGEX.flags);
  while ((match = gfRegex.exec(html)) !== null) {
    if (match[1]) {
      const families = decodeURIComponent(match[1]).split('|');
      for (const family of families) {
        const name = family.split(':')[0]?.replace(/\+/g, ' ').trim();
        if (name) fonts.add(name);
      }
    }
  }

  // font-family declarations
  const ffRegex = new RegExp(FONT_FACE_REGEX.source, FONT_FACE_REGEX.flags);
  while ((match = ffRegex.exec(html)) !== null) {
    if (match[1]) {
      const name = match[1].replace(/["']/g, '').trim();
      const lower = name.toLowerCase();
      if (!SYSTEM_FONTS.has(lower) && name.length < 60) {
        fonts.add(name);
      }
    }
  }

  return Array.from(fonts).slice(0, 10);
}

// ---------------------------------------------------------------------------
// Section extraction (structural analysis)
// ---------------------------------------------------------------------------

function extractSections(
  $: cheerio.CheerioAPI,
  baseUrl: URL,
): ExtractedSection[] {
  const sections: ExtractedSection[] = [];
  let order = 0;

  // Look for semantic sections: <section>, <article>, <main>, or large <div>s
  $('section, article, main, [role="main"], [role="banner"], [role="contentinfo"]').each((_i, el) => {
    const $el = $(el);
    const tag = (el as DomElement).tagName?.toLowerCase() || 'div';
    const className = $el.attr('class') || '';
    const id = $el.attr('id') || '';

    const isHeader =
      tag === 'header' ||
      /role="banner"/i.test($el.attr('role') || '') ||
      /header|navbar|nav-bar/i.test(className) ||
      /header|navbar/i.test(id);

    const isFooter =
      tag === 'footer' ||
      /role="contentinfo"/i.test($el.attr('role') || '') ||
      /footer/i.test(className) ||
      /footer/i.test(id);

    const isHero =
      /hero|banner|jumbotron|masthead|above-fold/i.test(className) ||
      /hero|banner/i.test(id);

    const headings: ExtractedHeading[] = [];
    $el.find('> h1, > h2, > h3, > div > h1, > div > h2, > div > h3').each((_j, h) => {
      const text = $(h).text().trim();
      const hTag = (h as DomElement).tagName?.toLowerCase() || 'h2';
      const level = parseInt(hTag.replace('h', ''), 10);
      if (text && !isNaN(level)) {
        headings.push({ level, text });
      }
    });

    const paragraphs: string[] = [];
    $el.find('> p, > div > p').each((_j, p) => {
      const text = $(p).text().trim();
      if (text && text.length > 10) paragraphs.push(text);
    });

    const images: ExtractedImage[] = [];
    $el.find('img').each((_j, img) => {
      const src = $(img).attr('src') || $(img).attr('data-src');
      if (src && !src.startsWith('data:')) {
        images.push({
          src: resolveUrl(src, baseUrl),
          alt: $(img).attr('alt')?.trim() || '',
          width: parseInt($(img).attr('width') || '0', 10) || undefined,
          height: parseInt($(img).attr('height') || '0', 10) || undefined,
        });
      }
    });

    const links: ExtractedLink[] = [];
    $el.find('a[href]').each((_j, a) => {
      const href = $(a).attr('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
      links.push({
        text: $(a).text().trim(),
        href: resolveUrl(href, baseUrl),
        isExternal: false,
      });
    });

    sections.push({
      tag,
      id: id || undefined,
      className: className || undefined,
      headings,
      paragraphs,
      images,
      links,
      order: order++,
      isHero,
      isFooter,
      isHeader,
    });
  });

  return sections;
}

// ---------------------------------------------------------------------------
// List extraction
// ---------------------------------------------------------------------------

function extractLists($: cheerio.CheerioAPI): ExtractedList[] {
  const lists: ExtractedList[] = [];

  $('ul, ol').each((_i, el) => {
    const $el = $(el);
    // Skip nested lists and navigation lists
    if ($el.closest('nav, header, footer').length > 0) return;
    if ($el.parent('li').length > 0) return;

    const items: string[] = [];
    $el.find('> li').each((_j, li) => {
      const text = $(li).text().trim();
      if (text) items.push(text);
    });

    if (items.length >= 2) {
      lists.push({
        type: (el as DomElement).tagName === 'ol' ? 'ordered' : 'unordered',
        items,
      });
    }
  });

  return lists;
}

// ---------------------------------------------------------------------------
// Table extraction
// ---------------------------------------------------------------------------

function extractTables($: cheerio.CheerioAPI): ExtractedTable[] {
  const tables: ExtractedTable[] = [];

  $('table').each((_i, el) => {
    const $table = $(el);
    const headers: string[] = [];
    const rows: string[][] = [];

    $table.find('thead th, thead td').each((_j, th) => {
      headers.push($(th).text().trim());
    });

    // If no thead, use first row as headers
    if (headers.length === 0) {
      $table.find('tr').first().find('th, td').each((_j, td) => {
        headers.push($(td).text().trim());
      });
    }

    const $bodyRows = $table.find('tbody tr');
    const $rows = $bodyRows.length > 0 ? $bodyRows : $table.find('tr').slice(headers.length > 0 ? 1 : 0);

    $rows.each((_j, tr) => {
      const cells: string[] = [];
      $(tr).find('td, th').each((_k, td) => {
        cells.push($(td).text().trim());
      });
      if (cells.length > 0) rows.push(cells);
    });

    if (headers.length > 0 || rows.length > 0) {
      tables.push({ headers, rows });
    }
  });

  return tables;
}

// ---------------------------------------------------------------------------
// Video extraction
// ---------------------------------------------------------------------------

function extractVideos(
  $: cheerio.CheerioAPI,
  _baseUrl: URL,
): ExtractedVideo[] {
  const videos: ExtractedVideo[] = [];
  const seen = new Set<string>();

  // YouTube embeds
  $('iframe[src*="youtube"], iframe[src*="youtu.be"], iframe[data-src*="youtube"]').each((_i, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || '';
    if (!seen.has(src)) {
      seen.add(src);
      videos.push({ src, type: 'youtube' });
    }
  });

  // Vimeo embeds
  $('iframe[src*="vimeo"], iframe[data-src*="vimeo"]').each((_i, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || '';
    if (!seen.has(src)) {
      seen.add(src);
      videos.push({ src, type: 'vimeo' });
    }
  });

  // HTML5 video
  $('video source, video[src]').each((_i, el) => {
    const src = $(el).attr('src') || '';
    if (src && !seen.has(src)) {
      seen.add(src);
      const poster = $(el).closest('video').attr('poster') || undefined;
      videos.push({ src, type: 'custom', poster });
    }
  });

  return videos;
}

// ---------------------------------------------------------------------------
// Testimonial extraction (heuristic pattern matching)
// ---------------------------------------------------------------------------

function extractTestimonials($: cheerio.CheerioAPI): ExtractedTestimonial[] {
  const testimonials: ExtractedTestimonial[] = [];

  // Look for common testimonial patterns
  const testimonialSelectors = [
    '[class*="testimonial"]',
    '[class*="review"]',
    '[class*="quote"]',
    '[data-testimonial]',
    'blockquote',
  ];

  for (const selector of testimonialSelectors) {
    $(selector).each((_i, el) => {
      const $el = $(el);
      // Skip if already in a collected parent
      if ($el.closest('[class*="testimonial"], [class*="review"]').not(el).length > 0) return;

      const quote =
        $el.find('[class*="quote"], [class*="text"], [class*="content"], p').first().text().trim() ||
        $el.find('blockquote').text().trim() ||
        $el.text().trim();

      if (!quote || quote.length < 20 || quote.length > 1000) return;

      const author =
        $el.find('[class*="author"], [class*="name"], [class*="person"], cite, strong').first().text().trim() ||
        '';

      const title =
        $el.find('[class*="title"], [class*="position"], [class*="role"], [class*="job"]').first().text().trim() ||
        undefined;

      const avatar =
        $el.find('img[class*="avatar"], img[class*="photo"], img[class*="author"]').first().attr('src') ||
        undefined;

      const company =
        $el.find('[class*="company"], [class*="org"]').first().text().trim() ||
        undefined;

      // Star rating
      const stars = $el.find('[class*="star"], [class*="rating"]').length;
      const rating = stars > 0 && stars <= 5 ? stars : undefined;

      if (author || quote.length > 30) {
        testimonials.push({
          quote: cleanText(quote, 500),
          author: author || 'Anonymous',
          title,
          avatar,
          company,
          rating,
        });
      }
    });
  }

  return deduplicateByField(testimonials, 'quote').slice(0, 12);
}

// ---------------------------------------------------------------------------
// FAQ extraction
// ---------------------------------------------------------------------------

function extractFaqs($: cheerio.CheerioAPI): ExtractedFaq[] {
  const faqs: ExtractedFaq[] = [];

  // Look for FAQ structured data first
  $('script[type="application/ld+json"]').each((_i, el) => {
    try {
      const data = JSON.parse($(el).text());
      if (data['@type'] === 'FAQPage' && Array.isArray(data.mainEntity)) {
        for (const entity of data.mainEntity) {
          if (entity.name && entity.acceptedAnswer?.text) {
            faqs.push({
              question: entity.name,
              answer: entity.acceptedAnswer.text,
            });
          }
        }
      }
    } catch {
      // ignore malformed JSON-LD
    }
  });

  if (faqs.length > 0) return faqs;

  // Heuristic: look for accordion patterns, dt/dd pairs, question-answer divs
  const faqSelectors = [
    '[class*="faq"]',
    '[class*="accordion"]',
    '[class*="question"]',
    'dl',
    'details',
  ];

  for (const selector of faqSelectors) {
    $(selector).each((_i, el) => {
      const $el = $(el);
      const tag = (el as DomElement).tagName?.toLowerCase();

      if (tag === 'details') {
        const question = $el.find('summary').text().trim();
        const answer = $el.clone().find('summary').remove().end().text().trim();
        if (question && answer) {
          faqs.push({ question, answer });
        }
      } else if (tag === 'dl') {
        const $dts = $el.find('dt');
        const $dds = $el.find('dd');
        $dts.each((j, dt) => {
          const question = $(dt).text().trim();
          const dd = $dds.eq(j);
          const answer = dd.text().trim();
          if (question && answer) {
            faqs.push({ question, answer });
          }
        });
      } else {
        // Look for paired question/answer elements within the container
        const $questions = $el.find(
          '[class*="question"] h3, [class*="question"] h4, [class*="question"] button, ' +
          '[class*="title"] h3, [class*="title"] h4, [class*="header"] h3, [class*="header"] h4, ' +
          '> h3, > h4, > button'
        );
        const $answers = $el.find(
          '[class*="answer"], [class*="content"], [class*="body"], [class*="panel"], ' +
          '> p, > div > p'
        );

        if ($questions.length > 0 && $questions.length === $answers.length) {
          $questions.each((j, q) => {
            const question = $(q).text().trim();
            const answer = $answers.eq(j).text().trim();
            if (question && answer && question.length < 300) {
              faqs.push({ question, answer });
            }
          });
        }
      }
    });
  }

  return deduplicateByField(faqs, 'question').slice(0, 20);
}

// ---------------------------------------------------------------------------
// Pricing plan extraction
// ---------------------------------------------------------------------------

function extractPricingPlans($: cheerio.CheerioAPI): ExtractedPricingPlan[] {
  const plans: ExtractedPricingPlan[] = [];

  const pricingSelectors = [
    '[class*="pricing"]',
    '[class*="plan"]',
    '[class*="tier"]',
    '[class*="package"]',
  ];

  for (const selector of pricingSelectors) {
    $(selector).each((_i, el) => {
      const $el = $(el);
      // Only match individual plan cards, not the whole section
      if ($el.find(selector).length > 0) return;

      const name =
        $el.find('[class*="name"], [class*="title"], h2, h3').first().text().trim() || '';
      if (!name || name.length > 50) return;

      const priceText =
        $el.find('[class*="price"], [class*="amount"], [class*="cost"]').first().text().trim() || '';
      const priceMatch = /\$[\d,.]+|[\d,.]+\s*(?:\/\s*mo|per\s*month|\/month)/i.exec(priceText);
      const price = priceMatch ? priceMatch[0] : priceText;

      const period =
        $el.find('[class*="period"], [class*="interval"], [class*="billing"]').first().text().trim() ||
        (/\/mo|per month|monthly/i.test(priceText) ? '/month' : undefined);

      const description =
        $el.find('[class*="description"], [class*="subtitle"], p').first().text().trim() ||
        undefined;

      const features: string[] = [];
      $el.find('li, [class*="feature"]').each((_j, feat) => {
        const text = $(feat).text().trim();
        if (text && text.length < 200) features.push(text);
      });

      const cta =
        $el.find('a, button').filter((_j, btn) => {
          const text = $(btn).text().trim().toLowerCase();
          return /get started|sign up|subscribe|buy|start|try|choose|select/i.test(text);
        }).first().text().trim() ||
        undefined;

      const highlighted =
        /popular|recommended|best|featured/i.test($el.attr('class') || '') ||
        /popular|recommended|best/i.test($el.text().substring(0, 100));

      if (price || features.length > 0) {
        plans.push({
          name,
          price,
          period,
          description,
          features,
          cta,
          highlighted,
        });
      }
    });
  }

  return deduplicateByField(plans, 'name').slice(0, 6);
}

// ---------------------------------------------------------------------------
// Stats / metrics extraction
// ---------------------------------------------------------------------------

function extractStats($: cheerio.CheerioAPI): ExtractedStat[] {
  const stats: ExtractedStat[] = [];

  const statSelectors = [
    '[class*="stat"]',
    '[class*="metric"]',
    '[class*="counter"]',
    '[class*="number"]',
    '[class*="count"]',
  ];

  for (const selector of statSelectors) {
    $(selector).each((_i, el) => {
      const $el = $(el);
      // Skip parents that contain child stat elements
      if ($el.find(selector).length > 0) return;

      const valueText =
        $el.find('[class*="value"], [class*="number"], [class*="count"], .h1, .h2, h1, h2, h3, strong').first().text().trim() || '';

      const labelText =
        $el.find('[class*="label"], [class*="title"], [class*="desc"], p, span').not('[class*="value"], [class*="number"], h1, h2, h3, strong').first().text().trim() || '';

      if (!valueText || !labelText) return;

      // Parse prefix/suffix
      const numMatch = /^([^0-9]*)([0-9,.]+)(.*)$/.exec(valueText);
      if (numMatch) {
        stats.push({
          value: numMatch[2] || valueText,
          label: labelText,
          prefix: numMatch[1]?.trim() || undefined,
          suffix: numMatch[3]?.trim() || undefined,
        });
      } else {
        stats.push({ value: valueText, label: labelText });
      }
    });
  }

  return deduplicateByField(stats, 'label').slice(0, 8);
}

// ---------------------------------------------------------------------------
// URL resolution helper
// ---------------------------------------------------------------------------

export function resolveUrl(url: string, baseUrl: URL): string {
  if (!url) return '';
  try {
    if (url.startsWith('//')) return `${baseUrl.protocol}${url}`;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return new URL(url, baseUrl.href).href;
  } catch {
    return url;
  }
}

// ---------------------------------------------------------------------------
// Text cleaning
// ---------------------------------------------------------------------------

function cleanText(text: string, maxLen: number): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  return cleaned.length > maxLen
    ? cleaned.substring(0, maxLen - 3) + '...'
    : cleaned;
}

function deduplicateByField<T extends object>(arr: T[], field: keyof T): T[] {
  const seen = new Set<unknown>();
  return arr.filter((item) => {
    const value = item[field];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

// ---------------------------------------------------------------------------
// Page type detection — heuristic, no AI, fast
// ---------------------------------------------------------------------------

/**
 * Detect the type of page based on URL path, meta tags, JSON-LD, and
 * extracted content signals. Returns the most-likely PageType.
 */
export function detectPageType(html: string, url: string, extracted: ExtractedContent): PageType {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    parsedUrl = new URL('https://unknown/');
  }

  const path = parsedUrl.pathname.toLowerCase();
  const $ = cheerio.load(html);

  // ---- JSON-LD schema.org detection ----
  $('script[type="application/ld+json"]').each((_i, el) => {
    // we just parse them; result stored in jsonLdTypes below
    void el;
  });

  const jsonLdTypes: string[] = [];
  $('script[type="application/ld+json"]').each((_i, el) => {
    try {
      const data = JSON.parse($(el).text());
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        const t = item['@type'];
        if (typeof t === 'string') jsonLdTypes.push(t.toLowerCase());
        if (Array.isArray(t)) for (const v of t) if (typeof v === 'string') jsonLdTypes.push(v.toLowerCase());
      }
    } catch {
      // ignore malformed JSON-LD
    }
  });

  const hasJsonLdType = (...types: string[]) =>
    types.some((t) => jsonLdTypes.includes(t.toLowerCase()));

  // ---- og:type meta tag ----
  const ogType = ($('meta[property="og:type"]').attr('content') ?? '').toLowerCase();

  // ---- H1 text ----
  const h1Text = (extracted.headings.find((h) => h.level === 1)?.text ?? '').toLowerCase();

  // ---- URL path signals ----
  const isPathMatch = (...patterns: RegExp[]) => patterns.some((p) => p.test(path));

  // 1. Job posting
  if (
    hasJsonLdType('jobposting') ||
    isPathMatch(/\/jobs\/|\/careers\/|\/job\/|\/career\/|\/positions\/|\/openings\//) ||
    /join our team|we'?re hiring|open position|job opening/i.test(h1Text) ||
    /careers|jobs/i.test(path)
  ) {
    return 'job_posting';
  }

  // 2. Press release
  if (
    hasJsonLdType('pressrelease', 'newsarticle') ||
    isPathMatch(/\/press\/|\/press-release|\/news-release/) ||
    path.includes('/press')
  ) {
    // Distinguish press vs general news below — for now handle here if explicit
    if (isPathMatch(/\/press-release|\/press\//) || hasJsonLdType('pressrelease')) {
      return 'press_release';
    }
  }

  // 3. News article
  if (
    hasJsonLdType('newsarticle', 'article') ||
    ogType === 'article' ||
    isPathMatch(/\/news\/|\/news$/) ||
    path.startsWith('/news')
  ) {
    // Disambiguate blog vs news by path
    if (isPathMatch(/\/news\//)) return 'news_article';
    if (ogType === 'article' && !isPathMatch(/\/blog\//)) return 'news_article';
  }

  // 4. Blog post
  if (
    hasJsonLdType('blogposting', 'article') ||
    ogType === 'article' ||
    isPathMatch(/\/blog\/|\/posts?\/|\/articles?\/|\/insights\/|\/resources\/[^/]+$/)
  ) {
    return 'blog_post';
  }

  // 5. Documentation
  if (
    isPathMatch(/\/docs\/|\/documentation\/|\/guide\/|\/guides\/|\/reference\/|\/api-reference\/|\/manual\/|\/help\/|\/wiki\//) ||
    (extracted.faqs.length >= 3 && extracted.tables.length >= 1) ||
    path.startsWith('/docs') ||
    path.startsWith('/documentation')
  ) {
    return 'documentation';
  }

  // 6. Pricing page
  if (
    hasJsonLdType('product') ||
    isPathMatch(/\/pricing\/?$|\/plans\/?$|\/subscription\/?$/) ||
    extracted.pricingPlans.length >= 2
  ) {
    return 'pricing_page';
  }

  // 7. Contact page
  if (
    isPathMatch(/\/contact\/?$|\/contact-us\/?$|\/get-in-touch\/?$|\/reach-us\/?$/) ||
    path.endsWith('/contact') ||
    (extracted.contactInfo.length >= 2 && extracted.forms.length >= 1)
  ) {
    return 'contact_page';
  }

  // 8. About page
  if (
    isPathMatch(/\/about\/?$|\/about-us\/?$|\/our-story\/?$|\/who-we-are\/?$|\/team\/?$|\/company\/?$/) ||
    path.endsWith('/about') ||
    path.endsWith('/about-us')
  ) {
    return 'about_page';
  }

  // 9. Product page
  if (
    hasJsonLdType('product', 'softwareapplication', 'webapplication') ||
    isPathMatch(/\/product\/|\/products\/|\/solution\/|\/solutions\/|\/features\/|\/platform\//)
  ) {
    return 'product_page';
  }

  // 10. Homepage — root path or minimal path depth
  const pathDepth = path.replace(/\/$/, '').split('/').filter(Boolean).length;
  if (pathDepth === 0) {
    // Root path — could be homepage or landing_page
    if (extracted.testimonials.length >= 2 || extracted.stats.length >= 2) {
      return 'homepage';
    }
    return 'homepage';
  }

  // 11. Landing page — short paths with conversion signals
  if (
    pathDepth <= 2 &&
    (extracted.testimonials.length >= 1 || extracted.pricingPlans.length >= 1 || extracted.stats.length >= 2)
  ) {
    return 'landing_page';
  }

  return 'unknown';
}

// ---------------------------------------------------------------------------
// HTML tag filtering (include/exclude tags support)
// ---------------------------------------------------------------------------

/**
 * Filter HTML by include/exclude tag selectors.
 * - includeTags: keep only content matching these CSS selectors
 * - excludeTags: remove elements matching these CSS selectors
 */
export function filterHtmlByTags(
  html: string,
  includeTags?: string[],
  excludeTags?: string[],
): string {
  if ((!includeTags || includeTags.length === 0) && (!excludeTags || excludeTags.length === 0)) {
    return html;
  }

  const $ = cheerio.load(html);

  // Remove excluded tags first
  if (excludeTags && excludeTags.length > 0) {
    for (const selector of excludeTags) {
      $(selector).remove();
    }
  }

  // If includeTags specified, extract only matching content
  if (includeTags && includeTags.length > 0) {
    const matched: string[] = [];
    for (const selector of includeTags) {
      $(selector).each((_i, el) => {
        matched.push($.html(el) ?? '');
      });
    }
    return matched.join('\n');
  }

  return $.html() ?? html;
}
