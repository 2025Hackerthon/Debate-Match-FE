import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DEBATETheme } from "../styles/theme";
import { useTheme } from "@emotion/react";
import { Input, Button, Dropdown, Text } from "../components/common/index";
import { userService } from "../services";
import { ResultStatus } from "../services/service";

type EducationLevelLabel =
  | "없음"
  | "초등학교 졸업"
  | "중학교 졸업"
  | "고등학교 졸업"
  | "대학교 졸업"
  | "대학원 졸업";

export const Signup = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [isIdVerified, setIsIdVerified] = useState(false);

  const theme = useTheme() as DEBATETheme;

  const [grade, setGrade] = useState<EducationLevelLabel>("없음");

  const educationLevelMap = {
    "없음": "NONE",
    "초등학교 졸업": "ELEMENTARY_SCHOOL",
    "중학교 졸업": "MIDDLE_SCHOOL",
    "고등학교 졸업": "HIGH_SCHOOL",
    "대학교 졸업": "UNIVERSITY",
    "대학원 졸업": "GRADUATE_SCHOOL"
  } as const;

  const options = Object.keys(educationLevelMap);

  const handleCheckDuplicate = async () => {
    setIsBusy(true);
    const res = await userService.checkId(id);
    if (res.status === ResultStatus.CONFLICT) {
      setIsIdVerified(false);
      alert("이미 존재하는 아이디입니다");
    } else if (res.status === ResultStatus.OK) {
      setIsIdVerified(true);
    }
    setIsBusy(false);
  };

  const handleSignup = async () => {
    setIsBusy(true);
    const res = await userService.signUp({
      accountId: id,
      password,
      educationLevel: educationLevelMap[grade]
    });
    if (res.status === ResultStatus.NOTFOUND) {
      alert("없는 유저입니다");
    } else if (res.status === ResultStatus.UNAUTHORIZED) {
      alert("비밀번호가 틀렸습니다");
    } else if (res.status === ResultStatus.CONFLICT) {
      alert("이미 존재하는 아이디입니다");
    } else if (res.status === ResultStatus.OK) {
      navigate("/login");
    }
    setIsBusy(false);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Wrapper>
      <Container>
        <TextWrapper>
          <Text variant="TitleMedium">회원가입</Text>
          <Text variant="LabelLarge" color={theme.colors.gray[500]}>
            회원가입하여 서비스를 이용해보세요
          </Text>
        </TextWrapper>

        <Form>
          <div>
            <IdWrapper>
              <div style={{ width: "260px" }}>
                <Input
                  label="아이디"
                  placeholder="아이디를 입력해주세요"
                  value={id}
                  onChange={e => {
                    setIsIdVerified(false);
                    setId(e.target.value);
                  }}
                />
              </div>
              <div
                style={{
                  flex: 1,
                  width: "15px",
                  marginTop: "auto",
                  marginBottom: "16px"
                }}
              >
                <Button
                  disabled={!id || isBusy || isIdVerified}
                  size="large"
                  onClick={handleCheckDuplicate}
                >
                  {isIdVerified ? "사용 가능" : "중복확인"}
                </Button>
              </div>
            </IdWrapper>

            <Input
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <DropdownWrapper>
              <Text variant="LabelMedium" color={theme.colors.sub.normal[20]}>
                학력
              </Text>
              <Dropdown
                options={options}
                value={grade}
                onChange={value => setGrade(value as EducationLevelLabel)}
                placeholder="학력을 선택해주세요"
              />
            </DropdownWrapper>
          </div>

          <ButtonWrapper>
            <Button
              disabled={!id || !password || isBusy || !isIdVerified}
              variant="blue"
              size="large"
              onClick={handleSignup}
            >
              회원가입
            </Button>
            <BottomText>
              <span>이미 회원이신가요?</span>
              <LoginButton onClick={handleLogin}>로그인</LoginButton>
            </BottomText>
          </ButtonWrapper>
        </Form>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: calc(100dvh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 0 16px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 70px;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const IdWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
`;

const Form = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
  text-align: left;
`;

const BottomText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const LoginButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.blue[500]};
  margin-left: 6px;
  cursor: pointer;
  font-weight: 500;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;
