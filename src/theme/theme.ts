export interface ThemeColors {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  accent: {
    primary: string;
    secondary: string;
    hover: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  border: {
    default: string;
    hover: string;
  };
}

export interface Breakpoints {
  mobile: { min: number; max: number };
  tablet: { min: number; max: number };
  desktop: { min: number; max: number };
  wide: { min: number };
}

export interface SpacingScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

export interface TypographyScale {
  fontFamily: {
    primary: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
    display: string;
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface Theme {
  colors: ThemeColors;
  breakpoints: Breakpoints;
  spacing: SpacingScale;
  typography: TypographyScale;
}

export const theme: Theme = {
  colors: {
    background: {
      primary: '#0F0F0F',
      secondary: '#202020',
      tertiary: '#2A2A2A',
    },
    accent: {
      primary: '#5DD62C',
      secondary: '#5AB526', // Further lightened for better contrast on all backgrounds
      hover: '#6FE73D',
    },
    text: {
      primary: '#F8F8F8',
      secondary: '#B8B8B8',
      tertiary: '#9A9A9A', // Lightened from #808080 for better contrast
    },
    border: {
      default: '#757575', // Lightened to achieve 3:1 contrast on all backgrounds
      hover: '#5DD62C',
    },
  },
  breakpoints: {
    mobile: { min: 320, max: 767 },
    tablet: { min: 768, max: 1023 },
    desktop: { min: 1024, max: 1439 },
    wide: { min: 1440 },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },
  typography: {
    fontFamily: {
      primary: "'Orbitron', 'Exo 2', sans-serif",
      mono: "'Fira Code', monospace",
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '24px',
      xxl: '32px',
      xxxl: '48px',
      display: '72px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};
