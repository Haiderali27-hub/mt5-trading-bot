/**
 * Convert hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.0 formula
 */
export function getRelativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  
  const [rs, gs, bs] = [r, g, b].map(val => {
    const sRGB = val / 255;
    return sRGB <= 0.03928 
      ? sRGB / 12.92 
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Based on WCAG 2.0 formula
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA standards
 * @param ratio - The contrast ratio to check
 * @param isLargeText - Whether the text is large (18pt+ or 14pt+ bold)
 * @returns true if the ratio meets WCAG AA standards
 */
export function meetsWCAGAA(ratio: number, isLargeText: boolean = false): boolean {
  const minimumRatio = isLargeText ? 3.0 : 4.5;
  return ratio >= minimumRatio;
}
