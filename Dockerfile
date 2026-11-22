# Stage 1: Build React frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app
COPY frontend/package.json frontend/tsconfig.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Build Go backend
FROM golang:1.23-alpine AS backend-builder

WORKDIR /app
COPY backend/ .
RUN go mod tidy
RUN go build -o server .

# Stage 3: Final image
FROM alpine:latest

RUN apk --no-cache add ca-certificates
WORKDIR /app

# Copy backend binary
COPY --from=backend-builder /app/server .
# Copy built React app to where main.go looks for it
COPY --from=frontend-builder /app/build ./frontend/dist

EXPOSE 8080
CMD ["./server"]
