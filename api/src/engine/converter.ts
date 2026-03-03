// ---------------------------------------------------------------------------
// TheOneCrawl — Convert extracted content to CMS blocks
// ---------------------------------------------------------------------------

import {
  createBlock,
  DEFAULT_THEME,
  type CmsBlock,
  type WebsiteTheme,
  type ThemeColorPalette,
} from './cms-types.js';

import type {
  ExtractedContent,
  ExtractedSection,
  ExtractedNavItem,
  ExtractedTestimonial,
  ExtractedFaq,
  ExtractedPricingPlan,
  ExtractedStat,
  ExtractedForm,
  ExtractedFormField,
  SiteMetadata,
} from './types.js';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Converts extracted page content into an ordered array of CMS blocks that
 * faithfully represent the original page structure.
 */
export function convertToCmsBlocks(
  extracted: ExtractedContent,
  siteMetadata: SiteMetadata,
): CmsBlock[] {
  const blocks: CmsBlock[] = [];

  // If we have well-defined sections, convert each one
  if (extracted.sections.length > 0) {
    const sorted = [...extracted.sections].sort((a, b) => a.order - b.order);

    for (const section of sorted) {
      // Skip header/footer — those become global blocks
      if (section.isHeader) continue;
      if (section.isFooter) continue;

      const sectionBlocks = convertSection(section, extracted);
      blocks.push(...sectionBlocks);
    }
  }

  // If section-based extraction yielded nothing, fall back to flat extraction
  if (blocks.length === 0) {
    blocks.push(...convertFlat(extracted));
  }

  // Append specialized blocks that may not have been captured by sections
  appendSpecializedBlocks(blocks, extracted);

  return blocks;
}

/**
 * Convert navigation items into a header CmsBlock (global block).
 */
export function convertToHeaderBlock(
  extracted: ExtractedContent,
  siteMetadata: SiteMetadata,
): CmsBlock {
  const logoImg = extracted.images.find((img) => img.isLogo);

  const columns = groupNavColumns(extracted.navigation);

  return createBlock('header', {
    logo: {
      src: logoImg?.src || siteMetadata.favicon || '',
      alt: siteMetadata.title || 'Logo',
      width: '140px',
      link: '/',
    },
    layout: 'logo-left',
    variant: 'default',
    sticky: true,
    stickyBehavior: 'always',
    showSearch: false,
    ctaButton: {
      text: findCtaText(extracted) || 'Get Started',
      link: '',
      variant: 'primary',
      show: true,
    },
    secondaryAction: { text: 'Login', link: '', show: false },
    mobileMenuStyle: 'slide',
    topBar: {
      show: extracted.contactInfo.length > 0,
      text: '',
      phone: extracted.contactInfo.find((c) => c.type === 'phone')?.value || '',
      email: extracted.contactInfo.find((c) => c.type === 'email')?.value || '',
      socials: extracted.socialLinks.length > 0,
    },
    maxWidth: '1280px',
    height: '72px',
    mobileBreakpoint: '768px',
    // Store extracted nav data for the navigation items array
    _navItems: extracted.navigation.map(navItemToProps),
  });
}

/**
 * Convert footer-related data into a footer CmsBlock (global block).
 */
export function convertToFooterBlock(
  extracted: ExtractedContent,
  siteMetadata: SiteMetadata,
): CmsBlock {
  const logoImg = extracted.images.find((img) => img.isLogo);
  const footerSection = extracted.sections.find((s) => s.isFooter);

  // Build footer columns from footer navigation or main navigation
  const footerNav = footerSection?.links || [];
  const columns = buildFooterColumns(footerNav, extracted.navigation);

  return createBlock('footer', {
    logo: {
      src: logoImg?.src || siteMetadata.favicon || '',
      alt: siteMetadata.title || 'Logo',
      width: '120px',
    },
    columns,
    description: siteMetadata.description?.substring(0, 200) || '',
    newsletter: {
      show: false,
      headline: 'Stay updated',
      placeholder: 'Enter your email',
      buttonText: 'Subscribe',
    },
    socials: extracted.socialLinks.map((s) => ({
      platform: s.platform,
      url: s.url,
      icon: socialPlatformToIcon(s.platform),
    })),
    bottomBar: {
      copyright: `\u00A9 ${new Date().getFullYear()} ${siteMetadata.title || 'Company'}. All rights reserved.`,
      links: [
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Terms of Service', url: '/terms' },
      ],
    },
    layout: 'columns',
    variant: 'default',
    maxWidth: '1280px',
  });
}

