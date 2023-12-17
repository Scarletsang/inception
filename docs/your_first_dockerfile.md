# What is Docker?

A normal virtual machine like Virtual Box virtualizes the whole operating system. But sometimes, you just want to run a small thing inside another environment and you don't need a whole operating system virtualized. Here is where Docker shines, it virtualizes only the part that you need and so setting up a Docker containter is not only faster, but also more customizable. Customizable how? You get to say what exactly do you want to put in your container, there is no hidden dependencies! Follow 3 steps in this guide and you sudden have the power of god - to create new world.

## STEP 1: Dockerfile

Imagine you have a blank container, now you are given a paper to write what do you want to do with it. That paper is a Dockerfile. There is a lot of different Docker command you can use, but now, you just need five:

In the end, you will have a Dockerfile like this, it is for running push swap:

```Dockerfile
FROM debian:latest
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install git-core gcc cmake make -y
RUN git clone https://github.com/o-reo/push_swap_visualizer.git visualizer
WORKDIR /visualizer
RUN mkdir build && cd build
RUN cmake ..
RUN make .
CMD [ "./bin/visualizer" ]
```

### FROM

```Dockerfile
FROM debian:latest
```

Just like a normal computer, you need to start with a empty but decently equipped environment. So you simply grab an environment image **FROM** the internet that describes the basic setup you want! This is a called a "base image". I suggest you to go to Dockerhub to find a base image that you need. But for starter, let's go with something simple, a basic debian environment.

### RUN

```Dockerfile
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install git-core gcc cmake make -y
RUN git clone https://github.com/o-reo/push_swap_visualizer.git visualizer
```

It literally runs commands inside the docker container.

### WORKDIR

```Dockerfile
WORKDIR /visualizer
```

It means the docker commands that comes after this line will be run inside this directory in the container.

### COPY

```Dockerfile
COPY a_local_file /a_directory_in_container
```

We did not use the COPY command in our example, but this is if not, one of the most essential command to know. During building an image, the COPY command grabs certain files/folders from your local environment to add it to the image so you will have access to it inside the Docker container once it is up.

### CMD

```Dockerfile
CMD [ "./bin/visualizer" ]
# Or
CMD [ "./bin/another_executable", "arg1", "arg2" ]
```

Most of the Docker commands are run during building a Docker Image, but this command is executed when Docker container starts. **CMD** takes a list which contains an executable to be run when the container starts. Arguments of the executable can be provided.

Now you have a Docker image to virtualize the push swap virtualizer!

## Step 2: Docker Image

Just like Makefile can produce object files, Dockerfile produces Docker Image. Compiling a Dockerfile means running all the commands inside the Dockerfile, downloading all needed dependencies, and results in an image that can be expanded into a Docker Container. Imagine someone captures the moment when a world is about to start, now you are holding a world that has yet to be started.

The following code reads as: Hey **docker**! Please **build** an image from the **current directory** and **tag/name** the image as **wonderful_world_image**!

```bash
docker build . -t wonderful_world_image
```

## Step 3: Docker Container

The following code reads as: Heyyyyy **docker**! Can you **run** the image named **wonderful_world_image**, and expand it to a container **named** **wonderful_world**?

```bash
docker run -itd --name=wonderful_world wonderful_world_image
```

*Side note: the -d option runs the container in the background, -t attaches a terminal to the container, -i allows one to write to the terminal even if the container is running at the background.*

### 1/3: Entering the container

The following code reads as: Sup **docker**! Can you **execute** **bash** in the container named **wonderful_world**?

```bash
docker exec -it wonderful_world bash
```

Then you will be having full access to the container using bash.

### 2/3: Interacting with the container from outside

But you can also just run a command without entering it:

```bash
docker exec -it wonderful_world ls
```

It just run the ls command inside the container and print the result to you. And you are still in the terminal outside of the container.

Let's spices it up?

```bash
docker exec -it wonderful_world bash -c valgrind ft_printf.c
```

The command ran here is "bash -c valgrind ft_printf.c". Here "bash -c" gives context to the container to find the valgrind command, in other words, "bash -c" tells the container to look for the valgrind executable in /usr/bin inside the container. It is the same as writing the following:

```bash
docker exec -it wonderful_world /usr/bin/valgrind ft_printf.c
```

### 3/3: Restarting your container

Finally, sometimes when you see your container has been exited/paused, simply run:

```bash
docker start wonderful_world
docker unpause wonderful_world
```

If you are here, congrats, you have all the things you need to know about Docker! Go sleep, rest, take a piss and try it!

### If you can still keep up, I have one last trick to share

Normally container is a closed environment that does not have access to your local environment, so it can't access your computer files. However, sometimes you do want the container to see a part of our environment. You tell Docker to mount a folder to a container when you expand an Docker Image to a Docker Container.

Recap, this is what we had in the above:

```bash
docker run -itd --name=wonderful_world wonderful_world_image
```

To mount a folder, simply:

```bash
docker run -itd -v ./reality --name=wonderful_world wonderful_world_image
```

Now I have mount a folder named reality to the wonderful world that I create.