#!/bin/sh

echo "Install Nodejs and MongoDB" 
sudo apt-get install nodejs -y
sudo apt-get install mongodb -y
echo "Starting Server"
node web/app.js
echo "Server Started"