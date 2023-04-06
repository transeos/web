import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    // Connect to the MongoDB database using the MONGO_URI environment variable
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  // Start the express app and listen for incoming requests on port 3000
  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

// Call the start function to initialize the application
start();
