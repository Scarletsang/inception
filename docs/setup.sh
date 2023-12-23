#!/bin/bash

# Give sudo access to htsang
usermod -aG sudo htsang
usermod -aG docker htsang

# Install docker
cd /usr/local/bin
echo <<'EOF' > docker_install.sh
#!/bin/bash

# Add Docker's official GPG key:
apt-get update
apt-get install ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update

apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
EOF
chmod +x docker_install.sh
./docker_install.sh
# Install make
apt-get install -y make

# Configure test domain names
cat <<'EOF' >> /etc/hosts
127.0.2.1   htsang.42.de
127.0.2.1   badidea.dev
127.0.2.1   read-me-from-middle.com
EOF

cd /home/htsang
mkdir -p /home/htsang/data/wordpress /home/htsang/data/mariadb
git clone https://github.com/Scarletsang/inception.git && cd inception

echo <<'EOF' > srcs/.env
# domain names
WORDPRESS_DOMAIN_NAME=htsang.42.de
MYWEBSITE_DOMAIN_NAME=badidea.dev
READ_ME_FROM_MIDDLE_DOMAIN_NAME=read-me-from-middle.com

# wordpress database settings
WP_DB_NAME=wordpress
WP_DB_USER=wordpress
WP_DB_PASSWORD=mypass
WP_DB_ROOT_PASSWORD=mypass

REDIS_PASSWORD=mypass

# wordpress settings
WP_URL=https://htsang.42.de
WP_TITLE=My Wordpress Site
WP_ADMIN_USER=htsang
WP_ADMIN_PASSWORD=mypass
WP_ADMIN_EMAIL=htsang@htsang.42.de
EOF

make