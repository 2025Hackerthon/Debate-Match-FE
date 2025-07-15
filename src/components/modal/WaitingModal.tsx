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

export const WaitingModal = ({ isOpen, onClose }: IProps) => {
  const theme = useTheme() as DEBATETheme;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <TextWrapper>
          <Text variant="TitleSmall">AI가 교사의 역할을 대체할 수 있는가?</Text>
          <Text variant="LabelSmall" color={`${theme.colors.gray[500]}`}>
            현재 반대||찬성 입장으로 참여중입니다
          </Text>
        </TextWrapper>

        <ButtonWrapper>
          <Button onClick={onClose} variant="red" size="large">
            취소
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
  gap: 50px;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;

const ButtonWrapper = styled.div`
  width: 150px;
`;
