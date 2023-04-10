# Start from the Node.js Alpine image
FROM node:alpine

# Set the working directory for the container
WORKDIR /app

# create common folder
RUN mkdir common

# create auth folder
RUN mkdir auth

# Copy the common/package.json file to the working directory
COPY common/package.json ./common

# Copy the auth/package.json file
COPY auth/package.json ./auth

# go inside common directory
WORKDIR /app/common

# Install only production dependencies
RUN npm install --omit=dev

# go inside auth directory
WORKDIR /app/auth

# Install only production dependencies
RUN npm install --omit=dev

# go inside common directory
WORKDIR /app/common

# Copy files from "common" to the working directory
COPY common .

# go inside auth directory
WORKDIR /app/auth

# Copy files from "auth" to the working directory
COPY auth .

# go inside auth directory
WORKDIR /app/auth/node_modules

# delete node_modules/common directory
RUN rm -rf  ./common

# create soft link
RUN  ln -s ../../common .

# go inside auth directory
WORKDIR /app/auth

# Define the default command to run when the container starts
CMD ["sh", "-c", "npm run watch-build"]
