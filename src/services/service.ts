import { AxiosError } from "axios";

export enum ResultStatus {
  OK,
  BAD,
  INVALID,
  UNAUTHORIZED,
  FORBIDDEN,
  NOTFOUND,
  CONFLICT,
  ERROR
}

export interface Result<T = void> {
  status: ResultStatus;
  data?: T;
  error?: string;
}

export abstract class BaseService {
  abstract prefix: string;

  protected handleAxiosError(error: AxiosError): ResultStatus {
    switch (error.response?.status) {
      case 400:
        return ResultStatus.BAD;
      case 401:
        return ResultStatus.UNAUTHORIZED;
      case 403:
        return ResultStatus.FORBIDDEN;
      case 404:
        return ResultStatus.NOTFOUND;
      case 408:
        return ResultStatus.CONFLICT;
      default:
        return ResultStatus.ERROR;
    }
  }

  protected success<T>(data?: T): Result<T> {
    return { status: ResultStatus.OK, data };
  }

  protected failure<T>(status: ResultStatus, error?: string): Result<T> {
    return { status, error };
  }

  protected getEndpoint(
    path: string = "",
    options: { cache: boolean } = { cache: false }
  ): string {
    return `/${this.prefix}${path}${options.cache ? "?cache=true" : ""}`;
  }
}
