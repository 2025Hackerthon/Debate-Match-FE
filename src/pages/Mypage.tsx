import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import type { DEBATETheme } from "../styles/theme";
import { useModal } from "../hooks/useModal";
import { AccountDeleteModal } from "../components/modal/AccountDeleteModal";
import { Record } from "../components/debate/Record";
import { Text, Dropdown } from "../components/common/index";
import type { GetMyAllResponse } from "../services/types";
import { debateService, userService } from "../services";
import { ResultStatus } from "../services/service";

type EducationLevelLabel =
  | "없음"
  | "초등학교 졸업"
  | "중학교 졸업"
  | "고등학교 졸업"
  | "대학교 졸업"
  | "대학원 졸업";

const educationLevelMap = {
  "없음": "NONE",
  "초등학교 졸업": "ELEMENTARY_SCHOOL",
  "중학교 졸업": "MIDDLE_SCHOOL",
  "고등학교 졸업": "HIGH_SCHOOL",
  "대학교 졸업": "UNIVERSITY",
  "대학원 졸업": "GRADUATE_SCHOOL"
} as const;

export const Mypage = () => {
  const [grade, setGrade] = useState<EducationLevelLabel>("없음");
  const [debateItems, setDebateItems] = useState<GetMyAllResponse>([]);
  const theme = useTheme() as DEBATETheme;
  const { isOpen, openModal, closeModal } = useModal();

  const options = Object.keys(educationLevelMap);

  const fetchDebateItems = useCallback(async () => {
    const res = await debateService.getMyAll();
    if (res.status === ResultStatus.OK) {
      setDebateItems(res.data!);
    } else {
      alert("오류가 발생했습니다");
    }
  }, []);

  const fetchUserInfo = useCallback(async () => {
    const res = await userService.info();
    if (res.status === ResultStatus.OK) {
      const grade = Object.entries(educationLevelMap).find(
        ([, value]) => value === res.data!.educationLevel
      )?.[0];
      setGrade(grade as EducationLevelLabel);
    } else {
      alert("오류가 발생했습니다");
    }
  }, []);

  useEffect(() => {
    fetchDebateItems();
    fetchUserInfo();
  }, [fetchDebateItems, fetchUserInfo]);

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
                  onChange={value => setGrade(value as EducationLevelLabel)}
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
                title={item.title}
                tags={item.tags}
                pro={item.pro}
                con={item.con}
                side={item.side}
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

const UserId = styled.div`
  font-size: 28px;
  font-weight: bold;
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
