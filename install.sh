#!/bin/sh
echo "[1/4] - Installing Node and Nginx..."
sudo apt update
sudo apt install nodejs
sudo apt install nodejs
sudo apt-get install nginx python3-certbot-nginx -y
echo "[2/4] - Installing dependencies..."
npm install -f
echo "[3/4] - Configurin Nginx..."
sudo mkdir /var/www/html/relevic
sudo cp -r /home/ubuntu/relevic-web/build/* /var/www/html/relevic
sudo chown -R www-data:www-data /var/www/html/relevic
sudo touch /etc/nginx/sites-available/relevic
echo "server {listen 80;listen [::]:80;root /var/www/html/relevic;index index.html index.htm index.nginx-debian.html;server_name <domain_name> www.<domain_name>;location / {try_files $uri $uri/ =404;}}" | sudo tee /etc/nginx/sites-available/relevic
sudo ln -s /etc/nginx/sites-available/relevic /etc/nginx/sites-enabled/
sudo nano /etc/nginx/nginx.conf
echo "####"
echo "#### IMPORTANT: Replace server_name in /etc/nginx/conf.d/react.conf"
echo "####"
echo "[4/4] - Testing Nginx configuration..."
sudo nginx -t
sudo systemctl restart nginx
echo "Done."