/**
 * Generate a WebsiteTheme suggestion from extracted design tokens.
 */
export function generateThemeSuggestion(
  extracted: ExtractedContent,
  siteMetadata: SiteMetadata,
): Partial<WebsiteTheme> {
  const theme: Partial<WebsiteTheme> = {};

  // Typography
  const fonts = [...new Set([...extracted.fonts, ...siteMetadata.primaryFont ? [siteMetadata.primaryFont] : []])];
  if (fonts.length > 0) {
    const headingFont = fonts[0] || 'Inter';
    const bodyFont = fonts[1] || fonts[0] || 'Inter';
    theme.typography = {
      ...DEFAULT_THEME.typography,
      fontFamily: {
        heading: headingFont,
        body: bodyFont,
        mono: DEFAULT_THEME.typography.fontFamily.mono,
      },
    };
  }

  // Colors
  const palette = extracted.colorPalette;
  if (palette.length >= 2) {
    const colors: Partial<ThemeColorPalette> = {};
    if (palette[0]) colors.primary = palette[0];
    if (palette[1]) colors.secondary = palette[1];
    if (palette[2]) colors.accent = palette[2];
    theme.colors = { ...DEFAULT_THEME.colors, ...colors };
  }

  return theme;
}

// ---------------------------------------------------------------------------
// Section-based conversion
// ---------------------------------------------------------------------------

function convertSection(
  section: ExtractedSection,
  extracted: ExtractedContent,
): CmsBlock[] {
  const blocks: CmsBlock[] = [];

  // Hero detection: first section with large heading + image/background
  if (section.isHero || (section.order === 0 && section.headings.length > 0)) {
    blocks.push(buildHeroBlock(section, extracted));
    return blocks;
  }

  // Check if this section matches a specialized pattern
  const specBlock = matchSpecializedSection(section, extracted);
  if (specBlock) {
    blocks.push(specBlock);
    return blocks;
  }

  // Generic section with heading + content
  if (section.headings.length > 0 || section.paragraphs.length > 0 || section.images.length > 0) {
    // Wrap in a section block
    const children: CmsBlock[] = [];

    for (const heading of section.headings) {
      children.push(createBlock('heading', {
        text: heading.text,
        level: `h${heading.level}`,
        alignment: 'left',
      }));
    }

    for (const para of section.paragraphs) {
      children.push(createBlock('text', {
        text: para,
        alignment: 'left',
      }));
    }

    // Images as a gallery if multiple, or individual image blocks
    if (section.images.length > 3) {
      children.push(createBlock('gallery', {
        images: section.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          caption: '',
        })),
        layout: 'grid',
        columns: Math.min(section.images.length, 4),
        gap: '0.5rem',
        lightbox: true,
        showCaptions: false,
      }));
    } else {
      for (const img of section.images) {
        if (img.isLogo) continue; // Skip logos in body sections
        children.push(createBlock('image', {
          src: img.src,
          alt: img.alt,
          objectFit: 'cover',
          width: '100%',
          loading: 'lazy',
        }));
      }
    }

    if (children.length > 0) {
      const sectionBlock = createBlock('section', {
        fullWidth: false,
        minHeight: 'auto',
        verticalAlign: 'start',
        htmlTag: 'section',
      }, children);
      blocks.push(sectionBlock);
    }
  }

  return blocks;
}

// ---------------------------------------------------------------------------
// Specialized section matching
// ---------------------------------------------------------------------------

