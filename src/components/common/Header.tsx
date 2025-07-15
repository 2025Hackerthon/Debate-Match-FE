import styled from "@emotion/styled";
import { theme } from "../../styles/theme";
import { Button } from "../common/Button";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";

interface IProps {
  isLoggedIn: boolean;
  username?: string;
}

export const Header = ({ isLoggedIn, username }: IProps) => {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/login");
  };
  const onSignup = () => {
    // 회원가입 페이지로 이동
  };
  const onViewRecords = () => {
    // 기록열람 페이지로 이동
  };
  const onCreateDebate = () => {
    // 모달창
  };
  const onMyPage = () => {
    // 마이페이지로 이동
  };

  return (
    <Container>
      <Left>
        <LogoWrapper>
          <img
            src={Logo}
            alt="로고"
            height={36}
            style={{ cursor: "pointer" }}
          />
        </LogoWrapper>
        {isLoggedIn && (
          <>
            <NavText onClick={onCreateDebate}>토론생성</NavText>
            <NavText onClick={onViewRecords}>기록열람</NavText>
          </>
        )}
      </Left>

      <Right>
        {isLoggedIn ? (
          <>
            <Button onClick={onMyPage}>{username}</Button>
          </>
        ) : (
          <>
            <NavText onClick={onSignup}>회원가입</NavText>
            <Button variant="blue" onClick={onLogin}>
              로그인
            </Button>
          </>
        )}
      </Right>
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  background-color: ${theme.colors.sub.normal[10]};
  border-bottom: 1px solid ${theme.colors.gray[100]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 17%;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const NavText = styled.button`
  font-size: 14px;
  font-weight: 400;
  color: ${theme.colors.sub.normal[20]};
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  white-space: nowrap;
`;
