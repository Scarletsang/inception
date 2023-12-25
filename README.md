# Inception

A Docker networks of web services inside VirtualBox.

Debian 12.4 is set up inside VirtualBox. This script ([link](./docs/setup.sh)) is then run by the root user to install docker within the virtual machine. Then within the directory `~/inception`, the user (not root) will run `make` that spins up a docker networks with the following services:

1. nginx that handles all the https traffic
2. A wordpress website (avaliable at https://htsang.42.de)
3. A sftp sever that enable direct access to wordpress' static files
4. Mariadb that stores the data from wordpress
5. Adminer that provides user interface to manipulate the mariadb
6. Redis as an object cache for the wordpress website
7. A dynamic website (avaliable at https://badidea.org)
8. A static website (avaliable at https://read-me-from-middle.com)
