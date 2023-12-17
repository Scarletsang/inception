# Inception

This is a project to set up a Docker networks of web services.

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
