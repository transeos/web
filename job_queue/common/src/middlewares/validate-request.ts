import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

// validateRequest is a middleware function that checks if the request data is valid based on the specified validation rules
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Get validation results from the request object
  const errors = validationResult(req);

  // If there are validation errors, throw a RequestValidationError with the errors array
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  // If there are no validation errors, proceed to the next middleware or route handler
  next();
};
