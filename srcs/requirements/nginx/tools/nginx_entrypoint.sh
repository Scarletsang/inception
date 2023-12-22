#!/bin/sh

CURRENT_DIR="$(cd "$(dirname "$0")" && pwd)"

$CURRENT_DIR/ssl.sh mywebsite.com
$CURRENT_DIR/ssl.sh wordpress

CONFS=/etc/nginx/conf.d/*.conf

for f in $CONFS
do
    echo "Processing $f file..."
    envsubst "$(env | sed -e 's/=.*//' -e 's/^/\$/g')" < "$f" > "$f.tmp" && mv "$f.tmp" "$f"
done

nginx -g "daemon off;"