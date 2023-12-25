FROM alpine:3.18

ARG PHP_VERSION=${PHP_VERSION:-82}
ENV PHP_VERSION=${PHP_VERSION:-82}

RUN apk update && apk upgrade && \
    apk add --no-cache \
        php${PHP_VERSION} \
        curl && \
    curl -o adminer.php https://www.adminer.org/latest.php

EXPOSE 8080

ENTRYPOINT ["php", "-S"]
CMD ["localhost:8080"]