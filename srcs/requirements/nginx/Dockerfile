FROM alpine:latest

RUN ["apk", "add", "--update", "nginx", "openssl"]
RUN ["mkdir", "-p", "/etc/nginx/ssl"]

COPY ./helper/ssl.sh /usr/local/bin/
RUN ["chmod", "+x", "/usr/local/bin/ssl.sh"]
RUN /usr/local/bin/ssl.sh mywebsite.com

COPY ./conf/nginx.conf /etc/nginx/nginx.conf
COPY ./conf/conf.d/ /etc/nginx/conf.d/

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
