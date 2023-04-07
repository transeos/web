import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define an interface for the user payload in the JWT
interface UserPayload {
  id: string;
  email: string;
}

// Augment the Express. Request interface with a new optional property called currentUser
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

// currentUser middleware to extract the current user from the JWT (if present) and attach it to the request object
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // If there is no JWT in the session, proceed to the next middleware or route handler
  if (!req.session?.jwt) {
    return next();
  }

  try {
    // Verify the JWT using the secret key provided in the environment variable JWT_KEY
    // If the verification is successful, cast the decoded user payload as a UserPayload and attach it to req.currentUser
    const payload = jwt.verify(
      req.session.jwt,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.JWT_KEY!,
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    // If there's an error during JWT verification, proceed to the next middleware or route handler without attaching the currentUser
  }

  // Call next() to move to the next middleware or route handler in the chain
  next();
};
