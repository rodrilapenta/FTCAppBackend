FROM node:8.15.0 AS build-env
COPY . /app
WORKDIR /app

FROM gcr.io/distroless/nodejs:latest
COPY --from=build-env /app /app
WORKDIR /app
CMD ["server.js"]
