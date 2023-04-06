import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@cygnetops/common-v2';

import { Password } from '../services/password';
import { User } from '../models/user';

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

    // Check if the user exists in the database
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    // Compare the provided password with the stored password
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password,
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    if (!process.env.JWT_KEY) {
      console.error('JWT_KEY not defined');
      return;
    }

    // Generate a JSON Web Token (JWT) for the authenticated user
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: 24 * 60 * 60 }, // 24 hours in seconds
    );

    // Store the JWT in the user's session
    req.session = {
      jwt: userJwt,
    };

    // Send the authenticated user data in the response
    res.status(200).send(existingUser);
  },
);

export { router as signinRouter };
