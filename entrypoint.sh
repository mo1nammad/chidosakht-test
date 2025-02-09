#!/bin/sh

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to start..."
until nc -z -v -w30 postgres 5432; do
  echo "Waiting for database connection..."
  sleep 1
done
echo "PostgreSQL is up!"

# Run Drizzle migrations
echo "Running Drizzle migrations..."
npx drizzle-kit push

# Start the Next.js application
echo "Starting Next.js..."
exec npm run dev