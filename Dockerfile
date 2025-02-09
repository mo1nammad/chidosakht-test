FROM node:22-alpine as base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL=postgresql://user:password@postgres:5432/mydatabase

# Copy the entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh


# Command to run migrations at runtime and start the app
CMD ["/bin/sh", "/app/entrypoint.sh"]

