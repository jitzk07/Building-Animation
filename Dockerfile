# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Add mime.types
COPY --from=builder /etc/mime.types /etc/nginx/mime.types

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]