function matchSpecializedSection(
  section: ExtractedSection,
  extracted: ExtractedContent,
): CmsBlock | null {
  const className = (section.className || '').toLowerCase();
  const sectionText = [...section.headings.map((h) => h.text), ...section.paragraphs].join(' ').toLowerCase();

  // Features section
  if (/feature|service|benefit|capability|what we offer|why choose/i.test(className + ' ' + sectionText)) {
    if (section.headings.length > 0) {
      return buildFeaturesBlock(section, extracted);
    }
  }

  // Testimonials
  if (/testimonial|review|what.*say|customer.*stories|client.*feedback/i.test(className + ' ' + sectionText)) {
    const testimonials = extracted.testimonials;
    if (testimonials.length > 0) {
      return buildTestimonialsBlock(section.headings[0]?.text || '', testimonials);
    }
  }

  // FAQ
  if (/faq|frequently.*asked|common.*question/i.test(className + ' ' + sectionText)) {
    if (extracted.faqs.length > 0) {
      return buildFaqBlock(section.headings[0]?.text || '', extracted.faqs);
    }
  }

  // Pricing
  if (/pricing|plan|tier|package|cost/i.test(className + ' ' + sectionText)) {
    if (extracted.pricingPlans.length > 0) {
      return buildPricingBlock(section.headings[0]?.text || '', extracted.pricingPlans);
    }
  }

  // Stats / metrics
  if (/stat|metric|number|counter|achievement/i.test(className + ' ' + sectionText)) {
    if (extracted.stats.length > 0) {
      return buildStatsBlock(section.headings[0]?.text || '', extracted.stats);
    }
  }

  // CTA section
  if (/cta|call.*action|ready|get.*started|sign.*up|contact.*us/i.test(className + ' ' + sectionText)) {
    return buildCtaBlock(section);
  }

  return null;
}

// ---------------------------------------------------------------------------
// Flat content conversion (fallback when no sections detected)
// ---------------------------------------------------------------------------

function convertFlat(extracted: ExtractedContent): CmsBlock[] {
  const blocks: CmsBlock[] = [];

  // Build hero from first h1 + first large image
  const h1 = extracted.headings.find((h) => h.level === 1);
  const heroImage = extracted.images.find((img) => img.isHero || img.isBackground);
  if (h1) {
    const subheadline = extracted.paragraphs[0] || '';
    blocks.push(createBlock('hero', {
      headline: h1.text,
      subheadline,
      alignment: 'center',
      layout: heroImage ? 'background-media' : 'centered',
      primaryCta: { text: findCtaText(extracted) || 'Get Started', link: '', variant: 'primary' },
      secondaryCta: { text: 'Learn More', link: '', variant: 'outline' },
      mediaType: heroImage ? 'image' : 'none',
      mediaUrl: heroImage?.src || '',
      mediaAlt: heroImage?.alt || '',
      overlayColor: heroImage ? 'rgba(0,0,0,0.4)' : '',
      overlayOpacity: 0.5,
      minHeight: '80vh',
    }));
  }

  // Remaining headings + paragraphs
  let paraIndex = h1 ? 1 : 0;
  for (const heading of extracted.headings.filter((h) => h.level > 1)) {
    blocks.push(createBlock('heading', {
      text: heading.text,
      level: `h${heading.level}`,
      alignment: 'left',
    }));

    // Attach following paragraphs until next heading
    while (paraIndex < extracted.paragraphs.length) {
      const para = extracted.paragraphs[paraIndex];
      if (!para) break;
      blocks.push(createBlock('text', {
        text: para,
        alignment: 'left',
      }));
      paraIndex++;
      // Stop after 3 paragraphs per heading to avoid runaway
      if (paraIndex % 3 === 0) break;
    }
  }

  // Remaining paragraphs
  while (paraIndex < extracted.paragraphs.length) {
    const para = extracted.paragraphs[paraIndex];
    if (para) {
      blocks.push(createBlock('text', {
        text: para,
        alignment: 'left',
      }));
    }
    paraIndex++;
  }

  // Images (non-logo, non-hero)
  const contentImages = extracted.images.filter(
    (img) => !img.isLogo && !img.isHero && !img.isBackground,
  );
  if (contentImages.length > 3) {
    blocks.push(createBlock('gallery', {
      images: contentImages.map((img) => ({
        src: img.src,
        alt: img.alt,
        caption: '',
      })),
      layout: 'grid',
      columns: 3,
      gap: '0.5rem',
      lightbox: true,
    }));
  } else {
    for (const img of contentImages) {
      blocks.push(createBlock('image', {
        src: img.src,
        alt: img.alt,
        objectFit: 'cover',
        width: '100%',
        loading: 'lazy',
      }));
    }
  }

  return blocks;
}

