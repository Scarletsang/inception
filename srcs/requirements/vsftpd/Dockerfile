FROM alpine:3.18

ARG FTP_USER
ARG FTP_PASSWORD

RUN apk update && apk upgrade && \
    apk add --no-cache vsftpd && \
    adduser -h /var/html/www -s /sbin/nologin -D ${FTP_USER} && \
    echo "${FTP_USER}:${FTP_PASSWORD}" | chpasswd

EXPOSE 21

CMD ["vsftpd", "/etc/vsftpd/vsftpd.conf"]