#!/bin/sh
echo "[1/10] - Installing Nginx..."
apt-get install nginx python3-certbot-nginx -y
echo "[2/10] - Installing dependencies..."
npm install -f
echo "[3/10] - Building solution..."
npm run build