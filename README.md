# NestJS Microservice with RabbitMQ
This project is designed to demonstrate the microservice architecture using NestJS and integrates RabbitMQ for efficient message-based communication between services. It focuses on helping developers understand how to build and manage distributed systems using NestJS.

The aim of this project is to:
- Explore microservice patterns in NestJS
- Learn how to configure and use RabbitMQ as a message broker
- Understand inter-service communication in a distributed system

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/Yesarib/nest-microservice.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start RabbitMQ using Docker:
   ```
   docker run -d --hostname rabbitmq --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management
   ```
4. Configure .env to point to RabbitMQ (if needed).

## Running Each Microservice Separately
Since the project lacks a docker-compose.yml file, you'll need to start each microservice manually:
1. Navigate to each microservice directory:
   ```
   cd [service-name]
   ```
2. Start each microservice:
   ```
   npm run start:dev
   ```
3. For the running RabbitMQ you should also running:
   After navigate to main  
   ```
   npm run listen
   ```

## Microservice Overview
The services are built to communicate using RabbitMQ, providing an example of how to decouple services in a microservice architecture.
