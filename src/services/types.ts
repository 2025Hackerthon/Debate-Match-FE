type EducationLevel =
  | "ELEMENTARY_SCHOOL"
  | "MIDDLE_SCHOOL"
  | "HIGH_SCHOOL"
  | "UNIVERSITY"
  | "GRADUATE_SCHOOL"
  | "NONE";

type Tag =
  | "국어"
  | "수학"
  | "영어"
  | "한국사"
  | "세계사"
  | "사회"
  | "과학"
  | "미술"
  | "체육"
  | "기술"
  | "음악"
  | "윤리"
  | "제2외국어"
  | "교양"
  | "IT";

type Side = "PRO" | "CON";

type DebateLevel = "INTRODUCTION" | "REBUTTAL" | "DEFENSE" | "CONCLUSION";

export type UserSignUpResponse = string;
export type UserLoginResponse = TokenResponse;
export type DebateUpdateResponse = string;
export type DebateJoinResponse = string;
export type DebateCreateResponse = string;
export type GetWaitResponse = DebateQueryResponse[];
export type GetDoneResponse = DebateDoneQueryResponse;
export type GetDoneAllResponse = DebateDoneQueryAllResponse[];
export type NextLevelEventData = [Argument, Argument];

export interface UserSignUpRequest {
  accountId: string;
  password: string;
  educationLevel: EducationLevel;
}

export interface UserLoginRequest {
  accountId: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
}

export interface ReactionRequest {
  reaction: Side;
  debateId: string;
}

export interface DebateUpdateRequest {
  level: DebateLevel;
  content: string;
  debateId: string;
  side: Side;
}

export interface DebateReadyRequest {
  debateId: string;
  side: Side;
}

export interface DebateJoinRequest {
  debateId: string;
  side: Side;
}

export interface DebateCreateRequest {
  tagList: Tag[];
  title: string;
  side: Side;
}

export interface DebateQueryResponse {
  debateId: string;
  title: string;
  side: "PRO" | "CON";
  tags: Tag[];
}

export interface Argument {
  level: DebateLevel;
  content: string;
  side: Side;
}

export interface DebateDoneQueryResponse {
  summary?: string;
  feedback?: string;
  data: Argument[];
}

export interface DebateDoneQueryAllResponse {
  title: string;
  debateId: string;
  tags: Tag[];
  con: number;
  pro: number;
}
