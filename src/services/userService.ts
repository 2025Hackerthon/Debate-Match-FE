import type { AxiosResponse, AxiosError } from "axios";
import instance, { saveToken, removeToken } from "./instance";
import { BaseService } from "./service";
import type { Result } from "./service";
import type {
  UserSignUpRequest,
  UserSignUpResponse,
  UserLoginRequest,
  UserLoginResponse,
  UserInfoResponse,
  UserEditEducationLevelRequest
} from "./types";

export class UserService extends BaseService {
  prefix = "user";

  /**
   * 새 유저 생성 (회원가입)
   */
  async signUp(body: UserSignUpRequest): Promise<Result<UserSignUpResponse>> {
    try {
      const res: AxiosResponse<UserSignUpResponse> = await instance.post(
        this.getEndpoint("/signup"),
        body
      );
      return this.success(res.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = this.handleAxiosError(axiosError);
      return this.failure(status, axiosError.message);
    }
  }

  /**
   * 유저 로그인
   */
  async login(body: UserLoginRequest): Promise<Result<UserLoginResponse>> {
    try {
      const res: AxiosResponse<UserLoginResponse> = await instance.post(
        this.getEndpoint("/login"),
        body
      );
      saveToken(res.data.accessToken);
      return this.success(res.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = this.handleAxiosError(axiosError);
      return this.failure(status, axiosError.message);
    }
  }

  /**
   * 유저 정보
   */
  async info(): Promise<Result<UserInfoResponse>> {
    try {
      const res: AxiosResponse<UserInfoResponse> = await instance.get(
        this.getEndpoint("/info", { cache: true })
      );
      return this.success(res.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = this.handleAxiosError(axiosError);
      return this.failure(status, axiosError.message);
    }
  }

  /**
   * 유저 학력 편집
   */
  async editEducationLevel(body: UserEditEducationLevelRequest) {
    try {
      await instance.patch(this.getEndpoint("/edit"), body);
      return this.success();
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = this.handleAxiosError(axiosError);
      return this.failure(status, axiosError.message);
    }
  }

  /**
   * 유저 탈퇴
   */
  async resign(): Promise<Result> {
    try {
      await instance.delete(this.getEndpoint("/resign"));
      removeToken();
      return this.success();
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = this.handleAxiosError(axiosError);
      return this.failure(status, axiosError.message);
    }
  }

  /**
   * 유저 로그아웃
   */
  logout(): void {
    removeToken();
  }
}
