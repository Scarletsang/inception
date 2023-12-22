#!/bin/sh

cd /var/www/html
wp core download --locale=en_GB
chmod -R 0777 wp-content/
wp config create \
    --dbname=${WP_DB_NAME} \
    --dbuser=${WP_DB_USER} \
    --dbpass=${WP_DB_PASSWORD} \
    --dbhost=mariadb && echo "wp-config.php created"
wp db create && echo "Database created"
wp core install \
    --url=${WP_URL} \
    --title="${WP_TITLE}" \
    --admin_user=${WP_ADMIN_USER} \
    --admin_password=${WP_ADMIN_PASSWORD} \
    --admin_email=${WP_ADMIN_EMAIL} && echo "Wordpress installed"

php-fpm${PHP_VERSION} -F