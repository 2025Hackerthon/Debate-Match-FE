import { useState, type Dispatch } from "react";
import type { Argument, NextLevelEventData } from "../services/types";

type DebateLevel =
  | "WAIT"
  | "INTRODUCTION"
  | "REBUTTAL"
  | "DEFENSE"
  | "CONCLUSION";

interface DebateState {
  level: DebateLevel;
  handleNext: (set: Dispatch<React.SetStateAction<DebateState>>) => void;
}

const wait: DebateState = {
  level: "WAIT",
  handleNext: set => set(introduction)
};

const introduction: DebateState = {
  level: "INTRODUCTION",
  handleNext: set => set(rebuttal)
};

const rebuttal: DebateState = {
  level: "REBUTTAL",
  handleNext: set => set(defence)
};

const defence: DebateState = {
  level: "DEFENSE",
  handleNext: set => set(conclution)
};

const conclution: DebateState = {
  level: "CONCLUSION",
  handleNext: () => {}
};

export const useDebateConnection = (debateConnection: EventSource) => {
  const [started, setStarted] = useState<boolean>(false);
  const [state, setState] = useState<DebateState>(wait);
  const [argumentList, setArgumentList] = useState<Argument[]>([]);

  debateConnection.onmessage = event => {
    if ((event.type as "ready" | "next level") === "ready") {
      setStarted(true);
      state.handleNext(setState);
    } else {
      setArgumentList([...argumentList, ...(event.data as NextLevelEventData)]);
      state.handleNext(setState);
    }
  };

  return {
    started,
    currentState: state,
    argumentList
  };
};
