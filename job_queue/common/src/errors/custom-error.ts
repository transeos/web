/**
 * Represents a custom error with a status code and serialization functionality.
 */
export abstract class CustomError extends Error {
  abstract readonly statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  /**
   * Serializes the error into an array of objects with a message and an optional field.
   * @returns An array of objects containing the error message and an optional field.
   */
  abstract serializeErrors(): { message: string; field?: string }[];
}
