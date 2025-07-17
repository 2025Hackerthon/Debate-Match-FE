import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import type { DEBATETheme } from "../styles/theme";
import { Opinion } from "../components/debate/Opinion";
import { AiFeedback } from "../components/debate/AiFeedback";
import { useNavigate, useParams } from "react-router-dom";
import { Text, Button } from "../components/common/index";
import { useCallback, useEffect, useState } from "react";
import { debateService, reactionService } from "../services";
import { ResultStatus } from "../services/service";
import type { DebateDoneQueryResponse } from "../services/types";

export const Result = () => {
  const [result, setResult] = useState<DebateDoneQueryResponse | undefined>(
    undefined
  );
  const theme = useTheme() as DEBATETheme;
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) navigate(-1);

  const fetchResult = useCallback(async () => {
    const res = await debateService.getDone(id!);
    if (res.status === ResultStatus.OK) {
      setResult(res.data!);
    } else {
      alert("오류가 발생했습니다");
    }
  }, [id]);

  useEffect(() => {
    fetchResult();
  }, [fetchResult]);

  return (
    <>
      <Container>
        <Banner>
          <Step>
            <Text variant="TitleTiny" color={theme.colors.blue[400]}>
              결과
            </Text>
          </Step>
          <Text variant="TitleSmall">{result?.title}</Text>
        </Banner>

        <ContentArea>
          <OpinionWrapper>
            {result?.data.map((v, i) => {
              return (
                <>
                  <Opinion title={v.level} content={v.content} index={i} />
                </>
              );
            })}
          </OpinionWrapper>
        </ContentArea>

        <FeedbackWrapper>
          <AiFeedback
            short={result?.summary ?? ""}
            feedback={result?.feedback}
          />
        </FeedbackWrapper>

        <BottomRow>
          <Text variant="LabelSmall" color={`${theme.colors.sub.normal[20]}`}>
            사용된 글자 수:{" "}
            {result?.data
              .filter(arg => arg.side === "PRO")
              .reduce((acc, arg) => acc + arg.content.length, 0)}
            자 (찬성 측),&nbsp;
            {result?.data
              .filter(arg => arg.side === "CON")
              .reduce((acc, arg) => acc + arg.content.length, 0)}
            자 (반대 측)
          </Text>

          <ButtonWrapper>
            {result?.feedback ? (
              <Button
                size="large"
                variant="blue"
                onClick={() => navigate("/home")}
              >
                나가기
              </Button>
            ) : (
              <ButtonContainer>
                <Button
                  size="large"
                  variant="blue"
                  onClick={async () => {
                    await reactionService.reaction({
                      debateId: id!,
                      reaction: "PRO"
                    });
                    location.reload();
                  }}
                >
                  찬성
                </Button>
                <Button
                  size="large"
                  variant="red"
                  onClick={() =>
                    reactionService.reaction({ debateId: id!, reaction: "CON" })
                  }
                >
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
