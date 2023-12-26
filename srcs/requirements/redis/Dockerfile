FROM alpine:3.18

# Package installation
RUN apk update && apk upgrade && \
    apk add --no-cache redis

ENTRYPOINT ["redis-server"]