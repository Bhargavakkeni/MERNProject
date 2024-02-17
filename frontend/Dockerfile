# Use official Node.js image as base for building React app
FROM node:14 as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to workdir
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Expose port
EXPOSE 3000

# Command to run Nginx server
CMD ["npm", "start"]
