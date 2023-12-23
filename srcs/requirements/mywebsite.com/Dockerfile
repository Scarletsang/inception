FROM alpine:3.18 AS build-stage
# install npm
RUN apk update && apk upgrade && \
    apk add nodejs npm

# install frontend dependencies
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json .
RUN ["npm", "install"]

# build frontend
COPY frontend .
RUN ["./node_modules/.bin/rollup", "-c", "./rollup.config.js"]

FROM alpine:3.18
# install crystal
RUN apk update && apk upgrade && \
    apk add crystal shards libressl-dev

# install backend dependencies
WORKDIR /backend
COPY backend/shard.yml backend/shard.lock .
RUN ["shards", "install"]

# build backend
COPY backend/ .
COPY --from=build-stage /frontend/dist /backend/public
RUN ["crystal", "build", "src/app.cr", "--release"]

EXPOSE 8000

ENTRYPOINT ["./app"]
CMD ["-p", "8000"]