import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

// requireAuth is a middleware function that checks if the user is authenticated before proceeding to the next middleware or route handler
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // If currentUser is not set on the request object, throw a NotAuthorizedError
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  // If the user is authenticated, proceed to the next middleware or route handler
  next();
};
