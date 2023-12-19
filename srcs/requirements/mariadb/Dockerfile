FROM alpine:latest

RUN apk update && apk upgrade

# Install MariaDB
RUN apk --no-cache add mariadb mariadb-client

# Create a directory for MariaDB data
RUN mkdir -p /var/lib/mysql

# Initialize the system tables
RUN mysql_install_db --user=mysql --ldata=/var/lib/mysql

# Copy the custom MariaDB configuration file
COPY conf/my.cnf /etc/mysql/my.cnf

# Expose the default MariaDB port
EXPOSE 3306

# Start MariaDB when the container starts
CMD ["mysqld", "--user=mysql"]