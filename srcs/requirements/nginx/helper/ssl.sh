PRIVATE_KEY=/etc/nginx/ssl/${1}_private.key
CERTIFICATE=/etc/nginx/ssl/${1}_certificate.crt

if [ -f "$PRIVATE_KEY" ] && [ -f "$CERTIFICATE" ]; then
    echo "SSL certificate already exists"
    exit 0
fi

# Generate a new private key that does not need a password,
# and a certificate for the domain name.
openssl req -x509 \
    -newkey rsa:4096 -sha256 -days 3650 -nodes \
    -keyout $PRIVATE_KEY \
    -out $CERTIFICATE  \
    -subj "/C=DE/ST=BW/L=Heilbronn/O=42Heilbronn/CN=$1"