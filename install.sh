#!/bin/sh
echo "[1/10] - Installing node and npm..."
apt-get install nodejs -y && npm install npm@latest -g
echo "[2/10] - Installing dependencies..."
npm install -f
echo "[3/10] - Building solution..."
npm run build