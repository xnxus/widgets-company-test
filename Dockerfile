# Use the official Node.js image as the base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files into the container
COPY . .

#
RUN chmod -R 755 /app/node_modules

# Expose the port used by the application
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]

