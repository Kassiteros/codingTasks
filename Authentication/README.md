<h6>05/06/2024</h6>
[Bootcamp Portfolio Results](https://www.hyperiondev.com/portfolio/AH24020013978/)

# T25 - Build Your Brand: GitHub

## Authentication with JWT

<a name="table-of-contents"></a>
## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Demonstration](#demonstration)
- [Summary](#summary)
- [Credits](#credits)



## Introduction
[Back to Table of Contents](#table-of-contents)

This Bootcamp task was designed to build our understanding of the Java Web Token (JWT) and how to create, issue and use a JWT for access to a server and to specific server resources.

It is a short piece of code but I hope it demonstrates some good coding principles and also shows some of my “learning curve” which I’m happy to share ;-) ! I did work as a programmer early on in my IT career and enjoyed it and felt I had a good “instinct” for a simple solution and a readable, well commented piece of code. It is nice now, after a long foray in IT management, to step back into a technical role and get “down and dirty” with a powerful language with such wide scope, frontend to backend taking in MongoDB on its way ;-) 

Please do examine the code and if you want to run it then there are clear instructions below. The installation instructions will explain how to create the components you need. You will of course require some disk space to download the files in this repository and also need space for a backend Express server and the (large) node_modules folder it requires and which the installation instructions will help you to create. You will also need the Postman app. If you don’t have it already, it is a useful utility you can download from [HERE](https://www.postman.com/jp/downloads/) !


## Installation
[Back to Table of Contents](#table-of-contents)

To begin with, we will download the code files we need and then create a backend Express server on which this code will run:

1. Open a command editor (cmd) and create a local folder (mkdir) on your local drive named AuthenticationJWT

2. Navigate to the newly created folder with this command: **cd AuthenticationJWT**

3. Download all the files in this repository, /codingTasks/Authentication, to the folder you just created **AuthenticationJWT**. You do not need to copy README.md !

4. To install the Express server, this will create the node_modules folder, type the following command: **npm install express body-parser**

5. To start the server, type the following command: **npm run start** 

If your server has started successfully you should see the following message in your command shell: **_Now listening at http://localhost:8001_**



## Demonstration
[Back to Table of Contents](#table-of-contents)

In this section we use our code to help us create a JWT token and then illustrate how we use this token to access a server and server resources. 

The first step will be to run through the process of requesting the creation of a JWT token. We will then use that token to access the backend server we have created. Finally, we will use the token to access a resource on the server.

All of this functionality is made available in index.js. A server would normally store usernames and passwords for verification. If you examine the code you can see the “data store” has been simulated with an array. Crucially, this array also holds each user’s “secret”, which is used for signing a token which ensures the token has not been tampered with on its journey from frontend to backend server and is also used to verify a JWT signature.

We will simulate the frontend server requests being made to the backend by using Postman. Having downloaded and installed Postman, start it now in preparation.

Remember, we have already created and started our backend server and it is “listening” on port 8001, http://localhost:8001, so this will help us define the base of our URL to Postman.

We have two users defined, each with their own password and secret which you will see in the array which holds them in server.js. The users are, just for clarity, named “**user**” and “**admin**” ;-) 

Let’s begin by creating a JWT token for each of our users:

1. In Postman create a POST request to http://localhost:8001/login with the following body. Be sure to include the header Content-Type: application/json to describe the body’s content type accurately. Have a look at the image below for clarification:

```json
{
    "username": "user",
    "password": "password_user",
    "authorization": "false"
}
```

<img src="/Images/image1.png" width="100%" alt="Image1">

2. Take a copy of the token produced by the POST request.


```json
"token": "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidXNlciIsInBhc3N3b3JkIjoicGFzc3dvcmRfdXNlciIsImF1dGhvcml6YXRpb24iOmZhbHNlfQ.5H89Sc73mwZhZ-u0XnJIDV5WzGOHIsqz_rbvnB-MYa8"
```

3. Repeat these steps for our user named “admin”. Use a similar POST operation in Postman but change the body to the following ensuring you keep it typed as “raw” and of type “JSON”. Have a look at the image below for clarification:

```json
{
   "username": "admin",
   "password": "password_admin",
   "authorization": "true"
}
```

<img src="/Images/image2.png" width="100%" alt="Image1">

4. Once again take a copy of the token produced:


```json
"token": "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6InBhc3N3b3JkX2FkbWluIiwiYXV0aG9yaXphdGlvbiI6dHJ1ZX0.RcbRi4g6EKrnqJiYJ9c59VlAJzSKNksApx1930JlfkA"
```

Now each user has a generated JWT token we can verify them to see if they will give each user access to the backend server:

1. In postman create the following GET request but ensure it is made to the URL /resource at localhost like this, http://localhost:8001/resource. Click on Authorization under the URL string, and enter the token produced for user “admin”. Have a look at the image below for clarification:

<img src="/Images/image3.png" width="100%" alt="Image1">

2. If successful, authorised to the server by the token that has been passed. you should see the message displayed below “**Hello, admin ! Your JSON Web Token has been verified.**” Notice our checking code has extracted the user name from the payload.

3. Try changing the first character in the token. You should see that you have invalidated it and the postman GET request should respond with ““err”: “Bad JWT!”

4. Try the token produced for “user” also to see this works, gives access, and our javascript extracts the correct username from the token.

Finally let’s test user access to a theoretical “server resource”.

1. Make a GET request for the user “admin” to the following URL in Postman, http://localhost:8001/admin_resource (make sure that you have returned your token to its correct state if you tested your access by corrupting it) ! Have a look at the image below for clarification:

<img src="/Images/image4.png" width="100%" alt="Image1">

2. You should see the message: “msg”: “Success ! You have full Admin rights to this resource !”

3. Now make the same GET request using the JWT for “user”. Have a look at the image below for clarification:

<img src="/Images/image5.png" width="100%" alt="Image1">

4. You will see the following message: “msg”: “Your JWT was verified, but you are not an admin user !”


## Summary
[Back to Table of Contents](#table-of-contents)

You can see that from the following endpoints:

   /login – we checked a POSTed username and password, and produces a JWT.
   
   /resource – checked the JWT in the auth header and displayed a message with the username.
   
   /admin_resource – checked the JWT, and displayed a message if the token was verified and the token holder is an admin.


## Credits
[Back to Table of Contents](#table-of-contents)

This project was created by Alex Haidar in May 2024 as part of the HyperionDev / CoGrammar bootcamp.

Thanks are extended to:

- [HyperionDev](https://www.hyperiondev.com/)
- [CoGrammar](https://skills.cogrammar.com/)

These online resources underpin this this coding task:

- JSON Web Tokens - https://jwt.io/
- JSON Web Token Introduction - https://jwt.io/introduction/
- Online JWT Decoder - https://webtoolseasy.com/tools/jwt-decoder
- Get Started with JSON Web Tokens - https://auth0.com/learn/json-web-tokens

