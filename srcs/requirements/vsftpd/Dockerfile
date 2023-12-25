FROM alpine:3.18

ARG FTP_USER
ARG FTP_PASSWORD

RUN apk update && apk upgrade && \
    apk add --no-cache vsftpd && \
    adduser -h /var/www/html -s /sbin/nologin -D ${FTP_USER} && \
    echo "${FTP_USER}:${FTP_PASSWORD}" | chpasswd && \
    chown -R ${FTP_USER}:${FTP_USER} /var/www/html

COPY ./conf/vsftpd.conf /etc/vsftpd/vsftpd.conf

EXPOSE 21

CMD ["vsftpd", "/etc/vsftpd/vsftpd.conf"]