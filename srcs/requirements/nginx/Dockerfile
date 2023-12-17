FROM alpine:latest

RUN ["apk", "add", "--update", "nginx", "openssl"]

COPY ./conf/mywebsite.conf /etc/nginx/http.d/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
