import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

// errorHandler is a middleware function that handles errors thrown by previous middlewares or route handlers
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  // If the error is an instance of CustomError, use the provided status code and serialized errors for the response
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // If the error is not an instance of CustomError, return a generic 400 status with a 'Something went wrong' message
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
