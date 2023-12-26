FROM alpine:3.18

# Package installation
RUN apk update && apk upgrade && \
    apk add nginx openssl envsubst

# Add adminstration scripts
COPY ./tools/*.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/*.sh

# generate ssl certificates
RUN mkdir -p /etc/nginx/ssl && \
    /usr/local/bin/ssl.sh mywebsite.com && \
    /usr/local/bin/ssl.sh wordpress && \
    /usr/local/bin/ssl.sh read-me-from-middle.com

# Add nginx configuration
COPY ./conf/nginx.conf /etc/nginx/nginx.conf
COPY ./conf/conf.d/ /etc/nginx/conf.d/

EXPOSE 443

ENTRYPOINT ["/usr/local/bin/nginx_entrypoint.sh"]