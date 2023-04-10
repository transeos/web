import express from 'express';
import { currentUser } from 'common';

// Create an express router
const router = express.Router();

// Define a route to get the current user
router.get('/api/users/currentuser', currentUser, (req, res) => {
  // Send the current user object in the response or null if the user is not authenticated
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
