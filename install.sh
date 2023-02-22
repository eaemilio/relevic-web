#!/bin/sh
echo "[1/4] - Installing Node and Nginx..."
sudo apt update
sudo apt install nodejs
sudo apt install nodejs
sudo apt-get install nginx python3-certbot-nginx -y
echo "[2/4] - Installing dependencies..."
npm install -f
echo "[3/4] - Configurin Nginx..."
sudo mkdir /var/www/html/react
sudo cp -r /home/ubuntu/relevic-web/build/* /var/www/html/react
sudo chown -R www-data:www-data /var/www/html/react
sudo touch /etc/nginx/conf.d/react.conf
echo "server {listen 80;listen [::]:80;root /var/www/html/react/;index index.html index.htm;server_name ec2-174-129-182-16.compute-1.amazonaws.com;location / {try_files $uri $uri/ =404;}}" | sudo tee /etc/nginx/conf.d/react.conf
echo "####"
echo "#### IMPORTANT: Replace server_name in /etc/nginx/conf.d/react.conf"
echo "####"
echo "[4/4] - Testing Nginx configuration..."
sudo nginx -t
sudo systemctl restart nginx
echo "Done."