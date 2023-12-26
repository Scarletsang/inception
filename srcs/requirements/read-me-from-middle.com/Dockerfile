FROM alpine:3.18

# Package installation
RUN apk update && apk upgrade && \
    apk add --no-cache git thttpd && \
    git clone https://gitlab.com/scaletsang/read-me-from-middle.git \
        /var/www/html/read-me-from-middle.com && \
    touch /var/log/thttpd/thttpd.log

WORKDIR /var/www/html/read-me-from-middle.com
ENTRYPOINT ["thttpd", "-D"]