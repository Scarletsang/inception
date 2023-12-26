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

Docker tries to cache all the layers you have built. E.g. You created an image with 5 layers. All layers are cached, so when nothing is changed, nothing is needed to rebuilt. Now you changed the 3rd layer, Docker will rebuilt the 3rd to 5th layers. Therefore it is always a good practice to put the layers that you will less likely to change first, then put the parts that need to change frequently at last. Layers that would not change much is usually package installation, user creation etc. Copying source codes, configuration files, compiling code etc. should be put at last. This is a quick example:

```Dockerfile
# 1. Import layers from a base image
FROM alpine:3.18

# 2. Copy files that is necessary ONLY for package installation
COPY package.json .

# 3. Package installation
RUN apt-get install nodejs npm && \
	npm install

# 4. Instructions after package installation, including
# - copying adminastration scripts
# - setting up users

# 5. Configuration files
COPY ./conf/*.conf /etc/

# 6. Instruction that runs when the container starts
ENTRYPOINT ["./app"]
CMD ["-p", "8080"]
```

Time is gold. Having a good order of the layers reduce time for image rebuilding. After this, then you can optimize for image size. The less layers an image have, the smaller the image is.

## Docker commands

Now you have a Dockerfile, then you need to know some Docker commands to turn it into Docker container.

### 1. Building an image

Build a Docker image from a Dockerfile found in the specified directory.

```bash
docker build /dir -t image_name
# Dockerfile in the current directory
docker build . -t image_name
```

### 2. Executes an Docker image into a Docker container

```bash
# The process of the container is now attached to your current shell.
# Once closed, your Docker container is also stopped.
docker run -it --name=container_name image_name
# Run the Docker cotnainer in the background
docker run -itd --name=container_name image_name
# Mounting a directory on the host machine to a directory in the container
docker run -itd -v /path/on/host:/app/data --name=container_name image_name
```

### 3. Execute a command within a Docker container

Note that the container has to be running.

```bash
docker exec -it container_name command
# This is very common when you want to 'go inside' the container
# If bash is not installed in the container, you have to run sh
docker exec -it container_name bash
```

### 4. Stop or pausing a container

```bash
docker stop container_name
docker start container_name

# Pause is freezing the state of the container
docker pause container_name
docker unpause container_name
```
