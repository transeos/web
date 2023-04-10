import express from 'express';
import 'express-async-errors'; // Allows async errors to be properly caught by error handling middleware
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from 'common';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { accountDeletedRouter } from './routes/delete-account';

const app = express();

// Trust the proxy, enabling proper handling of X-Forwarded-* headers (useful when behind a reverse proxy)
app.set('trust proxy', true);

// Middleware
app.use(json());
app.use(
  cookieSession({
    signed: false, // Do not sign cookies, as we are using JWT tokens
    secure: process.env.NODE_ENV !== 'test', // Use secure cookies (HTTPS) in production, but not in test environment
  }),
);

// Register route handlers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(accountDeletedRouter);

// Catch-all route handler for 404 Not Found errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

export { app };