// ---------------------------------------------------------------------------
// Append specialized blocks not captured by section analysis
// ---------------------------------------------------------------------------

function appendSpecializedBlocks(
  blocks: CmsBlock[],
  extracted: ExtractedContent,
): void {
  const existingTypes = new Set(blocks.map((b) => b.type));

  // Testimonials
  if (!existingTypes.has('testimonials') && extracted.testimonials.length > 0) {
    blocks.push(buildTestimonialsBlock('What Our Customers Say', extracted.testimonials));
  }

  // FAQ
  if (!existingTypes.has('faq') && extracted.faqs.length > 0) {
    blocks.push(buildFaqBlock('Frequently Asked Questions', extracted.faqs));
  }

  // Pricing
  if (!existingTypes.has('pricing') && extracted.pricingPlans.length > 0) {
    blocks.push(buildPricingBlock('Pricing', extracted.pricingPlans));
  }

  // Stats
  if (!existingTypes.has('stats') && extracted.stats.length > 0) {
    blocks.push(buildStatsBlock('', extracted.stats));
  }

  // Forms
  if (!existingTypes.has('form') && extracted.forms.length > 0) {
    const form = extracted.forms[0];
    if (form) {
      blocks.push(buildFormBlock(form));
    }
  }

  // Videos
  if (!existingTypes.has('video') && extracted.videos.length > 0) {
    for (const video of extracted.videos.slice(0, 3)) {
      blocks.push(createBlock('video', {
        url: video.src,
        source: video.type,
        autoplay: false,
        muted: false,
        loop: false,
        controls: true,
        aspectRatio: '16/9',
        poster: video.poster || '',
      }));
    }
  }

  // Social links as a social-icons block if not in header/footer
  if (extracted.socialLinks.length > 0) {
    // This will appear in the footer usually; only add if explicitly standalone
    // We skip this to avoid duplication with footer block
  }
}

// ---------------------------------------------------------------------------
// Block builders
// ---------------------------------------------------------------------------

function buildHeroBlock(
  section: ExtractedSection,
  extracted: ExtractedContent,
): CmsBlock {
  const headline = section.headings[0]?.text || extracted.headings[0]?.text || 'Welcome';
  const subheadline = section.paragraphs[0] || '';
  const heroImage =
    section.images.find((img) => img.isHero || img.isBackground) ||
    section.images[0];

  const hasBackground = !!heroImage;

  return createBlock('hero', {
    headline,
    subheadline,
    alignment: 'center',
    layout: hasBackground ? 'background-media' : 'centered',
    primaryCta: {
      text: findCtaText(extracted) || 'Get Started',
      link: '',
      variant: 'primary',
    },
    secondaryCta: {
      text: 'Learn More',
      link: '',
      variant: 'outline',
    },
    mediaType: hasBackground ? 'image' : 'none',
    mediaUrl: heroImage?.src || '',
    mediaAlt: heroImage?.alt || '',
    overlayColor: hasBackground ? 'rgba(0, 0, 0, 0.4)' : '',
    overlayOpacity: 0.5,
    minHeight: '80vh',
    badge: '',
    trustLogos: [],
    showScrollIndicator: false,
    particles: false,
    gradientText: false,
  });
}

