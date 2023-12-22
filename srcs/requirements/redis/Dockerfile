FROM alpine:3

RUN apk update && apk upgrade && \
    apk add --no-cache redis

ENTRYPOINT ["redis-server"]