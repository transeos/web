import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  BadRequestError,
  UserSigning,
  natsWrapper,
} from 'common';

import { User } from '../models/user';
import { AccountDeletedEventPublisher } from '../events/publishers/signin-publishers';
import { Password } from '../utils/route-utils';

// Create an express router
const router = express.Router();

// Define a route for user sign in
router.post(
  '/api/users/delete',
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

    await User.deleteOne({ email });

    const eventPublisher = new AccountDeletedEventPublisher(natsWrapper.client);
    eventPublisher.publish({
      userId: existingUser.id,
      emailId: existingUser.email,
      deviceIp: clientIp,
      time: new Date(),
      type: UserSigning.Deleted,
    });

    // Clear the user's session
    req.session = null;

    // Send an empty object as a response
    res.send({});
  },
);

export { router as accountDeletedRouter };
