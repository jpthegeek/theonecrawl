// ---------------------------------------------------------------------------
// TheOneCrawl — Inlined CMS types (originally from @nexuvo/cms-core)
//
// These types power the CMS block conversion feature. They are self-contained
// with no external dependencies.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Block types
// ---------------------------------------------------------------------------

export interface BlockStyle {
  margin?: { top?: string; right?: string; bottom?: string; left?: string };
  padding?: { top?: string; right?: string; bottom?: string; left?: string };
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  borderWidth?: string;
  borderColor?: string;
  borderStyle?: string;
  borderRadius?: string;
  boxShadow?: string;
  opacity?: number;
  overflow?: string;
  maxWidth?: string;
  minHeight?: string;
  customCSS?: string;
  animation?: {
    type: string;
    duration: number;
    delay: number;
    easing: string;
  };
}

export interface ResponsiveOverrides {
  mobile?: Partial<BlockStyle>;
  tablet?: Partial<BlockStyle>;
}

export interface VisibilitySettings {
  desktop: boolean;
  tablet: boolean;
  mobile: boolean;
}

export interface VisibilityCondition {
  type: string;
  operator: string;
  value: unknown;
}

export interface CmsBlock {
  id: string;
  type: string;
  props: Record<string, unknown>;
  style: BlockStyle;
  responsive?: ResponsiveOverrides;
  visibility: VisibilitySettings;
  children?: CmsBlock[];
  conditions?: VisibilityCondition[];
}

// ---------------------------------------------------------------------------
// Theme types
// ---------------------------------------------------------------------------

export interface ThemeColorPalette {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  card: string;
  cardForeground: string;
  border: string;
  input: string;
  ring: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
}

export interface ThemeTypography {
  fontFamily: {
    heading: string;
    body: string;
    mono: string;
  };
  fontSize: Record<string, string>;
  fontWeight: Record<string, number>;
  lineHeight: Record<string, string>;
  letterSpacing: Record<string, string>;
}

export interface ThemeButtonStyle {
  borderRadius: string;
  paddingX: string;
  paddingY: string;
  fontWeight: number;
  textTransform: string;
  shadow: string;
  hoverEffect: string;
}

export interface ThemeSpacing {
  sectionPaddingY: string;
  sectionPaddingX: string;
  containerMaxWidth: string;
  blockGap: string;
}

export interface WebsiteTheme {
  id: string;
  name: string;
  colors: ThemeColorPalette;
  darkColors?: Partial<ThemeColorPalette>;
  typography: ThemeTypography;
  buttons: {
    primary: ThemeButtonStyle;
    secondary: ThemeButtonStyle;
    outline: ThemeButtonStyle;
    ghost: ThemeButtonStyle;
  };
  spacing: ThemeSpacing;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const DEFAULT_BLOCK_STYLE: BlockStyle = {
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
  padding: { top: '0', right: '0', bottom: '0', left: '0' },
  backgroundColor: '',
  backgroundImage: '',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderWidth: '0',
  borderColor: 'transparent',
  borderStyle: 'solid',
  borderRadius: '0',
  boxShadow: 'none',
  opacity: 1,
  overflow: 'visible',
  maxWidth: '100%',
  minHeight: 'auto',
  customCSS: '',
};

const DEFAULT_VISIBILITY: VisibilitySettings = {
  desktop: true,
  tablet: true,
  mobile: true,
};

export const DEFAULT_THEME: WebsiteTheme = {
  id: 'default',
  name: 'Default',
  colors: {
    primary: '#2563eb',
    primaryForeground: '#ffffff',
    secondary: '#64748b',
    secondaryForeground: '#ffffff',
    accent: '#f59e0b',
    accentForeground: '#ffffff',
    background: '#ffffff',
    foreground: '#0f172a',
    muted: '#f1f5f9',
    mutedForeground: '#64748b',
    card: '#ffffff',
    cardForeground: '#0f172a',
    border: '#e2e8f0',
    input: '#e2e8f0',
    ring: '#2563eb',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
    success: '#22c55e',
    successForeground: '#ffffff',
    warning: '#f59e0b',
    warningForeground: '#ffffff',
  },
  typography: {
    fontFamily: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'JetBrains Mono',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
    },
  },
  buttons: {
    primary: {
      borderRadius: '0.5rem',
      paddingX: '1.5rem',
      paddingY: '0.75rem',
      fontWeight: 600,
      textTransform: 'none',
      shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      hoverEffect: 'lift',
    },
    secondary: {
      borderRadius: '0.5rem',
      paddingX: '1.5rem',
      paddingY: '0.75rem',
      fontWeight: 500,
      textTransform: 'none',
      shadow: 'none',
      hoverEffect: 'darken',
    },
    outline: {
      borderRadius: '0.5rem',
      paddingX: '1.5rem',
      paddingY: '0.75rem',
      fontWeight: 500,
      textTransform: 'none',
      shadow: 'none',
      hoverEffect: 'darken',
    },
    ghost: {
      borderRadius: '0.5rem',
      paddingX: '1rem',
      paddingY: '0.5rem',
      fontWeight: 500,
      textTransform: 'none',
      shadow: 'none',
      hoverEffect: 'lighten',
    },
  },
  spacing: {
    sectionPaddingY: '5rem',
    sectionPaddingX: '1.5rem',
    containerMaxWidth: '1280px',
    blockGap: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
};

// ---------------------------------------------------------------------------
// Factory function
// ---------------------------------------------------------------------------

function generateBlockId(): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `block_${random}_${Date.now().toString(36)}`;
}

export function createBlock(
  type: string,
  props: Record<string, unknown> = {},
  children?: CmsBlock[],
): CmsBlock {
  return {
    id: generateBlockId(),
    type,
    props,
    style: structuredClone(DEFAULT_BLOCK_STYLE),
    visibility: { ...DEFAULT_VISIBILITY },
    children,
  };
}