function buildFeaturesBlock(
  section: ExtractedSection,
  extracted: ExtractedContent,
): CmsBlock {
  const headline = section.headings[0]?.text || 'Our Features';
  const description = section.paragraphs[0] || '';

  // Try to parse features from the section's content
  // Look for repeating patterns of icon/title/description
  const features: Array<{
    icon: string;
    title: string;
    description: string;
    link: string;
  }> = [];

  // Use sub-headings as feature titles with following paragraphs
  const subHeadings = section.headings.filter((h) => h.level > (section.headings[0]?.level || 2));
  if (subHeadings.length >= 2) {
    for (const heading of subHeadings) {
      features.push({
        icon: guessIconForText(heading.text),
        title: heading.text,
        description: '', // Could try to associate with nearby paragraphs
        link: '',
      });
    }
  }

  // If no sub-headings, try list items
  if (features.length === 0) {
    const lists = extracted.lists.slice(0, 2);
    for (const list of lists) {
      for (const item of list.items.slice(0, 6)) {
        features.push({
          icon: 'Check',
          title: item.split('.')[0]?.trim() || item,
          description: item.includes('.') ? item.split('.').slice(1).join('.').trim() : '',
          link: '',
        });
      }
    }
  }

  // Fallback: generate from section paragraphs
  if (features.length === 0 && section.paragraphs.length >= 2) {
    for (const para of section.paragraphs.slice(1, 7)) {
      const parts = para.split(/[.!?]/);
      const title = parts[0]?.trim() || para.substring(0, 40);
      const desc = parts.slice(1).join('. ').trim();
      features.push({
        icon: guessIconForText(title),
        title,
        description: desc,
        link: '',
      });
    }
  }

  return createBlock('features', {
    headline,
    description,
    features: features.length > 0
      ? features
      : [
          { icon: 'Zap', title: 'Feature One', description: 'Description here.', link: '' },
          { icon: 'Shield', title: 'Feature Two', description: 'Description here.', link: '' },
          { icon: 'Users', title: 'Feature Three', description: 'Description here.', link: '' },
        ],
    columns: Math.min(features.length || 3, 4),
    layout: 'grid',
    iconStyle: 'circle',
    iconSize: 'md',
    showDividers: false,
    alignment: 'center',
    animated: true,
  });
}

function buildTestimonialsBlock(
  headline: string,
  testimonials: ExtractedTestimonial[],
): CmsBlock {
  return createBlock('testimonials', {
    headline: headline || 'What Our Customers Say',
    testimonials: testimonials.slice(0, 6).map((t) => ({
      quote: t.quote,
      author: t.author,
      title: t.title || '',
      avatar: t.avatar || '',
      rating: t.rating || 5,
      company: t.company || '',
      logo: '',
    })),
    layout: testimonials.length <= 1 ? 'single-featured' : 'carousel',
    columns: Math.min(testimonials.length, 3),
    showRating: testimonials.some((t) => t.rating),
    showAvatar: testimonials.some((t) => t.avatar),
    showCompanyLogo: false,
    autoPlay: true,
    variant: 'card',
  });
}

function buildFaqBlock(headline: string, faqs: ExtractedFaq[]): CmsBlock {
  return createBlock('faq', {
    headline: headline || 'Frequently Asked Questions',
    description: '',
    questions: faqs.slice(0, 12).map((f) => ({
      question: f.question,
      answer: f.answer,
      category: '',
    })),
    layout: faqs.length > 6 ? 'two-column' : 'single',
    showCategories: false,
    variant: 'accordion',
    structuredData: true,
  });
}

function buildPricingBlock(
  headline: string,
  plans: ExtractedPricingPlan[],
): CmsBlock {
  return createBlock('pricing', {
    headline: headline || 'Pricing',
    description: '',
    billingToggle: false,
    plans: plans.slice(0, 4).map((p) => {
      // Parse numeric price
      const priceMatch = /[\d,.]+/.exec(p.price);
      const price = priceMatch ? parseFloat(priceMatch[0].replace(/,/g, '')) : 0;

      return {
        name: p.name,
        monthlyPrice: price,
        yearlyPrice: price * 10,
        description: p.description || '',
        features: p.features,
        cta: { text: p.cta || 'Get Started', link: '' },
        highlighted: p.highlighted,
        badge: p.highlighted ? 'Popular' : '',
      };
    }),
    currency: '$',
    showAnnualSavings: false,
    layout: 'cards',
    featureComparison: false,
  });
}

function buildStatsBlock(headline: string, stats: ExtractedStat[]): CmsBlock {
  return createBlock('stats', {
    headline: headline || '',
    stats: stats.slice(0, 6).map((s) => {
      const numericValue = parseFloat(s.value.replace(/,/g, '')) || 0;
      return {
        value: numericValue,
        prefix: s.prefix || '',
        suffix: s.suffix || '',
        label: s.label,
        icon: guessIconForText(s.label),
      };
    }),
    columns: Math.min(stats.length, 4),
    variant: 'default',
    animated: true,
    duration: 2000,
    separator: ',',
  });
}

