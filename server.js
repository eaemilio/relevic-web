const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const app = express();

const key = fs.readFileSync(__dirname + '/ssl/private.pem');
const cert = fs.readFileSync(__dirname + '/ssl/public.pem');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

https.createServer({
  key,
  cert,
}, app).listen(443);