import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  BadRequestError,
  UserSigning,
  natsWrapper,
} from 'common';

import { SignInEventPublisher } from '../events/publishers/signin-publishers';
import { Password } from '../utils/route-utils';

// Create an express router
const router = express.Router();

// Define a route for user sign in
router.post(
  '/api/users/signin',
  [
    // Validate the email and password in the request body
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    const existingUser = await Password.checkIfEmailAndPasswordMatch(
      email,
      password,
    );
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    // Get the client's IP address
    const clientIp = req.ip;

    const userJwt = Password.createJwt(existingUser.id, existingUser.email);

    // Store the JWT in the user's session
    req.session = {
      jwt: userJwt,
    };

    const eventPublisher = new SignInEventPublisher(natsWrapper.client);
    eventPublisher.publish({
      userId: existingUser.id,
      emailId: existingUser.email,
      deviceIp: clientIp,
      time: new Date(),
      type: UserSigning.SignedIn,
    });

    // Send the authenticated user data in the response
    res.status(200).send(existingUser);
  },
);

export { router as signinRouter };
