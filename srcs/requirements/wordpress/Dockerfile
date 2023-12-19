FROM alpine:latest

# install PHP, download WP-CLI
RUN apk update && apk upgrade && \
    apk add --no-cache \
        php \
        php-mysqli \
        php-json \
        php-phar \
        php-curl \
        php-gd \
        php-mbstring \
        php-dom \
        php-session \
        php-fpm \
        curl && \
    curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar

# Install WP-CLI
RUN chmod +x wp-cli.phar && \
    mv wp-cli.phar /usr/local/bin/wp && \
    wp --info

COPY tools/wordpress_entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wordpress_entrypoint.sh
CMD /usr/local/bin/wordpress_entrypoint.sh