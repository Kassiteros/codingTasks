<h6>05/06/2024</h6>

T25 - Build Your Brand: GitHub [Link to your GitHub profile](link here)
Authentication with JWT

Table of Contents

  Introduction
  Installation
  Running the Code
  Summary
  Credits


Introduction

This Bootcamp task was designed to build our understanding of the Java Web Token (JWT) and how to create, issue and use a JWT for access to a server and to specific server resources.

It is a short piece of code but I hope it demonstrates some good coding principles and also shows some of my “learning curve” which I’m happy to demonstrate. I did work as a programmer early on in my IT career and enjoyed it and felt I had a good “instinct” for a simple solution and a readable, well commented piece of code. It is nice now, after a long foray in IT management, to step back into a technical role and get “down and dirty” with a powerful language with such wide scope, frontend to backend taking in MongoDB on its way ;-)

Please do examine the code and if you want to run it then there are clear instructions below. The installation instructions will explain how to create the components you need. You will of course require some disk space to download the files in this repository and also need space for a backend Express server and the (large) node_modules folder it requires and which the installation instructions will help you to create. You will also need the Postman app. If you don’t have it already, it is a useful utility you can download from HERE !

Installation
To begin with, we will download the code files we need and then create a backend Express server on which they will run

Open a command editor (cmd) and create a local folder (mkdir) on your local drive named AuthenticationJWT

Navigate to the newly created folder with this command: cd AuthenticationJWT

To install the Express server, this will create the node_modules folder, type the following command: npm install express body-parser

To start the server, type the following command: npm run start

If your server has started successfully you should see the following message in your command shell: Now listening at http://localhost:8001

Running the Code
In this section we use our code to help us create a JWT token and then illustrate how we use this token to access a server and server resources.

The first step will be to run through the process of requesting the creation of a JWT token. We will then use that token to access the backend server we have created. Finally, we will use the token to access a resource on the server.

All of this functionality is made available in index.js. A server would normally store usernames and passwords for verification. If you examine the code you can see the “data store” has been simulated with an array. Crucially, this array also holds each user’s “secret”, which is used for signing a token which ensures the token has not been tampered with on its journey from frontend to backend server and is also used to verify a JWT signature.

We will simulate the frontend server requests being made to the backend by using Postman. Having downloaded and installed Postman, start it now in preparation.

Remember, we have already created and started our backend server and it is “listening” on port 8001, http://localhost:8001, so this will help us define the base of our URL to Postman.

We have two users defined, each with their own password and secret which you will see in the array which holds them in server.js. The users are, just for clarity, named “user” and “admin” ;-)

Let’s begin by creating a JWT token for each of our users:

In Postman create a POST request to http://localhost:8001/login with the following body. Be sure to include the header Content-Type: application/json to describe the body’s content type accurately. Have a look at the image below for clarification:

{
"username": "user",
   "password": "password_user",
   "authorization": "false"
}

Image 1 [Link to image1.jpg from /Images](link to image1.jpg from /Images)

Take a copy of the token produced by the PUT request.

"token": "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidXNlciIsInBhc3N3b3JkIjoicGFzc3dvcmRfdXNlciIsImF1dGhvcml6YXRpb2
