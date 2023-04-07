import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  readonly statusCode = 404;

  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  override serializeErrors(): { message: string }[] {
    return [{ message: 'Not Found' }];
  }
}
