FROM alpine:latest

# Install PHP and WP-CLI
RUN apk update && apk upgrade && \
    apk add php php-fpm php-mysql php-cli php-curl \
    php-xml php-json php-zip php-mbstring php-gd php-intl php-cgi curl && \
    curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && \
    mv wp-cli.phar /usr/local/bin/wp

# Install all the PHP extensions
RUN wp core download --path=/var/www/html --locale=en_GB && \
    wp config create --dbname=${WP_DB_NAME} --dbuser=${WP_DB_USER} --prompt=${WP_DB_PASSWORD} --host=${WP_DB_HOST}&& \
    wp db create && \
    wp core install \
        --url=${WP_URL} \
        --title=${WP_TITLE} \
        --admin_user=${WP_ADMIN_USER} \
        --admin_password=${WP_ADMIN_PASSWORD} \
        --admin_email=${WP_ADMIN_EMAIL} && \

CMD tail -f /dev/null