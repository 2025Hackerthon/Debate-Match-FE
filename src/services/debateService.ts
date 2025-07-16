import type { AxiosError, AxiosResponse } from "axios";
import instance from "./instance";
import { BaseService } from "./service";
import type { Result } from "./service";
import type {
  DebateUpdateRequest,
  DebateUpdateResponse,
  DebateReadyRequest,
  DebateJoinRequest,
  DebateJoinResponse,
  DebateCreateRequest,
  DebateCreateResponse,
  GetWaitResponse,
  GetDoneResponse,
  GetMyAllResponse,
  GetDoneAllResponse
} from "./types";

export class DebateService extends BaseService {
  prefix = "debate";

  /**
   * 토론 업데이트
   */
  async update(
    body: DebateUpdateRequest
  ): Promise<Result<DebateUpdateResponse>> {
    try {
      const res: AxiosResponse<DebateUpdateResponse> = await instance.post(
        this.getEndpoint("/update"),
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
   * 토론 준비
   */
  async ready(body: DebateReadyRequest): Promise<Result> {
    try {
      await instance.post(this.getEndpoint("/ready"), body);
      return this.success();
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = this.handleAxiosError(axiosError);
      return this.failure(status, axiosError.message);
    }
  }

  /**
   * 토론 참여
   */
  async join(body: DebateJoinRequest): Promise<Result<DebateJoinResponse>> {
    try {
      const res: AxiosResponse<DebateJoinResponse> = await instance.post(
        this.getEndpoint("/join"),
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
   * 토론 생성
   */
  async create(
    body: DebateCreateRequest
  ): Promise<Result<DebateCreateResponse>> {
    try {
      const res: AxiosResponse<DebateCreateResponse> = await instance.post(
        this.getEndpoint("/create"),
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
   * 대기 중인 토론 목록 조회
   */
  async getWait(): Promise<Result<GetWaitResponse>> {
    try {
      const res: AxiosResponse<GetWaitResponse> = await instance.get(
        this.getEndpoint("/wait", { cache: true })
      );
      return this.success(res.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = this.handleAxiosError(axiosError);
      return this.failure(status, axiosError.message);
    }
  }

  /**
   * 완료된 특정 토론 조회
   */
  async getDone(id: string): Promise<Result<GetDoneResponse>> {
    try {
      const params = new URLSearchParams({ id });
      const res: AxiosResponse<GetDoneResponse> = await instance.get(
        this.getEndpoint(`/done?${params}`, { cache: true })
      );
      return this.success(res.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = this.handleAxiosError(axiosError);
      return this.failure(status, axiosError.message);
    }
  }

  /**
   * 내 토론 목록 조회
   */
  async getMyAll(): Promise<Result<GetMyAllResponse>> {
    try {
      const res: AxiosResponse<GetMyAllResponse> = await instance.get(
        this.getEndpoint("/my-debate", { cache: true })
      );
      return this.success(res.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = this.handleAxiosError(axiosError);
      return this.failure(status, axiosError.message);
    }
  }

  /**
   * 완료된 모든 토론 목록 조회
   */
  async getDoneAll(): Promise<Result<GetDoneAllResponse>> {
    try {
      const res: AxiosResponse<GetDoneAllResponse> = await instance.get(
        this.getEndpoint("/done-list", { cache: true })
      );
      return this.success(res.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = this.handleAxiosError(axiosError);
      return this.failure(status, axiosError.message);
    }
  }
}
