## Docker

This is an old article that I wrote about Docker: [article](./docs/your_first_dockerfile.md). It explained how Docker works, what is Dockerfile, docker image and docker containers.

A Docker network is used when I have different programs running in different containers and they need to talk to each other. Therefore, docker network is used often to test or even deploy web applications. A Docker compose file is used to define all the settings for each containers inside the network.

To get a feel for using using Docker and Docker compose, I recommand to just briefly follow through this [guide](https://sabe.io/tutorials/serve-static-files-nginx-docker) once.

### Dockerfile

### RUN vs. CMD

Most of the instructions in Dockerfile is executed to build a Docker image, which is a compressed archive of libraries and directories that becomes a Docker container upon execution. However CMD is executed when the container is created from an image. This is why scripts executed using RUN do not have access to the environmental variables defined in the .env file, while script executed using CMD have access to environmental variables. If one intended to pass particular environmental variables from .env to the buid process of a Docker image, one have to use the ARG instruction.

### CMD vs. ENTRYPOINT



### Optimization

[Best practice](https://docs.docker.com/build/cache/)

## Mariadb

[Remote access for Mariadb](https://mariadb.com/kb/en/configuring-mariadb-for-remote-client-access/)

- network interface
- loopback network

## Wordpress

[Wordpress cli](https://wp-cli.org/)

[Installing wordpress from wordpress cli](https://make.wordpress.org/cli/handbook/how-to/how-to-install/)

## NGINX

Nginx is a reversed proxy that sits in front of multiple backend servers, any incoming connections will first send to the reversed proxy server, and it will redirect the packets to and from the corresponding backenbd servers.

[Reversed and forward proxy server explained](https://www.cloudflare.com/en-gb/learning/cdn/glossary/reverse-proxy/)

[Configuring HTTPS servers in nginx](https://nginx.org/en/docs/http/configuring_https_servers.html)

[nginx server blocks](https://nginx.org/en/docs/http/ngx_http_core_module.html#server)

[nginx proxy_pass](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass)

### SSL/TLS

SSL/TLS is a protocol to secure HTTP connections. The protocol is https. 

[How does SSL secures HTTP connections?](https://www.youtube.com/watch?v=33VYnE7Bzpk)

[More details about the TLS](https://www.cloudflare.com/en-gb/learning/ssl/how-does-ssl-work/)

[SSL formats](https://serverfault.com/questions/9708/what-is-a-pem-file-and-how-does-it-differ-from-other-openssl-generated-key-file)
