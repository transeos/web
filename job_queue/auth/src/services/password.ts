import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

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
}
