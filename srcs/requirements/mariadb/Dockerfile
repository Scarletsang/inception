FROM alpine:3.18

# Install MariaDB
RUN apk update && apk upgrade && \
    apk --no-cache add mariadb mariadb-client

# Create a directory for MariaDB data
RUN mkdir -p /var/lib/mysql && \
    mkdir -p /var/run/mysqld && \
    chown -R mysql:mysql /var/lib/mysql && \
    chown -R mysql:mysql /var/run/mysqld

# Copy the custom MariaDB configuration file
COPY conf/my.cnf /etc/my.cnf

# Initialize the system tables
RUN mariadb-install-db

COPY tools/mariadb_entrypoint.sh /usr/local/bin/mariadb_entrypoint.sh
RUN chmod +x /usr/local/bin/mariadb_entrypoint.sh

# Expose the default MariaDB port
EXPOSE 3306

ENTRYPOINT ["/usr/local/bin/mariadb_entrypoint.sh"]