import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError, UserSigning } from 'common';

import { User } from '../models/user';
import { natsWrapper } from '../nats-wrapper';
import { SignUpEventPublisher } from '../events/publishers/signin-publishers';

// Create an express router
const router = express.Router();

// Define a route for user sign up
router.post(
  '/api/users/signup',
  [
    // Validate the email and password in the request body
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Get the client's IP address
    const clientIp = req.ip;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    // Create a new user
    const user = User.build({ email, password });

    // Save the new user to the database
    await user.save();

    if (!process.env.JWT_KEY) {
      console.error('JWT_KEY not defined');
      return;
    }

    // Generate a JSON Web Token (JWT) for the newly registered user
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY,
      { expiresIn: 24 * 60 * 60 }, // 24 hours in seconds
    );

    // Store the JWT in the user's session
    req.session = {
      jwt: userJwt,
    };

    const eventPublisher = new SignUpEventPublisher(natsWrapper.client);
    eventPublisher.publish({
      userId: user.id,
      emailId: user.email,
      deviceIp: clientIp,
      time: new Date(),
      type: UserSigning.SignedUp,
    });

    // Send the newly registered user data in the response with a 201 status (Created)
    res.status(201).send(user);
  },
);

export { router as signupRouter };
