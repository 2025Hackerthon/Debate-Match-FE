import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import type { DEBATETheme, TextStyles } from "../../styles/theme";

type Variant = keyof TextStyles;

interface IProps {
  variant: Variant;
  color?: string;
  children: React.ReactNode;
}

const StyledText = styled.span<{
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  color?: string;
}>`
  font-size: ${({ fontSize }) => fontSize};
  line-height: ${({ lineHeight }) => lineHeight};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ color, theme }) => color ?? theme.colors.gray[900]};
`;

export const Text = ({ variant, color, children }: IProps) => {
  const theme = useTheme() as DEBATETheme;
  const { fontSize, lineHeight, weight } = theme.font[variant];
  return (
    <StyledText
      fontSize={fontSize}
      lineHeight={lineHeight}
      fontWeight={weight}
      color={color}
    >
      {children}
    </StyledText>
  );
};
