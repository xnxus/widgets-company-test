# Company Widget

A React-based widget for displaying company information. This project uses Docker for containerization and React Mosaic for the front-end

## Features

- Display company-related data.
- Responsive design for optimal viewing on various screen sizes.
- React-mosaic-component
- Docker for easy setup and deployment.

## Getting Started

Here is how to you get the project up and running on your local machine.

### Installation

1. \*\*Clone the repository:

   git clone git@github.com:xnxus/widgets-company-test.git
   git clone https://github.com/xnxus/widgets-company-test
   cd widgets-company-test

### Install dependencies (if running outside Docker):

npm install

### Build and run the application with Docker:

To build and run the app with Docker, use the following command:

docker-compose up --build

This will build the Docker image and start the application.

### Access the app:

Once the Docker container is running, the widget will be accessible at http://localhost:3000 by default.

### Running Locally (without Docker)

If you want to run the app locally without Docker, follow these steps:

### Install dependencies:

npm install

npm start

Open on http://localhost:3000 to view the app.

### Docker Commands:

### Build the Docker container:

docker-compose build

### Run the app with Docker:

docker-compose up

### Stop the Docker containers:

docker-compose down

### Troubleshooting

Port already in use: If you encounter an error related to port binding, make sure the port is free or change the port in the docker-compose.yml file.

for permission issues:

chmod -R 755 node_modules# Company Widget
