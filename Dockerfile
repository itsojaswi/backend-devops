# official Node.js image as base image
FROM node:16-alpine

WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Set the command to run the app
CMD ["npm", "run", "dev"]