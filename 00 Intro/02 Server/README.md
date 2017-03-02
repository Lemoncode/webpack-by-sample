# 02 Server

In this sample we are going to enter into "dev mode". Working with files service
is not ideal when you are developing a web application, we will learn how to launch
a lite web server, how deploy our bundle into a dist folder (including index.html)
, how to debug our es6 code directly into the browser debugger and minify
our bundle.js.

We will start from sample _00 Intro/01 Import_, install `webpack-dev-server`, setup our config
to deploy on config folder and support maps (debug), then we will minify
our bundle.js file via webpack cli params.

Summary steps:
 - Install via npm webpack-dev-server.
 - Execute webpack-dev-server with live reload.
 - Add start command to package.json.
