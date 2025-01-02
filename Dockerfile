# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies for native modules (minimal set)
RUN apk add --no-cache python3 make g++

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies in a clean environment
RUN npm ci --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application with NGINX
FROM nginx:alpine AS production

# Copy the build output from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
