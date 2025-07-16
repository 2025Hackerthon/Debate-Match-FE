import styled from "@emotion/styled";
import { theme } from "../../styles/theme";
import { Button } from "../common/Button";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { CreateDebateModal } from "../modal/CreateDebateModal";

interface IProps {
  isLoggedIn: boolean;
  username?: string;
}

export const Header = ({ isLoggedIn, username }: IProps) => {
  const { isOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const onMain = () => {
    navigate(isLoggedIn ? "/home" : "/");
  };
  const onLogin = () => {
    navigate("/login");
  };
  const onSignup = () => {
    navigate("/signup");
  };
  const onViewRecords = () => {
    navigate("/records");
  };
  const onMyPage = () => {
    navigate("/mypage");
  };

  return (
    <>
      <CreateDebateModal isOpen={isOpen} onClose={closeModal} />
      <Container>
        <Left>
          <LogoWrapper onClick={onMain}>
            <img
              src={Logo}
              alt="로고"
              height={36}
              style={{ cursor: "pointer" }}
            />
          </LogoWrapper>
          {isLoggedIn && (
            <>
              <NavText onClick={openModal}>토론생성</NavText>
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
    </>
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
