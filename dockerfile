# Using a lightweight Node.js Alpine base image
FROM node:18-alpine

# Essential system dependencies for better compatibility
RUN apk update
RUN apk add --no-cache libc6-compat

# Set working directory in the container
WORKDIR /app

# Install turbo globally
RUN yarn global add turbo

# Copy the application to the container
COPY . .

# Specify the command to run tests
RUN yarn global add turbo

# Install dependencies
RUN yarn install