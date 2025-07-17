export type EducationLevel =
  | "ELEMENTARY_SCHOOL"
  | "MIDDLE_SCHOOL"
  | "HIGH_SCHOOL"
  | "UNIVERSITY"
  | "GRADUATE_SCHOOL"
  | "NONE";

export type Tag =
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

export type TagEnum =
  | "KOREAN"
  | "MATH"
  | "ENGLISH"
  | "KOREAN_HISTORY"
  | "WORLD_HISTORY"
  | "SOCIAL_STUDIES"
  | "SCIENCE"
  | "ART"
  | "PHYSICAL_EDUCATION"
  | "TECHNOLOGY"
  | "MUSIC"
  | "ETHICS"
  | "SECOND_LANGUAGE"
  | "LIBERAL_ARTS"
  | "IT";

export const tagMap: { [key in Tag]: TagEnum } = {
  국어: "KOREAN",
  수학: "MATH",
  영어: "ENGLISH",
  한국사: "KOREAN_HISTORY",
  세계사: "WORLD_HISTORY",
  사회: "SOCIAL_STUDIES",
  과학: "SCIENCE",
  미술: "ART",
  체육: "PHYSICAL_EDUCATION",
  기술: "TECHNOLOGY",
  음악: "MUSIC",
  윤리: "ETHICS",
  제2외국어: "SECOND_LANGUAGE",
  교양: "LIBERAL_ARTS",
  IT: "IT"
} as const;

export type Side = "PRO" | "CON";

export type DebateLevel =
  | "INTRODUCTION"
  | "REBUTTAL"
  | "DEFENSE"
  | "CONCLUSION";

export type UserSignUpResponse = string;
export type UserLoginResponse = TokenResponse;
export type DebateUpdateResponse = string;
export type DebateJoinResponse = string;
export type DebateCreateResponse = string;
export type GetWaitResponse = DebateQueryResponse[];
export type GetDoneResponse = DebateDoneQueryResponse;
export type GetDoneAllResponse = DebateDoneQueryAllResponse[];
export type GetMyAllResponse = DebateMyQueryAllResponse[];
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

export interface UserEditEducationLevelRequest {
  educationLevel: EducationLevel;
}

export interface UserInfoResponse {
  username: string;
  educationLevel: EducationLevel;
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
  tagList: TagEnum[];
  title: string;
  side: Side;
}

export interface DebateQueryResponse {
  debateId: string;
  title: string;
  side: "PRO" | "CON";
  tags: TagEnum[];
}

export interface Argument {
  level: DebateLevel;
  content: string;
  side: Side;
}

export interface DebateDoneQueryResponse {
  title?: string;
  summary?: string;
  feedback?: string;
  data: Argument[];
}

export interface DebateDoneQueryAllResponse {
  title: string;
  debateId: string;
  tags: TagEnum[];
  con: number;
  pro: number;
}

export interface DebateMyQueryAllResponse extends DebateDoneQueryAllResponse {
  side: Side;
}

export interface DebateCancelRequest {
  side: Side;
  debateId: string;
  level: DebateLevel;
}

export interface DebateCancleJoin {
  debateId: string;
  side: Side;
}
