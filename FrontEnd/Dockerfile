# Use the official Node.js image to build the React app.
FROM node:latest AS build

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json.
COPY package.json .

# Install dependencies.
RUN npm install

# Copy the rest of the frontend code.
COPY . .

# Build the React app.
RUN npm run build

# Use an Nginx image to serve the built React app.
# FROM nginx:alpine

# Copy the build files to the Nginx server.
# COPY --from=build /app/build /usr/share/nginx/html

# Expose port 5173.
EXPOSE 5173

# Command to run Nginx.
CMD ["npm", "run", "dev"]
