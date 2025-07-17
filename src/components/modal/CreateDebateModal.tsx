/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";
import { TagSelector } from "../debate/TagSelector";
import { useTheme } from "@emotion/react";
import type { DEBATETheme } from "../../styles/theme";
import { Modal, Input, Text, Button } from "../common/index";
import { debateService } from "../../services";
import { tagMap, type Tag } from "../../services/types";
import { ResultStatus } from "../../services/service";
import { useNavigate } from "react-router-dom";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateDebateModal = ({ isOpen, onClose }: IProps) => {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [position, setPosition] = useState<"찬성" | "반대">("찬성");
  const theme = useTheme() as DEBATETheme;
  const navigate = useNavigate();

  const onCreate = async () => {
    const side = position === "찬성" ? "PRO" : "CON";
    const res = await debateService.create({
      side,
      title,
      tagList: selectedTags.map(tag => tagMap[tag]!)
    });
    if (res.status === ResultStatus.OK) {
      onClose();
      navigate(`/debate/${res.data}`, {
        state: { id: res.data, title, side, isOwner: true }
      });
    } else {
      alert("오류가 발생했습니다");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <TitleWrapper>
          <Text variant="TitleSmall">토론생성</Text>
          <Text variant="LabelSmall" color={`${theme.colors.gray[500]}`}>
            원하는 주제로 자유롭게 토론을 시작해봐요!
          </Text>
        </TitleWrapper>

        <InputWrapper></InputWrapper>
        <Input
          label="토론 주제"
          placeholder="토론의 자세한 주제를 입력해주세요"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <TagSelector
          type="select"
          selectedTags={selectedTags}
          onChange={values =>
            setSelectedTags(values.map(value => value as Tag))
          }
        />

        <PositionToggle>
          <PositionButton
            selected={position === "찬성"}
            onClick={() => setPosition("찬성")}
          >
            찬성
          </PositionButton>
          <PositionButton
            selected={position === "반대"}
            onClick={() => setPosition("반대")}
          >
            반대
          </PositionButton>
        </PositionToggle>

        <ButtonRow>
          <Button variant="blue" onClick={onCreate}>
            생성
          </Button>
          <Button variant="gray" size="large" onClick={onClose}>
            취소
          </Button>
        </ButtonRow>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  gap: 16px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PositionToggle = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.gray[100]};
  border-radius: 12px;
  padding: 2px;
  border: 1px solid #e2e4e7;
`;

const PositionButton = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 8px 0;
  background: ${({ selected }) => (selected ? "#ffffff" : "transparent")};
  color: ${({ theme, selected }) =>
    selected ? `${theme.colors.blue[500]}` : `${theme.colors.gray[500]}`};
  font-weight: 600;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  box-shadow: ${({ selected }) =>
    selected ? "0 1px 3px rgba(0, 0, 0, 0.08)" : "none"};
  transition: all 0.2s ease;
  cursor: pointer;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
`;
