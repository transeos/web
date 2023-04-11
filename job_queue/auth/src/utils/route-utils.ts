import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import { User, UserDoc } from '../models/user';

// Promisify the scrypt function for easier usage with async/await
const scryptAsync = promisify(scrypt);

export class Password {
  /**
   * Hash a plaintext password using the scrypt algorithm
   * @param password - The plaintext password to hash
   * @returns The hashed password as a string
   */
  static async toHash(password: string): Promise<string> {
    // Generate a random salt
    const salt = randomBytes(8).toString('hex');

    // Hash the password with the generated salt
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    // Return the hashed password and salt in a single string
    return `${buf.toString('hex')}.${salt}`;
  }

  /**
   * Compare a stored hashed password with a supplied plaintext password
   * @param storedPassword - The stored hashed password
   * @param suppliedPassword - The plaintext password to compare
   * @returns True if the hashed passwords match, false otherwise
   */
  static async compare(
    storedPassword: string,
    suppliedPassword: string,
  ): Promise<boolean> {
    // Split the stored password into its hashed password and salt components
    const [hashedPassword, salt] = storedPassword.split('.');

    // Hash the supplied password with the stored salt
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    // Compare the hashed supplied password with the stored hashed password
    return buf.toString('hex') === hashedPassword;
  }

  /**
   * This static method checks if the provided email and password match a user in the database.
   * If a match is found, the UserDoc of the corresponding user is returned; otherwise, null is returned.
   *
   * @param email - The email address of the user.
   * @param password - The plaintext password provided by the user.
   * @returns A promise that resolves to either a UserDoc or null, depending on whether a match is found.
   */
  static async checkIfEmailAndPasswordMatch(
    email: string,
    password: string,
  ): Promise<UserDoc | null> {
    // Query the database for a user with the provided email address
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return null;
    }

    // Compare the provided password with the stored password
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password,
    );
    if (!passwordsMatch) {
      return null;
    }

    return existingUser;
  }

  /**
   * This function creates a JSON Web Token (JWT) for a user based on their userId and emailId.
   * An optional expiration time can be provided, with a default value of 24 hours.
   *
   * @param userId - The user's unique identifier.
   * @param emailId - The user's email address.
   * @param expirationTimeInSec - The JWT's expiration time in seconds (default: 24 * 60 * 60, or 24 hours).
   * @returns A signed JWT as a string.
   */
  static createJwt(
    userId: string,
    emailId: string,
    expirationTimeInSec = 24 * 60 * 60,
  ): string {
    // Create a JWT payload with the user's ID and email
    const payload = {
      id: userId,
      email: emailId,
    };

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userJwt = jwt.sign(payload, process.env.JWT_KEY!, {
      expiresIn: expirationTimeInSec,
    });
    return userJwt;
  }
}
