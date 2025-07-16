import type { AxiosError, AxiosResponse } from "axios";
import instance from "./instance";
import { BaseService } from "./service";
import type { Result } from "./service";
import type { SseConnectResponse } from "./types";

export class SseService extends BaseService {
  prefix = "sse";

  /**
   * SSE 연결
   */
  async connect(
    debateId: string,
    side: "PRO" | "CON"
  ): Promise<Result<SseConnectResponse>> {
    try {
      const params = new URLSearchParams({ debateId, side });
      const res: AxiosResponse<SseConnectResponse> = await instance.get(
        this.getEndpoint(`/connect?${params}`)
      );
      return this.success(res.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = this.handleAxiosError(axiosError);
      return this.failure(status, axiosError.message);
    }
  }
}
