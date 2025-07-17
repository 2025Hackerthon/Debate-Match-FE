import { useState, useEffect, useCallback, useRef } from "react";
import { debateService, sseService } from "../services";
import type { Argument, DebateLevel, Side } from "../services/types";
import { useNavigate } from "react-router-dom";

interface UseDebateProps {
  debateId: string;
  userSide: Side;
  isOwner: boolean;
}

const levels: DebateLevel[] = [
  "INTRODUCTION",
  "REBUTTAL",
  "DEFENSE",
  "CONCLUSION"
];

export const useDebate = ({ debateId, userSide, isOwner }: UseDebateProps) => {
  const [level, setLevel] = useState<DebateLevel | "WAIT" | "READY">("WAIT");
  const [args, setArgs] = useState<Argument[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const connectToSse = async () => {
      try {
        const eventSource = await sseService.connect(debateId, userSide);

        if (!(eventSource instanceof EventSource)) {
          throw new Error("Failed to connect to SSE");
        }

        eventSource.onopen = () => {
          setIsConnected(true);
        };

        eventSource.addEventListener("next level", event => {
          const newArgs = JSON.parse(event.data) as [Argument, Argument];
          setArgs(prev => [...prev, ...newArgs]);

          const currentLevelIndex = levels.indexOf(newArgs[0].level);
          if (currentLevelIndex === levels.length - 1) {
            if (timerRef.current !== null) return;
            timerRef.current = setTimeout(() => {
              eventSource.close();
              navigate(`/result/${debateId}`);
            }, 10 * 1000);
          } else {
            setLevel(levels[currentLevelIndex + 1]);
          }
        });

        eventSource.onmessage = event => {
          if (event.data === "match") {
            setLevel("READY");
          } else if (event.data === "ready") {
            setLevel("INTRODUCTION");
          }
        };

        eventSource.onerror = () => {
          setError("SSE connection error");
          eventSource.close();
        };

        if (!isOwner) await debateService.join({ debateId, side: userSide });

        return () => {
          eventSource.close();
          setIsConnected(false);
          debateService.cancelJoin({ debateId, side: userSide });
        };
      } catch (err) {
        setError((err as Error).message);
      }
    };

    if (debateId && userSide) {
      connectToSse();
    }
  }, [debateId, userSide, isOwner, navigate]);

  const submitArgument = useCallback(
    async (content: string) => {
      if (!debateId || level === "WAIT" || level === "READY") return;

      try {
        await debateService.update({
          debateId,
          side: userSide,
          level,
          content
        });
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [debateId, userSide, level]
  );

  return { level, args, isConnected, error, submitArgument };
};
