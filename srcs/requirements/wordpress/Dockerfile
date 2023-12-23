FROM alpine:3.18

ARG PHP_VERSION=${PHP_VERSION:-82}
ENV PHP_VERSION=${PHP_VERSION:-82}

# install PHP, download WP-CLI
RUN apk update && apk upgrade && \
    apk add --no-cache \
        php${PHP_VERSION} \
        php${PHP_VERSION}-mysqli \
        php${PHP_VERSION}-json \
        php${PHP_VERSION}-phar \
        php${PHP_VERSION}-curl \
        php${PHP_VERSION}-gd \
        php${PHP_VERSION}-mbstring \
        php${PHP_VERSION}-dom \
        php${PHP_VERSION}-session \
        php${PHP_VERSION}-ctype \
        php${PHP_VERSION}-tokenizer \
        php${PHP_VERSION}-redis \
        php${PHP_VERSION}-fpm \
        mariadb-client \
        redis \
        curl && \
    curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar

# Install WP-CLI
RUN chmod +x wp-cli.phar && \
    mv wp-cli.phar /usr/local/bin/wp && \
    ln -s /usr/bin/php${PHP_VERSION} /usr/bin/php && \
    wp --info

COPY tools/wordpress_entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wordpress_entrypoint.sh && \
    sed -i "s|listen = 127.0.0.1:9000|listen = 9000|g" \
        /etc/php${PHP_VERSION}/php-fpm.d/www.conf && \
    sed -i "s|;listen.owner = nobody|listen.owner = nobody|g" \
      /etc/php${PHP_VERSION}/php-fpm.d/www.conf && \
    sed -i "s|;listen.group = nobody|listen.group = nobody|g" \
      /etc/php${PHP_VERSION}/php-fpm.d/www.conf
WORKDIR /var/www/html
ENTRYPOINT ["/usr/local/bin/wordpress_entrypoint.sh"]