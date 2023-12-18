#!/bin/sh

CURRENT_DIR="$(cd "$(dirname "$0")" && pwd)"

$CURRENT_DIR/ssl.sh mywebsite.com

nginx -g "daemon off;"