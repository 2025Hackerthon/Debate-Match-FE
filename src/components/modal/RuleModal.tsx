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

        <TextWrapper>
          <Text variant="LabelMedium" color={`${theme.colors.gray[600]}`}>
            토론은 입론(60초), 반론·변론·최종 변론(각 180초) 순으로 진행됩니다.
          </Text>

          <Text variant="LabelMedium" color={`${theme.colors.gray[600]}`}>
            총 글자 수 2000자를 토론 전 과정에서 공유하여 사용합니다.
          </Text>

          <Text variant="LabelMedium" color={`${theme.colors.gray[600]}`}>
            상호 존중과 논리적 근거 제시를 부탁드립니다.
          </Text>
        </TextWrapper>

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

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
