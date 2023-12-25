#!/bin/sh

if [[ -z "$PASV_ADDRESS" ]]; then
    export PASV_ADDRESS=$(curl -s -4 --connect-timeout 5 --max-time 10 ifconfig.co)
fi

vsftpd /etc/vsftpd/vsftpd.conf "$@"