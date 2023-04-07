import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  readonly statusCode = 500;
  readonly reason = 'Error connecting to database';

  constructor() {
    super('Error connecting to database');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  override serializeErrors(): { message: string }[] {
    return [{ message: this.reason }];
  }
}
