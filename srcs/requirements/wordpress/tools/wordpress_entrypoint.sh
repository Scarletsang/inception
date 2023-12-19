#!/bin/sh

cd /var/www/html
wp core download --locale=en_GB
wp config create \
    --dbname=${WP_DB_NAME} \
    --dbuser=${WP_DB_USER} \
    --prompt=${WP_DB_PASSWORD} \
    --dbhost=${WP_DB_HOST}
wp db create
wp core install \
    --url=${WP_URL} \
    --title="${WP_TITLE}" \
    --admin_user=${WP_ADMIN_USER} \
    --admin_password=${WP_ADMIN_PASSWORD} \
    --admin_email=${WP_ADMIN_EMAIL}

tail -f /dev/null