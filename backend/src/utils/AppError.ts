import { ErrorCode } from "../shared/types/ErrorCode";

export class AppError extends Error {
  statusCode: number;
  errorCode: ErrorCode;
  constructor(
    message = "An Error Occured",
    statusCode = 500,
    errorCode = ErrorCode.INTERNAL_ERROR,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
