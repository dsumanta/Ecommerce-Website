# # Use the official Node.js image.
# FROM node:latest

# # Set the working directory.
# WORKDIR /app

# # Copy package.json and package-lock.json.
# COPY package.json .
# COPY . .

# # Install dependencies.
# RUN npm install

# # Expose the port the app runs on.
# EXPOSE 8080

# # # Build the application
# # RUN npm run build

# # Command to run the application.
# CMD ["npm","dev"]

FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY src/package.json src/package-lock.json .
RUN npm install
COPY src/ .
EXPOSE 3000
CMD [ "npm", "start"]
