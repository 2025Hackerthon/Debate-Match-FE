import type { AxiosError } from "axios";
import instance from "./instance";
import { BaseService } from "./service";
import type { Result } from "./service";
import type { ReactionRequest } from "./types";

export class ReactionService extends BaseService {
  prefix = "reaction";

  /**
   * 리액션 생성
   */
  async reaction(body: ReactionRequest): Promise<Result> {
    try {
      await instance.post(this.getEndpoint(), body);
      return this.success();
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = this.handleAxiosError(axiosError);
      return this.failure(status, axiosError.message);
    }
  }
}
