import styled from "@emotion/styled";
import { theme } from "../../styles/theme";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <FooterWrapper>
      <Content>
        <Left>
          <InfoText>
            대표자: 갓병건 | 개인정보보호책임자: asdf | 이메일: asdf@asdf.com |
            문의: 010-0000-0000
          </InfoText>
          <Copyright>© 2025 Debate Match All rights reserved.</Copyright>
        </Left>
        <Right>
          <GitHubLink
            href="https://github.com/2025Hackerthon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
          >
            <FaGithub size={20} />
          </GitHubLink>
        </Right>
      </Content>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: ${theme.colors.sub.normal[10]};
  border-top: 1px solid ${theme.colors.gray[100]};
  padding: 32px 17%;
  box-sizing: border-box;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: center;
    text-align: center;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoText = styled.p`
  font-size: 12px;
  color: ${theme.colors.gray[500]};
`;

const Copyright = styled.p`
  font-size: 12px;
  color: ${theme.colors.gray[500]};
`;

const Right = styled.div`
  margin-top: auto;
`;

const GitHubLink = styled.a`
  background-color: ${theme.colors.gray[100]};
  padding: 6px;
  border-radius: 50%;
  color: ${theme.colors.gray[900]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.gray[200]};
  }
`;
