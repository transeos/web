# Use the official Node.js Alpine Linux image as the base image
FROM node:alpine

# Set the working directory for the container
WORKDIR /app

# Copy the package.json file to the working directory
COPY package.json .

# Install only production dependencies
RUN npm install --omit=dev

# Copy the rest of the application files to the working directory
COPY . .

# Define the default command to run when the container starts
CMD ["npm", "start"]
