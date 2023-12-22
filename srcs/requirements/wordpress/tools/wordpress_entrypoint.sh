#!/bin/sh

# Download WordPress
wp core download --locale=en_GB

# Set permissions
chmod -R 0755 wp-content/

# Create wp-config.php
wp config create \
    --dbname=${WP_DB_NAME} \
    --dbuser=${WP_DB_USER} \
    --dbpass=${WP_DB_PASSWORD} \
    --dbhost=mariadb && echo "wp-config.php created"

# Set Redis configuration
wp config set WP_REDIS_HOST redis
wp config set WP_REDIS_PORT 6379
wp config set WP_REDIS_PASSWORD ${REDIS_PASSWORD}

# Check if the database exists before creating
if ! wp db check; then
    wp db create && echo "Database created"
fi

# Install WordPress
wp core install \
    --url=${WP_URL} \
    --title="${WP_TITLE}" \
    --admin_user=${WP_ADMIN_USER} \
    --admin_password=${WP_ADMIN_PASSWORD} \
    --admin_email=${WP_ADMIN_EMAIL} && echo "Wordpress installed"

# Install redis plugins
wp plugin install redis-cache --activate
wp redis enable
wp redis update-dropin

php-fpm${PHP_VERSION} -F