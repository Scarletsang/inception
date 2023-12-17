FROM alpine:latest AS build-stage
COPY frontend /frontend
WORKDIR /frontend
RUN ["apk", "add", "--update", "nodejs", "npm"]
RUN ["npm", "install"]
RUN ["./node_modules/.bin/rollup", "-c", "./rollup.config.js"]

FROM alpine:latest
RUN ["apk", "add", "--update", "crystal", "shards"]
RUN ["apk", "add", "--update", "libressl-dev"]
COPY backend /backend
COPY --from=build-stage /frontend/dist /backend/public
WORKDIR /backend
RUN ["shards", "install"]
RUN ["crystal", "build", "src/app.cr", "--release"]

EXPOSE 8000

ENTRYPOINT ["./app"]
CMD ["-p", "8000"]