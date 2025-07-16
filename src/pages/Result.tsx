import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import type { DEBATETheme } from "../styles/theme";
import { Opinion } from "../components/debate/Opinion";
import { AiFeedback } from "../components/debate/AiFeedback";
import { useNavigate } from "react-router-dom";
import { Text, Button } from "../components/common/index";

const dummyArguments = [
  {
    title: "찬성측 입론",
    content:
      "AI는 방대한 데이터를 빠르게 분석하고 학습자의 수준에 맞는 맞춤형 교육을 제공할 수 있습니다. 이는 교사 1명이 모든 학생을 개별적으로 지도하기 어려운 상황에서 매우 유용한 대안이 될 수 있습니다."
  },
  {
    title: "반대측 입론",
    content:
      "AI는 감정과 공감을 기반으로 한 소통 능력이 부족하기 때문에 학생들의 정서적 성장과 인간적인 상호작용이 중요한 교육현장에서 교사를 완전히 대체할 수 없습니다."
  },
  {
    title: "찬성측 변론",
    content:
      "AI는 학습 데이터 분석을 통해 각 학생의 취약점을 실시간으로 파악하고, 필요한 부분을 보완할 수 있어 교육 효율을 높입니다."
  },
  {
    title: "반대측 변론",
    content:
      "AI는 윤리적 문제와 오작동의 가능성이 있으며, 기술 의존도가 높아질수록 교육의 본질이 훼손될 우려가 있습니다."
  },
  {
    title: "찬성측 입론",
    content:
      "농촌이나 낙후 지역에서 교사 수급이 어려운 상황에서 AI는 교육격차 해소에 기여할 수 있습니다."
  },
  {
    title: "반대측 입론",
    content:
      "교사는 단순히 지식을 전달하는 존재가 아니라, 학생과의 관계 속에서 인성과 태도를 길러주는 역할도 수행합니다. AI는 이 역할을 대신할 수 없습니다."
  }
];

const feedback = {
  short:
    "아니 무너가 짱이라는 입장과 그냥 무너보단 오징어 데쳐서 초장 찍어먹는게 짱인 파",
  //   feedback: "개인적으로 무너가 짱이라고 생각함 ㄱㅇㅇ"
  feedback: undefined
};

export const Result = () => {
  const theme = useTheme() as DEBATETheme;
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Banner>
          <Step>
            <Text variant="TitleTiny" color={theme.colors.blue[400]}>
              결과
            </Text>
          </Step>
          <Text variant="TitleSmall">AI가 교사의 역할을 대체할 수 있는가?</Text>
        </Banner>

        <ContentArea>
          <OpinionWrapper>
            {dummyArguments.map((v, i) => {
              return (
                <>
                  <Opinion title={v.title} content={v.content} index={i} />
                </>
              );
            })}
          </OpinionWrapper>
        </ContentArea>

        <FeedbackWrapper>
          <AiFeedback short={feedback.short} feedback={feedback.feedback} />
        </FeedbackWrapper>

        <BottomRow>
          <Text variant="LabelSmall" color={`${theme.colors.sub.normal[20]}`}>
            사용된 글자 수: 400자 (찬성 측), 510자 (반대 측)
          </Text>

          <ButtonWrapper>
            {feedback.feedback ? (
              <Button
                size="large"
                variant="blue"
                onClick={() => navigate("/home")}
              >
                나가기
              </Button>
            ) : (
              <ButtonContainer>
                <Button size="large" variant="blue">
                  찬성
                </Button>
                <Button size="large" variant="red">
                  반대
                </Button>
              </ButtonContainer>
            )}
          </ButtonWrapper>
        </BottomRow>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: calc(100dvh - 60px);
  padding: 0 17%;
`;

const Banner = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.sub.normal[10]};
`;

const Step = styled.div`
  width: 100%;
`;

const OpinionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContentArea = styled.div`
  height: 500px;
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #fff;
`;

const BottomRow = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  width: 30%;
`;

const FeedbackWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
`;
