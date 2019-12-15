@ECHO OFF

:: This CMD script start webserver

TITLE Node Server Starting
ECHO Please check that you had installed Nodejs and MongoDB.
cd web & npm i
node app.js