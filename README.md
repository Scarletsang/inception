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

Since this project is itself educational, so I might as well add a guide to the whole project below.

## Docker in a nutshell

Docker uses the host machine's kernal to handles all containers. Each container just need to care about that libraries and binaries needed for that system. Different linux distribution often provide a Docker image so that developer can easily add applications on top of the ready-made operating system. Developers therefore only need to care about the set up of their application in containers. Virtualizing a linux environment is handled by Docker, having the right directories and binaries for each operating systems is handled by the compiled base image hosted on DockerHub.

## Docker Image

A Docker image is a compressed archive of files and directories. It is a file system that is composed of layers, each layers described a logical group of files. A Dockerfile is a blueprint of a Docker image. After a Docker image is built, it will be executed and turned into a Docker container.

## Dockerfile

One should think of a Dockerfile as how the Docker image is actually layered, instead of a bash script with Dockerfile syntax.

### FROM

Beginning of a Dockerfile is often the `FROM` instruction that tells Docker which base image you want to built on top of. This contribute to all the layers your image starts from.

### COPY

This copies files from your host machine to your Docker image. This instruction will contribute to one layer of the Docker image.

### RUN

This runs a command or executable within your Docker image. This also contribute to one layer of the Docker image.

### CMD

This also runs a command but when the container is first started. This is not run during the build-time of a Docker image. This is also why scripts run using CMD can see environmental variables passed from the .env file, but not the script run using the RUN instruction. Environmental variables only exists when container spins up. This is the same with Docker volume, volumes are only attached when container spins up.

### ARG

If one needs variables during the build-time of a Docker image, one must explicit specify the name of the variable using the ARG instruction, and then pass the variable values through Docker CLI or docker-compose.yml.

## Docker Image cache

[Reference](https://docs.docker.com/build/cache/)