function buildCtaBlock(section: ExtractedSection): CmsBlock {
  const headline = section.headings[0]?.text || 'Ready to Get Started?';
  const description = section.paragraphs[0] || '';
  const ctaLink = section.links[0];

  return createBlock('cta', {
    headline,
    description,
    primaryCta: {
      text: ctaLink?.text || 'Get Started',
      link: ctaLink?.href || '',
    },
    secondaryCta: { text: '', link: '' },
    layout: 'centered',
    variant: 'default',
    backgroundImage: '',
    showEmailInput: false,
    emailPlaceholder: 'Enter your email',
    note: '',
  });
}

function buildFormBlock(form: ExtractedForm): CmsBlock {
  return createBlock('form', {
    fields: form.fields.slice(0, 10).map((f) => mapFormField(f)),
    submitText: 'Submit',
    submitVariant: 'primary',
    submitAlignment: 'left',
    successMessage: 'Thank you! We\'ll be in touch soon.',
    errorMessage: 'Something went wrong. Please try again.',
    redirectUrl: '',
    formAction: 'email',
    emailTo: '',
    webhookUrl: '',
    apiEndpoint: '',
    showLabels: true,
    layout: 'stacked',
    spamProtection: 'honeypot',
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mapFormField(field: ExtractedFormField): {
  id: string;
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  options?: string[];
  width: string;
} {
  const typeMap: Record<string, string> = {
    text: 'text',
    email: 'email',
    tel: 'tel',
    phone: 'tel',
    number: 'number',
    textarea: 'textarea',
    select: 'select',
    checkbox: 'checkbox',
    radio: 'radio',
    date: 'date',
    file: 'file',
    password: 'text', // Convert password to text for CMS display
  };

  const mappedType = typeMap[field.type] || 'text';
  const isWide = ['textarea', 'file'].includes(mappedType);

  return {
    id: field.name || `field_${Math.random().toString(36).slice(2, 8)}`,
    label: field.label || field.name || 'Field',
    type: mappedType,
    required: field.required,
    placeholder: field.placeholder || '',
    options: field.options,
    width: isWide ? 'full' : 'half',
  };
}

function findCtaText(extracted: ExtractedContent): string {
  // Look for common CTA patterns in links
  const ctaPatterns = /get started|sign up|start.*free|try.*free|book.*demo|contact.*us|request.*demo|learn more|shop now|buy now|subscribe/i;

  for (const link of extracted.links) {
    if (ctaPatterns.test(link.text)) {
      return link.text;
    }
  }

  // Check navigation for CTAs
  for (const nav of extracted.navigation) {
    if (ctaPatterns.test(nav.label)) {
      return nav.label;
    }
  }

  return '';
}

function navItemToProps(item: ExtractedNavItem): {
  label: string;
  url: string;
  children?: Array<{ label: string; url: string }>;
} {
  return {
    label: item.label,
    url: item.url,
    children: item.children?.map((c) => ({
      label: c.label,
      url: c.url,
    })),
  };
}

function groupNavColumns(
  navItems: ExtractedNavItem[],
): Array<{
  title: string;
  links: Array<{ label: string; url: string }>;
}> {
  // Group nav items with children into columns
  const columns: Array<{
    title: string;
    links: Array<{ label: string; url: string }>;
  }> = [];

  for (const item of navItems) {
    if (item.children && item.children.length > 0) {
      columns.push({
        title: item.label,
        links: item.children.map((c) => ({
          label: c.label,
          url: c.url,
        })),
      });
    }
  }

  // If no dropdowns found, create a single column
  if (columns.length === 0 && navItems.length > 0) {
    columns.push({
      title: 'Navigation',
      links: navItems.map((n) => ({
        label: n.label,
        url: n.url,
      })),
    });
  }

  return columns;
}

function buildFooterColumns(
  footerLinks: Array<{ text: string; href: string; isExternal: boolean }>,
  mainNav: ExtractedNavItem[],
): Array<{
  title: string;
  links: Array<{ label: string; url: string }>;
}> {
  // Use main nav dropdowns as footer columns
  const columns = groupNavColumns(mainNav);

  // If footer has its own links, add them
  if (footerLinks.length > 0 && columns.length < 4) {
    const groupedByCategory: Record<string, Array<{ label: string; url: string }>> = {};

    for (const link of footerLinks) {
      // Try to categorize by URL path
      const category = categorizeLinkForFooter(link.href, link.text);
      if (!groupedByCategory[category]) {
        groupedByCategory[category] = [];
      }
      groupedByCategory[category].push({
        label: link.text,
        url: link.href,
      });
    }

    for (const [title, links] of Object.entries(groupedByCategory)) {
      if (links.length > 0) {
        columns.push({ title, links });
      }
    }
  }

  // Ensure at least one column
  if (columns.length === 0) {
    columns.push({
      title: 'Company',
      links: [
        { label: 'About', url: '/about' },
        { label: 'Contact', url: '/contact' },
      ],
    });
  }

  return columns.slice(0, 4);
}

function categorizeLinkForFooter(href: string, text: string): string {
  const combinedText = `${href} ${text}`.toLowerCase();

  if (/about|career|team|story|mission|press|news/i.test(combinedText)) return 'Company';
  if (/feature|product|service|solution|platform/i.test(combinedText)) return 'Product';
  if (/help|doc|support|faq|guide|tutorial|api|resource/i.test(combinedText)) return 'Resources';
  if (/blog|article|post|insight/i.test(combinedText)) return 'Resources';
  if (/legal|privacy|terms|cookie|disclaimer/i.test(combinedText)) return 'Legal';
  if (/price|plan|billing|cost/i.test(combinedText)) return 'Product';
  if (/contact|email|phone|location/i.test(combinedText)) return 'Company';

  return 'Links';
}

function socialPlatformToIcon(platform: string): string {
  const iconMap: Record<string, string> = {
    facebook: 'Facebook',
    twitter: 'Twitter',
    instagram: 'Instagram',
    linkedin: 'Linkedin',
    youtube: 'Youtube',
    tiktok: 'Music2',
    pinterest: 'Pin',
    github: 'Github',
    dribbble: 'Dribbble',
    discord: 'MessageCircle',
    whatsapp: 'MessageCircle',
    telegram: 'Send',
    reddit: 'Globe',
    medium: 'BookOpen',
  };
  return iconMap[platform.toLowerCase()] || 'ExternalLink';
}

function guessIconForText(text: string): string {
  const lower = text.toLowerCase();

  if (/speed|fast|performance|quick|lightning/i.test(lower)) return 'Zap';
  if (/secure|security|protect|safe|shield|trust/i.test(lower)) return 'Shield';
  if (/team|user|people|community|collaborat/i.test(lower)) return 'Users';
  if (/analytic|chart|data|insight|report|metric/i.test(lower)) return 'BarChart3';
  if (/support|help|service|headphone/i.test(lower)) return 'Headphones';
  if (/global|world|international|country/i.test(lower)) return 'Globe';
  if (/cloud|server|host|infrastructure/i.test(lower)) return 'Cloud';
  if (/integrat|connect|api|plugin/i.test(lower)) return 'Plug';
  if (/custom|config|setting|tailor/i.test(lower)) return 'Settings';
  if (/automat|workflow|bot|ai|smart/i.test(lower)) return 'Bot';
  if (/mobile|app|phone/i.test(lower)) return 'Smartphone';
  if (/email|mail|message|notif/i.test(lower)) return 'Mail';
  if (/time|clock|schedul|calendar/i.test(lower)) return 'Clock';
  if (/money|price|cost|dollar|payment|billing/i.test(lower)) return 'DollarSign';
  if (/design|style|theme|brand/i.test(lower)) return 'Palette';
  if (/search|find|discover/i.test(lower)) return 'Search';
  if (/upload|download|file|document/i.test(lower)) return 'FileText';
  if (/lock|auth|login|password/i.test(lower)) return 'Lock';
  if (/scale|grow|expand|uptime/i.test(lower)) return 'TrendingUp';
  if (/code|develop|build|engineer/i.test(lower)) return 'Code';
  if (/education|learn|train|course/i.test(lower)) return 'GraduationCap';
  if (/star|rate|review|quality/i.test(lower)) return 'Star';
  if (/check|verify|valid|compli/i.test(lower)) return 'CheckCircle';
  if (/heart|love|favorite/i.test(lower)) return 'Heart';
  if (/save|discount|deal|offer/i.test(lower)) return 'Tag';
  if (/ship|deliver|transport|logist/i.test(lower)) return 'Truck';
  if (/refresh|update|sync/i.test(lower)) return 'RefreshCw';

  return 'Sparkles';
}
