import styled from "@emotion/styled";
import { Button } from "../components/common/Button";
import { theme } from "../styles/theme";
import { FaUserFriends, FaComments, FaTrophy, FaBook } from "react-icons/fa";
import { Text } from "../components/common/Text";

export const Landing = () => {
  const onLogin = () => {
    // 로그인 이동
  };

  return (
    <Wrapper>
      <HeroSection>
        <Col>
          <Text variant="TitleMedium">
            학생들을 위한{" "}
            <strong style={{ color: `${theme.colors.blue[800]}` }}>
              토론 매칭
            </strong>{" "}
            플랫폼
          </Text>
          <Text variant="LabelLarge" color={`${theme.colors.gray[500]}`}>
            다양한 주제로 1:1 토론을 경험하고, AI 피드백으로 토론 실력을
            향상시켜보세요
          </Text>
        </Col>
        <Button variant="blue" size="large" onClick={onLogin}>
          지금 시작하기
        </Button>
      </HeroSection>

      <FeatureSection>
        <FeatureCard>
          <FaUserFriends size={90} color={theme.colors.blue[500]} />
          <CardText>1대 1 매칭</CardText>
        </FeatureCard>
        <FeatureCard>
          <FaComments size={90} color={theme.colors.blue?.[500]} />
          <CardText>구조화된 토론</CardText>
        </FeatureCard>
        <FeatureCard>
          <FaTrophy size={90} color={theme.colors.blue[500]} />
          <CardText>AI 피드백</CardText>
        </FeatureCard>
        <FeatureCard>
          <FaBook size={90} color={theme.colors.blue?.[500]} />
          <CardText>기록 관리</CardText>
        </FeatureCard>
      </FeatureSection>

      <BannerCTA>
        <Col>
          <Text color="white" variant="TitleSmall">
            토론 실력을 키워보세요
          </Text>
          <Text color="white" variant="LabelLarge">
            지금 가입하고 첫 토론을 시작해보세요
          </Text>
        </Col>
        <Button variant="white" size="large" onClick={onLogin}>
          시작하기
        </Button>
      </BannerCTA>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.blue[100]};
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 50px;
  text-align: center;
  padding: 120px 16px 60px;

  button {
    align-self: center;
    width: 100%;
    max-width: 500px;
  }
`;

const FeatureSection = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 60px 10%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;
`;

const CardText = styled.p`
  margin-top: 12px;
  font-size: 24px;
  font-weight: 600;
  color: ${theme.colors.sub.normal[20]};
`;

const BannerCTA = styled.section`
  background-color: ${theme.colors.blue[600]};
  color: white;
  text-align: center;
  padding: 60px 16px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  button {
    align-self: center;
    width: 100%;
    max-width: 500px;
    font-weight: 600;
  }
`;
