import React, { useState, type InputHTMLAttributes } from "react";
import styled from "@emotion/styled";
import { theme } from "../../styles/theme";
import { Text } from "../common/Text";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

interface IStyledInputProps extends Pick<IProps, "error"> {
  withIcon?: boolean;
  hasError?: boolean;
}

export const Input = ({ label, error, type = "text", ...rest }: IProps) => {
  const inputId = React.useId();
  const isPassword = type === "password";

  const [visible, setVisible] = useState(false);
  const inputType = isPassword ? (visible ? "text" : "password") : type;

  return (
    <Wrapper>
      {label && (
        <StyledLabel htmlFor={inputId}>
          <Text variant="LabelMedium" color={theme.colors.sub.normal[20]}>
            {label}
          </Text>
        </StyledLabel>
      )}

      <InputContainer>
        <StyledInput
          id={inputId}
          hasError={error}
          type={inputType}
          withIcon={isPassword}
          {...rest}
        />

        {isPassword && (
          <IconButton
            type="button"
            onClick={() => setVisible(v => !v)}
            aria-label={visible ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {!visible ? (
              <AiOutlineEyeInvisible size={18} />
            ) : (
              <AiOutlineEye size={18} />
            )}
          </IconButton>
        )}
      </InputContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

const StyledLabel = styled.label`
  cursor: pointer;
  text-align: left;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<IStyledInputProps>`
  width: 100%;
  padding: 12px ${({ withIcon }) => (withIcon ? "40px" : "16px")} 12px 16px;
  border-radius: 8px;
  border: 1px solid
    ${({ hasError }) =>
      hasError ? theme.colors.sub.error[20] : theme.colors.gray[200]};
  background-color: ${({ hasError }) =>
    hasError ? theme.colors.sub.error[10] : theme.colors.gray[100]};
  color: ${({ hasError }) =>
    hasError ? theme.colors.sub.error[20] : theme.colors.sub.normal[20]};
  font-size: 15px;
  font-weight: 400;
  outline: none;
  transition:
    border-color 0.2s,
    background-color 0.2s,
    color 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[500]};
  }

  &:focus {
    border-color: ${({ hasError }) =>
      hasError ? theme.colors.sub.error[20] : theme.colors.blue[500]};
    background-color: ${({ hasError }) =>
      hasError ? theme.colors.sub.error[10] : theme.colors.gray[100]};
  }
`;

const IconButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: ${theme.colors.gray[500]};
  }
`;
