import express from "express";

// Create an express router
const router = express.Router();

// Define a route for user sign out
router.post("/api/users/signout", (req, res) => {
  // Clear the user's session
  req.session = null;

  // Send an empty object as a response
  res.send({});
});

export { router as signoutRouter };
