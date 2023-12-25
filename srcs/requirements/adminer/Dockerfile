FROM alpine:3.18

RUN apk update && apk upgrade && \
    apk add --no-cache \
        php \
        curl && \
    curl -o adminer.php https://www.adminer.org/latest.php

EXPOSE 8080

ENTRYPOINT ["php", "-S"]
CMD ["localhost:8080"]