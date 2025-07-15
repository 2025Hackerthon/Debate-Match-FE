export interface FontStyle {
  fontSize: string;
  lineHeight: string;
}

export interface TextStyles {
  h1: FontStyle;
  h2: FontStyle;
  h3: FontStyle;
  h4: FontStyle;
  h5: FontStyle;
  h6: FontStyle;
  body1: FontStyle;
  body2: FontStyle;
  body3: FontStyle;
  caption: FontStyle;
}

export interface FontWeight {
  bold: string;
  medium: string;
  regular: string;
}

export interface ColorPalette {
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
}

export interface SubColorPalette {
  10?: string;
  20?: string;
  30?: string;
  40?: string;
}

export interface ThemeColor {
  blue: ColorPalette;
  gray: ColorPalette;
  sub: {
    red: SubColorPalette;
    green: SubColorPalette;
    blue: SubColorPalette;
    yellow: SubColorPalette;
  };
}

export interface DEBATETheme {
  colors: ThemeColor;
  font: TextStyles;
  fontWeight: FontWeight;
}

const fontToCss = (size: number, lineHeight: number): FontStyle => ({
  fontSize: `${size}px`,
  lineHeight: `${lineHeight}px`
});

const textStyles: TextStyles = {
  h1: fontToCss(40, 60),
  h2: fontToCss(36, 54),
  h3: fontToCss(32, 48),
  h4: fontToCss(28, 40),
  h5: fontToCss(24, 36),
  h6: fontToCss(20, 28),
  body1: fontToCss(18, 26),
  body2: fontToCss(16, 24),
  body3: fontToCss(14, 20),
  caption: fontToCss(12, 18)
};

const fontWeight: FontWeight = {
  bold: "700",
  medium: "500",
  regular: "400"
};

export const theme: DEBATETheme = {
  colors: {
    blue: {
      100: "oklch(0.951 0.026 236.824)",
      200: "oklch(0.901 0.058 230.902)",
      300: "oklch(0.828 0.111 230.318)",
      400: "oklch(0.746 0.16 232.661)",
      500: "oklch(0.685 0.169 237.323)",
      600: "oklch(0.588 0.158 241.966)",
      700: "oklch(0.5 0.134 242.749)",
      800: "oklch(0.443 0.11 240.79)",
      900: "oklch(0.391 0.09 240.876)"
    },
    gray: {
      100: "oklch(0.968 0.007 247.896)",
      200: "oklch(0.929 0.013 255.508)",
      300: "oklch(0.869 0.022 252.894)",
      400: "oklch(0.704 0.04 256.788)",
      500: "oklch(0.554 0.046 257.417)",
      600: "oklch(0.446 0.043 257.281)",
      700: "oklch(0.372 0.044 257.287)",
      800: "oklch(0.279 0.041 260.031)",
      900: "oklch(0.208 0.042 265.755)"
    },
    sub: {
      red: {
        10: "#FCE9E7",
        20: "#E74C3C"
      },
      green: {
        10: "#E5F8EE",
        20: "#2ECC71"
      },
      blue: {
        10: "#F2F6FF",
        20: "#E0EBF6",
        30: "#237BC9",
        40: "#002C53"
      },
      yellow: {
        10: "#FDF7E2",
        20: "#F1C40F"
      }
    }
  },
  font: textStyles,
  fontWeight: fontWeight
};
