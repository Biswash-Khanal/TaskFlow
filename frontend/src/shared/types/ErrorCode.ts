/** Enum of standardized error codes for API responses */
export const ErrorCode = {
  //  Authentication & Authorization
  INVALID_EMAIL: "INVALID_EMAIL",
  INVALID_PASSWORD: "INVALID_PASSWORD",
  INCORRECT_PASSWORD: "INCORRECT_PASSWORD",
  EMAIL_EXISTS: "EMAIL_EXISTS",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  FORBIDDEN: "FORBIDDEN",

  // Validation
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_NAME: "INVALID_NAME",
  INVALID_INPUT: "INVALID_INPUT",
  MISSING_FIELD: "MISSING_FIELD",
  BAD_REQUEST: "BAD_REQUEST",
  UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY",

  // Resource / CRUD
  NOT_FOUND: "NOT_FOUND",
  DUPLICATE_RESOURCE: "DUPLICATE_RESOURCE",
  UPDATE_FAILED: "UPDATE_FAILED",
  DELETE_FAILED: "DELETE_FAILED",
  CONFLICT: "CONFLICT",

  // Server / Infrastructure
  INTERNAL_ERROR: "INTERNAL_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
  TIMEOUT: "TIMEOUT",
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

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
