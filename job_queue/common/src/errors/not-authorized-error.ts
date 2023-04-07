import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  readonly statusCode = 401;

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  override serializeErrors(): { message: string }[] {
    return [{ message: 'Not authorized' }];
  }
}
