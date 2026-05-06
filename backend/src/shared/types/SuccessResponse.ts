/** 
 * Type for standardized success responses.
 * Keeps things simple: a human-readable message and the data payload.
 */
export interface SuccessResponse<T> {
  /** 
   * Message: Concise description of the successful operation.
   * Example: "User registered successfully", "Post created"
   */
  message: string;

  /** 
   * Data: The actual payload returned by the operation.
   * Generic so you can plug in any resource type.
   * Example: User object, Post object, Token payload, etc.
   */
  data: T;
}
