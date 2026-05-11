import { ErrorCode } from "./ErrorCode";

/**
 * Type for standardized error responses (RFC 7807-inspired).
 * This ensures consistency across your API and makes errors
 * predictable and easy to handle on the frontend.
 */
export interface ErrorResponse {
  /**
   * Title: Concise, one‑sentence summary of the error.
   * Example: "Invalid credentials", "Resource not found"
   */
  title: string;

  /**
   * Status: The HTTP status code associated with the error.
   * Example: 400 (Bad Request), 401 (Unauthorized), 404 (Not Found)
   */
  status: number;

  /**
   * Detail: Human‑readable explanation of the error.
   * Example: "The 'email' field must be a valid email address."
   */
  detail: string;

  /**
   * Instance: The request path or endpoint where the error occurred.
   * Example: "/v1/auth/login", "/v1/users/register"
   */
  instance: string;

  /**
   * Code: Internal machine‑readable identifier for the error.
   * Should come from a predefined enum (e.g. INVALID_PASSWORD, USER_NOT_FOUND).
   * This allows frontend logic without parsing text messages.
   */
  code: ErrorCode;

  /**
   * Errors: Optional array of field‑level validation issues.
   * Useful for form validation feedback.
   * Example: [{ field: "email", message: "Invalid email format" }]
   */
  errors?: {
    field: string;
    message: string;
  }[];
}