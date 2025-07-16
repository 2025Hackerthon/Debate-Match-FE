/** @jsxImportSource @emotion/react */
import { Modal } from "../common/Modal";
import styled from "@emotion/styled";
import { Text } from "../common/Text";
import { useTheme } from "@emotion/react";
import type { DEBATETheme } from "../../styles/theme";
import { Button } from "../common/Button";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RuleModal = ({ isOpen, onClose }: IProps) => {
  const theme = useTheme() as DEBATETheme;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <LeftTime>
        <Text variant="LabelSmall" color={`${theme.colors.sub.error[20]}`}>
          60초
        </Text>
      </LeftTime>

      <Wrapper>
        <Text variant="TitleSmall">토론 규칙</Text>

        <Text variant="LabelMedium" color={`${theme.colors.sub.normal[20]}`}>
          토론에 사용할 수 있는 글자 수는 총 2000자로,
          <br /> 토론 전 과정에서 공유되어 소모됩니다
        </Text>

        <ButtonWrapper>
          <Button onClick={onClose} variant="blue" size="large">
            준비 완료 (1/2)
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  width: 150px;
`;

const LeftTime = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
`;
