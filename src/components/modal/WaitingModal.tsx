/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import type { DEBATETheme } from "../../styles/theme";
import { Modal, Text, Button } from "../common/index";

interface IProps {
  title: string;
  side: "PRO" | "CON";
  isOpen: boolean;
  onClose: () => void;
}

export const WaitingModal = ({ title, side, isOpen, onClose }: IProps) => {
  const theme = useTheme() as DEBATETheme;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <TextWrapper>
          <Text variant="TitleSmall">{title}</Text>
          <Text variant="LabelSmall" color={`${theme.colors.gray[500]}`}>
            현재 {side === "PRO" ? "찬성" : "반대"} 입장으로 참여중입니다
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
