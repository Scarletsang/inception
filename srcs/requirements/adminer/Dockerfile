FROM alpine:3.18

ARG PHP_VERSION=${PHP_VERSION:-82}
ENV PHP_VERSION=${PHP_VERSION:-82}

RUN apk update && apk upgrade && \
    apk add --no-cache \
        php${PHP_VERSION} \
        php${PHP_VERSION}-session \
        php${PHP_VERSION}-pdo \
        php${PHP_VERSION}-pdo_mysql \
        php${PHP_VERSION}-json \
        php${PHP_VERSION}-ctype \
        php${PHP_VERSION}-mbstring \
        php${PHP_VERSION}-openssl \
        php${PHP_VERSION}-tokenizer \
        php${PHP_VERSION}-xml \
        php${PHP_VERSION}-xmlwriter \
        php${PHP_VERSION}-session \
        php${PHP_VERSION}-curl \
        php${PHP_VERSION}-opcache \
        php${PHP_VERSION}-gd \
        php${PHP_VERSION}-simplexml \
        php${PHP_VERSION}-fileinfo
        curl && \
    ln -s /usr/bin/php${PHP_VERSION} /usr/bin/php && \
    curl -o adminer.php https://www.adminer.org/latest.php -L

EXPOSE 8080

CMD ["php", "-S", "0.0.0.0:8080", "adminer.php"]