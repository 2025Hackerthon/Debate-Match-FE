import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import type { ButtonHTMLAttributes } from "react";
import type { DEBATETheme } from "../../styles/theme";

type ButtonSize = "small" | "large";
type ButtonVariant = "blue" | "gray" | "white" | "red";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export const Button = ({
  children,
  size = "small",
  variant = "blue",
  disabled = false,
  ...rest
}: ButtonProps) => {
  const theme = useTheme() as DEBATETheme;

  const font =
    size === "small" ? theme.font.LabelSmall : theme.font.LabelMedium;

  return (
    <StyledButton
      size={size}
      variant={variant}
      font={font}
      disabled={disabled}
      $disabled={disabled}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

// 사이즈별 패딩
const sizePadding = {
  small: "5px 8px",
  large: "10px 8px"
};

const StyledButton = styled.button<{
  size: ButtonSize;
  variant: ButtonVariant;
  font: {
    fontSize: string;
    lineHeight: string;
    weight: string;
  };
  $disabled: boolean;
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
  transition: background-color 0.2s;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  ${({ variant, theme, $disabled }) => {
    const styles = {
      blue: `
        background-color: ${theme.colors.blue[400]};
        color: ${theme.colors.sub.normal[10]};
        ${!$disabled ? `&:hover { background-color: ${theme.colors.blue[500]}; }` : ""}
      `,
      gray: `
        background-color: ${theme.colors.gray[100]};
        color: ${theme.colors.sub.normal[20]};
        ${!$disabled ? `&:hover { background-color: ${theme.colors.gray[200]}; }` : ""}
      `,
      white: `
        background-color: ${theme.colors.sub.normal[10]};
        color: ${theme.colors.sub.normal[20]};
        ${!$disabled ? `&:hover { background-color: ${theme.colors.gray[100]}; }` : ""}
      `,
      red: `
        background-color: ${theme.colors.sub.error[10]};
        color: ${theme.colors.sub.error[20]};
        ${!$disabled ? `&:hover { background-color: #ebd4c6; }` : ""}
      `
    };

    return styles[variant];
  }}
`;
