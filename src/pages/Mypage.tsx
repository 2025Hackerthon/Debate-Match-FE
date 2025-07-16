import { useState } from "react";
import styled from "@emotion/styled";
import { FiEdit2 } from "react-icons/fi";
import { Text } from "../components/common/Text";
import { useTheme } from "@emotion/react";
import type { DEBATETheme } from "../styles/theme";
import { Dropdown } from "../components/common/Dropdown";
import { useModal } from "../hooks/useModal";
import { AccountDeleteModal } from "../components/modal/AccountDeleteModal";
import { Record } from "../components/debate/Record";

interface DummyType {
  question: string;
  tags: string[];
  agree: number;
  disagree: number;
  stance: "찬성" | "반대";
}

const debateItems: DummyType[] = [
  {
    question: "고전문학은 현재 교육 과정에 꼭 필요한가?",
    tags: ["국어"],
    agree: 72,
    disagree: 19,
    stance: "찬성"
  },
  {
    question: "한국사 필수화는 과도한가?",
    tags: ["한국사"],
    agree: 22,
    disagree: 83,
    stance: "찬성"
  },
  {
    question: "세계사 교육에서 식민 지배 서술을 확대해야 하는가?",
    tags: ["세계사"],
    agree: 81,
    disagree: 15,
    stance: "찬성"
  },
  {
    question: "기후위기 대응을 위한 탄소세 도입은 정당한가?",
    tags: ["과학", "사회"],
    agree: 66,
    disagree: 28,
    stance: "반대"
  }
];

export const Mypage = () => {
  const [grade, setGrade] = useState("중학교 졸업");
  const theme = useTheme() as DEBATETheme;
  const { isOpen, openModal, closeModal } = useModal();

  const options = [
    "없음",
    "초등학교 졸업",
    "중학교 졸업",
    "고등학교 졸업",
    "대학교 졸업",
    "대학원 졸업"
  ];

  return (
    <>
      <AccountDeleteModal isOpen={isOpen} onClose={closeModal} />
      <Container>
        <ProfileWrapper>
          <LeftSection>
            <InfoRow>
              <Text variant="LabelMedium" color={`${theme.colors.gray[400]}`}>
                아이디
              </Text>
              <UserId>sjy08</UserId>
            </InfoRow>
            <InfoRow>
              <DropdownWrapper>
                <Text variant="LabelMedium" color={theme.colors.gray[400]}>
                  학력
                </Text>
                <Dropdown
                  options={options}
                  value={grade}
                  onChange={setGrade}
                  placeholder="학력을 선택해주세요"
                />
              </DropdownWrapper>
            </InfoRow>
          </LeftSection>

          <RightSection>
            <Button>로그아웃</Button>
            <DeleteButton onClick={openModal}>계정삭제</DeleteButton>
          </RightSection>
        </ProfileWrapper>

        <DebateList>
          <TextWrapper>
            <Text variant="LabelMedium">기록 열람</Text>
            <Text variant="LabelMedium">{debateItems.length}개</Text>
          </TextWrapper>

          <div>
            {debateItems.map((item, idx) => (
              <Record
                key={idx}
                type="mine"
                title={item.question}
                tags={item.tags}
                agree={item.agree}
                disagree={item.disagree}
                stance={item.stance}
              />
            ))}
          </div>
        </DebateList>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 40px 17%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const LeftSection = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 24px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.div`
  font-size: 16px;
  color: #555;
`;

const UserId = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

const EditableField = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const EditIcon = styled(FiEdit2)`
  font-size: 16px;
  color: #555;
  cursor: pointer;
`;

const RightSection = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
`;

const Button = styled.button`
  padding: 10px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
`;

const DeleteButton = styled(Button)`
  background: #fdecea;
  color: #d32f2f;
`;

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
  text-align: left;
`;

const DebateList = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextWrapper = styled.div`
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
`;
