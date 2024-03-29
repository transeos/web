import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  readonly statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  override serializeErrors(): { message: string }[] {
    return [{ message: this.message }];
  }
}
