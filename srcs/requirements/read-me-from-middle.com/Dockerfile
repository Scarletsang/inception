FROM alpine:3

RUN apk update && apk upgrade && \
    apk add --no-cache git thttpd && \
    git clone https://gitlab.com/scaletsang/read-me-from-middle.git \
        /var/www/html/read-me-from-middle.com && \
    touch /var/log/thttpd/thttpd.log
COPY ./conf/thttpd.conf /etc/thttpd.conf
WORKDIR /var/www/html/read-me-from-middle.com
ENTRYPOINT ["thttpd", "-D"]