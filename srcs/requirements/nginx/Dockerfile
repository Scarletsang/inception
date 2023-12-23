FROM alpine:3

RUN apk update && apk upgrade && \
    apk add nginx openssl envsubst
RUN ["mkdir", "-p", "/etc/nginx/ssl"]

# Add nginx configuration
COPY ./conf/nginx.conf /etc/nginx/nginx.conf
COPY ./conf/conf.d/ /etc/nginx/conf.d/

# Add adminstration scripts
COPY ./tools/*.sh /usr/local/bin/

# generate ssl certificates
RUN chmod +x /usr/local/bin/*.sh && \
    /usr/local/bin/ssl.sh mywebsite.com && \
    /usr/local/bin/ssl.sh wordpress && \
    /usr/local/bin/ssl.sh read-me-from-middle.com

EXPOSE 443

ENTRYPOINT ["/usr/local/bin/nginx_entrypoint.sh"]