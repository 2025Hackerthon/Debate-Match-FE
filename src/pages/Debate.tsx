import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import type { DEBATETheme } from "../styles/theme";
import { Opinion } from "../components/debate/Opinion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Text, Button } from "../components/common/index";
import { useDebate } from "../hooks/useDebate";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { DebateLevel, Side } from "../services/types";
import { RuleModal, WaitingModal } from "../components/modal";
import { useModal } from "../hooks/useModal";
import { debateService } from "../services";
import { ResultStatus } from "../services/service";

const debateLevelMap: Record<DebateLevel | "WAIT", string> = {
  WAIT: "대기",
  INTRODUCTION: "입론",
  REBUTTAL: "반론",
  DEFENSE: "변론",
  CONCLUSION: "최종 변론"
};

export const Debate = () => {
  const [input, setInput] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(180);
  const timerRef = useRef<number | null>(null);
  const { id: debateId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  if (!navigate || !location.state || !debateId) navigate(-1);

  const title = location.state?.title;
  const userSide: Side = location.state?.side;

  const { level, args, error, submitArgument } = useDebate({
    debateId: debateId!,
    userSide,
    isOwner: location.state.isOwner
  });

  useEffect(() => {
    setInput("");
    setTimer(180);
    setIsSubmitted(false);
  }, [level]);

  const handleSubmit = useCallback(async () => {
    if (isSubmitted) return;
    await submitArgument(input);
    setIsSubmitted(true);
  }, [input, isSubmitted, submitArgument]);

  const handleOutDebate = () => {
    closeWattingModal();
    navigate(-1);
  };

  const handleAcceptRule = () => {
    debateService.ready({ debateId: debateId!, side: userSide });
    closeRuleModal();
  };

  const handleCancel = async () => {
    const res = await debateService.cancel({
      debateId: debateId!,
      level: level as DebateLevel,
      side: userSide
    });
    if (res.status === ResultStatus.OK) {
      setIsSubmitted(false);
    } else {
      alert("오류가 발생했습니다");
    }
  };

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (level === "WAIT") return;
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [level, handleSubmit]);

  const {
    isOpen: isWattingModalOpen,
    openModal: openWattingModal,
    closeModal: closeWattingModal
  } = useModal();

  const {
    isOpen: isRuleModalOpen,
    openModal: openRuleModal,
    closeModal: closeRuleModal
  } = useModal();

  const theme = useTheme() as DEBATETheme;

  if (error) return <div>Error: {error}</div>;

  if (!isWattingModalOpen && level === "WAIT") openWattingModal();
  if (isWattingModalOpen && level === "INTRODUCTION") closeWattingModal();
  if (!isRuleModalOpen && level === "READY") openRuleModal();
  if (isRuleModalOpen && level === "INTRODUCTION") closeRuleModal();

  const totalUsedLength = args.reduce(
    (acc, arg) => acc + arg.content.length,
    0
  );

  return (
    <>
      <WaitingModal
        title={title}
        side={userSide}
        isOpen={isWattingModalOpen}
        onClose={handleOutDebate}
      />
      <RuleModal isOpen={isRuleModalOpen} onClose={handleAcceptRule} />
      <Container>
        <Banner>
          <Step>
            <Text variant="TitleTiny" color={theme.colors.blue[400]}>
              {debateLevelMap[level as DebateLevel]}
            </Text>
          </Step>
          <Text variant="TitleSmall">{title}</Text>
        </Banner>

        <ContentArea>
          <OpinionWrapper>
            {args.map((arg, i) => (
              <Opinion
                key={i}
                index={i}
                title={`${arg.side === "PRO" ? "찬성" : "반대"}측 ${debateLevelMap[arg.level]}`}
                content={arg.content}
              />
            ))}
          </OpinionWrapper>
        </ContentArea>

        <InputArea>
          <TextareaWrapper>
            <Textarea
              placeholder={`${userSide === "PRO" ? "찬성" : "반대"} 입장에서의 ${debateLevelMap[level as DebateLevel]}을 작성해주세요`}
              value={input}
              maxLength={2000 - totalUsedLength}
              onChange={e => setInput(e.target.value)}
              disabled={isSubmitted}
            />
            <CharCount>{totalUsedLength + input.length}/2000</CharCount>
          </TextareaWrapper>

          <BottomRow>
            <Text variant="LabelSmall" color={`${theme.colors.sub.error[20]}`}>
              작성 시간 {timer}초
            </Text>

            <ButtonWrapper>
              {isSubmitted ? (
                <Button size="large" variant="red" onClick={handleCancel}>
                  제출취소
                </Button>
              ) : (
                <Button size="large" variant="blue" onClick={handleSubmit}>
                  제출
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
