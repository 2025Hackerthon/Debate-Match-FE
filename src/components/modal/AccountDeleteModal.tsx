/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import type { DEBATETheme } from "../../styles/theme";
import { Text, Button, Modal } from "../common/index";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountDeleteModal = ({ isOpen, onClose }: IProps) => {
  const theme = useTheme() as DEBATETheme;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <TextWrapper>
          <Text variant="TitleSmall">정말 삭제하시겠습니까?</Text>
          <Text variant="LabelSmall" color={`${theme.colors.gray[500]}`}>
            계정 삭제 시 모든 데이터가 삭제됩니다
          </Text>
        </TextWrapper>

        <ButtonWrapper>
          <Button onClick={onClose} variant="red" size="large">
            삭제
          </Button>
          <Button onClick={onClose} variant="gray" size="large">
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
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
