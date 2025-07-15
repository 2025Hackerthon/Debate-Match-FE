import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import type { ButtonHTMLAttributes } from "react";
import type { DEBATETheme } from "../../styles/theme";

type ButtonSize = "small" | "large";
type ButtonVariant = "blue" | "gray" | "white" | "red";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const Button = ({
  children,
  size = "small",
  variant = "blue",
  ...rest
}: ButtonProps) => {
  const theme = useTheme() as DEBATETheme;

  const font =
    size === "small" ? theme.font.LabelMedium : theme.font.LabelLarge;

  return (
    <StyledButton size={size} variant={variant} font={font} {...rest}>
      {children}
    </StyledButton>
  );
};

const sizePadding = {
  small: "6px 14px",
  large: "12px 24px"
};

const StyledButton = styled.button<{
  size: ButtonSize;
  variant: ButtonVariant;
  font: {
    fontSize: string;
    lineHeight: string;
    weight: string;
  };
}>`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ size }) => sizePadding[size]};
  border-radius: 12px;
  font-size: ${({ font }) => font.fontSize};
  line-height: ${({ font }) => font.lineHeight};
  font-weight: ${({ font }) => font.weight};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  ${({ variant, theme }) =>
    variant === "blue" &&
    `
      background-color: ${theme.colors.blue[400]};
      color: ${theme.colors.sub.normal[10]};
      &:hover {
        background-color: ${theme.colors.blue[500]};
      }
    `}

  ${({ variant, theme }) =>
    variant === "gray" &&
    `
      background-color: ${theme.colors.gray[100]};
      color: ${theme.colors.sub.normal[20]};
      &:hover {
        background-color: ${theme.colors.gray[200]};
      }
    `}

    ${({ variant, theme }) =>
    variant === "white" &&
    `
      background-color: ${theme.colors.sub.normal[10]};
      color: ${theme.colors.sub.normal[20]};
      &:hover {
        background-color: ${theme.colors.gray[100]};
      }
    `}

  ${({ variant, theme }) =>
    variant === "red" &&
    `
      background-color: ${theme.colors.sub.error[10]};
      color: ${theme.colors.sub.error[20]};
      &:hover {
        background-color: #ebd4c6;
      }
    `}
`;
