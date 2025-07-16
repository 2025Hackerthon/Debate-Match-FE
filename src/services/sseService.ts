import type { AxiosError } from "axios";
import instance from "./instance";
import { BaseService } from "./service";
import type { Result } from "./service";

export class SseService extends BaseService {
  prefix = "sse";

  /**
   * SSE 연결
   */
  async connect(
    debateId: string,
    side: "PRO" | "CON"
  ): Promise<EventSource | Result> {
    try {
      const url = this.getEndpoint(
        `/connect?debateId=${debateId}&side=${side}`
      );
      const eventSource = new EventSource(instance.defaults.baseURL + url);

      return eventSource;
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = this.handleAxiosError(axiosError);
      return this.failure(status, axiosError.message);
    }
  }
}
