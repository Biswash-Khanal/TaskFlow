export class AppError extends Error {
  statusCode: number;
  constructor(message = "An Error Occured", statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
