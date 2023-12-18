FROM alpine:latest

RUN apk update && apk upgrade && \
    apk add nginx openssl
RUN ["mkdir", "-p", "/etc/nginx/ssl"]

# Add adminstration scripts
COPY ./tools/*.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/*.sh

# Add nginx configuration
COPY ./conf/nginx.conf /etc/nginx/nginx.conf
COPY ./conf/conf.d/ /etc/nginx/conf.d/

EXPOSE 443

CMD /usr/local/bin/start.sh