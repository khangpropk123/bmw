#!/bin/sh

echo "Install Nodejs and MongoDB" 
sudo apt-get install nodejs -y
sudo apt-get install mongodb -y
sudo apt-get install npm -y
echo "Starting Server"
cd web && npm i
node app.js
echo "Server Started"