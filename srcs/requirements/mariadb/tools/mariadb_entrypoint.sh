#!/bin/sh

if [ ! -d "/var/lib/mysql/wordpress" ]; then
    mariadbd --user=mysql --bootstrap --console <<EOF
USE mysql;
FLUSH PRIVILEGES;
DELETE FROM     mysql.user WHERE User='';
DROP DATABASE test;
DELETE FROM mysql.db WHERE Db='test';
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
CREATE DATABASE ${WP_DB_NAME};
CREATE USER '${WP_DB_USER}'@'%' IDENTIFIED BY '${WP_DB_PASSWORD}';
GRANT ALL PRIVILEGES ON ${WP_DB_NAME}.* TO '${WP_DB_USER}'@'%';
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY '${WP_DB_ROOT_PASSWORD}';
FLUSH PRIVILEGES;
EOF
else
    mariadbd --user=mysql --console
fi
