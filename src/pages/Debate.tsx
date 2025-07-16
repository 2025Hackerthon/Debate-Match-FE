import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import type { DEBATETheme } from "../styles/theme";
import { Opinion } from "../components/debate/Opinion";
import { useState } from "react";
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

export const Debate = () => {
  const [input, setInput] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);
  const theme = useTheme() as DEBATETheme;

  return (
    <>
      <Container>
        <Banner>
          <Step>
            <Text variant="TitleTiny" color={theme.colors.blue[400]}>
              변론 단계
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

        <InputArea>
          <TextareaWrapper>
            <Textarea
              placeholder="찬성 입장에서의 변론을 작성해주세요"
              value={input}
              maxLength={2000}
              onChange={e => setInput(e.target.value)}
            />
            <CharCount>{input.length}/2000</CharCount>
          </TextareaWrapper>

          <BottomRow>
            <Text variant="LabelSmall" color={`${theme.colors.sub.error[20]}`}>
              작성 시간 180초
            </Text>

            <ButtonWrapper>
              {submit ? (
                <Button
                  size="large"
                  variant="red"
                  onClick={() => setSubmit(false)}
                >
                  제출취소
                </Button>
              ) : (
                <Button
                  size="large"
                  variant="blue"
                  onClick={() => setSubmit(true)}
                >
                  제출 (1/2)
                </Button>
              )}
            </ButtonWrapper>
          </BottomRow>
        </InputArea>
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
  height: 300px;
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #fff;
`;

const InputArea = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 120px;
  resize: none;
  padding: 24px 10px 12px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  background: #fff;
  resize: none;
  outline: none;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  width: 30%;
`;

const TextareaWrapper = styled.div`
  position: relative;
`;

const CharCount = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 13px;
  color: #666;
`;
