FROM alpine:3

RUN apk update && apk upgrade

# Install MariaDB
RUN apk --no-cache add mariadb mariadb-client

# Create a directory for MariaDB data
RUN mkdir -p /var/lib/mysql && \
    mkdir -p /var/run/mysqld && \
    chown -R mysql:mysql /var/lib/mysql && \
    chown -R mysql:mysql /var/run/mysqld

# Initialize the system tables
RUN mariadb-install-db --user=mysql

# Copy the custom MariaDB configuration file
COPY conf/my.cnf /etc/my.cnf

# Expose the default MariaDB port
EXPOSE 3306

# Start MariaDB when the container starts
CMD ["mysqld"]