export interface FontStyle {
  fontSize: string;
  lineHeight: string;
  weight: string;
}

export interface TextStyles {
  LabelSmall: FontStyle;
  LabelMedium: FontStyle;
  LabelLarge: FontStyle;
  BodyTiny: FontStyle;
  BodySmall: FontStyle;
  BodyMedium: FontStyle;
  BodyLarge: FontStyle;
  TitleTiny: FontStyle;
  TitleSmall: FontStyle;
  TitleMedium: FontStyle;
  TitleLarge: FontStyle;
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
}

export interface ThemeColor {
  blue: ColorPalette;
  gray: ColorPalette;
  sub: {
    normal: SubColorPalette;
    error: SubColorPalette;
  };
}

export interface DEBATETheme {
  colors: ThemeColor;
  font: TextStyles;
}

const fontToCss = (
  size: number,
  lineHeight: number,
  weight: number
): FontStyle => ({
  fontSize: `${size}px`,
  lineHeight: `${lineHeight}px`,
  weight: weight.toString()
});

const textStyles: TextStyles = {
  LabelSmall: fontToCss(14, 20, 500),
  LabelMedium: fontToCss(16, 24, 500),
  LabelLarge: fontToCss(18, 24, 500),
  BodyTiny: fontToCss(14, 20, 400),
  BodySmall: fontToCss(16, 24, 400),
  BodyMedium: fontToCss(18, 24, 400),
  BodyLarge: fontToCss(20, 32, 400),
  TitleTiny: fontToCss(16, 24, 600),
  TitleSmall: fontToCss(24, 32, 600),
  TitleMedium: fontToCss(36, 48, 600),
  TitleLarge: fontToCss(48, 64, 600)
};

//   bold: "700",
//   medium: "500",
//   regular: "400"
// };

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
      normal: {
        10: "#ffffff",
        20: "#000000"
      },
      error: {
        10: "#FFE6D8",
        20: "#DB2C36"
      }
    }
  },
  font: textStyles
};
