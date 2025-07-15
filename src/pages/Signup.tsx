import styled from "@emotion/styled";
import { useState } from "react";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { Dropdown } from "../components/common/Dropdown";
import { Text } from "../components/common/Text";
import { useNavigate } from "react-router-dom";
import type { DEBATETheme } from "../styles/theme";
import { useTheme } from "@emotion/react";

export const Signup = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("");

  const theme = useTheme() as DEBATETheme;

  const options = [
    "없음",
    "초등학교 졸업",
    "중학교 졸업",
    "고등학교 졸업",
    "대학교 졸업",
    "대학원 졸업"
  ];

  const handleCheckDuplicate = () => {
    // 중복 체크 로직
  };

  const handleSignup = () => {
    // 회원가입 처리 로직
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
                <Button size="large" onClick={handleCheckDuplicate}>
                  중복체크
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
                onChange={setGrade}
                placeholder="학력을 선택해주세요"
              />
            </DropdownWrapper>
          </div>

          <ButtonWrapper>
            <Button variant="blue" size="large" onClick={handleSignup}>
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
