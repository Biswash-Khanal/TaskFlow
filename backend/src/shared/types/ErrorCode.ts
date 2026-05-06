/** Enum of standardized error codes for API responses */
export enum ErrorCode {
  //  Authentication & Authorization
  INVALID_EMAIL = "INVALID_EMAIL", // 400 Bad Request
  INVALID_PASSWORD = "INVALID_PASSWORD", // 401 Unauthorized
  INCORRECT_PASSWORD = "INCORRECT_PASSWORD", // 401 Unauthorized
  EMAIL_EXISTS = "EMAIL_EXISTS", // 409 Conflict
  USER_NOT_FOUND = "USER_NOT_FOUND", // 404 Not Found
  UNAUTHORIZED = "UNAUTHORIZED", // 401 Unauthorized
  TOKEN_EXPIRED = "TOKEN_EXPIRED", // 401 Unauthorized
  FORBIDDEN = "FORBIDDEN", // 403 Forbidden

  // Validation
  VALIDATION_ERROR = "VALIDATION_ERROR", // 400 Bad Request
  INVALID_NAME = "INVALID_NAME", // 400 Bad Request
  INVALID_INPUT = "INVALID_INPUT", // 400 Bad Request
  MISSING_FIELD = "MISSING_FIELD", // 400 Bad Request
  BAD_REQUEST = "BAD_REQUEST", // 400 Bad Request
  UNPROCESSABLE_ENTITY = "UNPROCESSABLE_ENTITY", // 422 Unprocessable Entity

  // Resource / CRUD
  NOT_FOUND = "NOT_FOUND", // 404 Not Found
  DUPLICATE_RESOURCE = "DUPLICATE_RESOURCE", // 409 Conflict
  UPDATE_FAILED = "UPDATE_FAILED", // 500 Internal Server Error
  DELETE_FAILED = "DELETE_FAILED", // 500 Internal Server Error
  CONFLICT = "CONFLICT", // 409 Conflict

  // Server / Infrastructure
  INTERNAL_ERROR = "INTERNAL_ERROR", // 500 Internal Server Error
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE", // 503 Service Unavailable
  TIMEOUT = "TIMEOUT", // 408 Request Timeout
}

/** Human‑friendly titles for each ErrorCode */
export const ErrorTitles: Record<ErrorCode, string> = {
  // Authentication & Authorization
  [ErrorCode.INVALID_EMAIL]: "Invalid email address",
  [ErrorCode.INVALID_PASSWORD]: "Invalid password",
  [ErrorCode.INCORRECT_PASSWORD]: "Incorrect password",
  [ErrorCode.EMAIL_EXISTS]: "Email already exists",
  [ErrorCode.USER_NOT_FOUND]: "User not found",
  [ErrorCode.UNAUTHORIZED]: "Unauthorized",
  [ErrorCode.TOKEN_EXPIRED]: "Token expired",
  [ErrorCode.FORBIDDEN]: "Forbidden",

  // Validation
  [ErrorCode.VALIDATION_ERROR]: "Validation error",
  [ErrorCode.INVALID_NAME]: "Invalid name",
  [ErrorCode.INVALID_INPUT]: "Invalid input",
  [ErrorCode.MISSING_FIELD]: "Missing field",
  [ErrorCode.BAD_REQUEST]: "Bad request",
  [ErrorCode.UNPROCESSABLE_ENTITY]: "Unprocessable entity",

  // Resource / CRUD
  [ErrorCode.NOT_FOUND]: "Resource not found",
  [ErrorCode.DUPLICATE_RESOURCE]: "Duplicate resource",
  [ErrorCode.UPDATE_FAILED]: "Update failed",
  [ErrorCode.DELETE_FAILED]: "Delete failed",
  [ErrorCode.CONFLICT]: "Conflict",

  // Server / Infrastructure
  [ErrorCode.INTERNAL_ERROR]: "Internal server error",
  [ErrorCode.SERVICE_UNAVAILABLE]: "Service unavailable",
  [ErrorCode.TIMEOUT]: "Request timed out",
};
