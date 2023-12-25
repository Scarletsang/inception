FROM alpine:3.18

ARG FTP_USER
ARG FTP_PASSWORD

RUN apk update && apk upgrade && \
    apk add --no-cache vsftpd curl && \
    mkdir -p /var/www/html && \
    adduser -h /var/www/html -s /sbin/nologin -D ${FTP_USER} && \
    echo "${FTP_USER}:${FTP_PASSWORD}" | chpasswd && \
    chown -R ${FTP_USER}:${FTP_USER} /var/www/html

COPY ./conf/vsftpd.conf /etc/vsftpd/vsftpd.conf
COPY ./tools/*.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/*.sh

EXPOSE 21 30000-30010

ENTRYPOINT ["/usr/local/bin/vsftpd_entrypoint.sh"]