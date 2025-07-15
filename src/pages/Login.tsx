import styled from "@emotion/styled";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { Text } from "../components/common/Text";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import type { DEBATETheme } from "../styles/theme";

export const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const theme = useTheme() as DEBATETheme;

  const handleLogin = () => {
    // 로그인 처리 로직
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <Wrapper>
      <Container>
        <TextWrapper>
          <Text variant="TitleMedium">로그인</Text>
          <Text variant="LabelLarge" color={theme.colors.gray[500]}>
            로그인하여 서비스를 이용해보세요
          </Text>
        </TextWrapper>

        <Form>
          <div>
            <Input
              label="아이디"
              placeholder="아이디를 입력해주세요"
              value={id}
              onChange={e => setId(e.target.value)}
            />
            <Input
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <ButtonWrapper>
            <Button variant="blue" size="large" onClick={handleLogin}>
              로그인
            </Button>
            <BottomText>
              <span>아직 회원이 아니신가요?</span>
              <SignUpButton onClick={handleSignup}>회원가입</SignUpButton>
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

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
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

  h1 {
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 32px;
  }
`;

const Form = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 70px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const BottomText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const SignUpButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.blue[500]};
  margin-left: 6px;
  cursor: pointer;
  font-weight: 500;
`;
