FROM alpine:3.18

ARG FTP_USER
ARG FTP_PASSWORD

# Package installation
RUN apk update && apk upgrade && \
    apk add --no-cache vsftpd curl

COPY ./tools/*.sh /usr/local/bin/

# Set up FTP user and password
RUN chmod +x /usr/local/bin/*.sh && \
    mkdir -p /var/www/html && \
    adduser -h /var/www/html -s /sbin/nologin -D ${FTP_USER} && \
    echo "${FTP_USER}:${FTP_PASSWORD}" | chpasswd && \
    chown -R ${FTP_USER}:${FTP_USER} /var/www/html

# Add vsftpd configuration
COPY ./conf/vsftpd.conf /etc/vsftpd/vsftpd.conf

EXPOSE 21 30000-30010

ENTRYPOINT ["/usr/local/bin/vsftpd_entrypoint.sh"]