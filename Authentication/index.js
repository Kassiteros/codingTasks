const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 8001;

// Allows us to parse the body of a request
app.use(bodyParser.json())

// Declare a standard and an "Admin" user, and their passwords and secrets. We are "mocking up"
// database storage we would normally check. 
const users = [
    { username: 'user', password: 'password_user', secret: 'secret_user', isAdmin: false },
    { username: 'admin', password: 'password_admin', secret: 'secret_admin', isAdmin: true },
];



//  Check a POSTed username and password, and produce a JWT.
app.post('/login', (req, res) => {

    // Extract and store from req.body, username and password sent on POST by the user.
    const usr = req.body.username
    const pwd = req.body.password

    // Search into the array of users to see if username and password exist
    const user = users.find(u => u.username === usr && u.password === pwd);

    if (user) {
        // User found, create token by concatenating encoded header + encoded payload + secret
        payload = {
            'name': usr,
            'password': pwd,

            // Add named user's authorization status,from the user array, to JWT payload.
            // We will use this to check resource access later !
            'authorization' : user.isAdmin
        }
        // Build the token and encrypt it
        const token = jwt.sign(JSON.stringify(payload), user.secret,
        { algorithm: 'HS256' })
        // Return the created token.
        res.send({ 'token': token })
    } else {
        // User not found or incorrect credentials
        res.status(403).send({ 'err': 'User not found. Try again !' })
    }
})


// Check the JWT in the auth header and display a message with the username.
app.get('/resource', (req, res) => {

    // Some confusion for me here initially. This returned value 'authorization' is the 
    // Authorization header from the HTTP request to extract the JWT (JSON Web Token).
    // It is NOT any kind of JWT payload token ;-)

    // When you comment out "const auth = req.headers['authorization']"", the function fails
    // because the code no longer extracts the JWT from the request. We rely on "auth" to 
    // contain the Authorization header value, it fails if it is undefined.
    
    const auth = req.headers['authorization'];

    // Split the string by space and take the second part, which is the token
    const token = auth.split(' ')[1];

    try {

        // Decode the token so we can extract the user name. We will need it to
        // derive the secret we will verify the token with.
        const decoded = jwt.decode(token);
        const usr = decoded.name;

        // Search into the array of users to find the user
        const user = users.find(u => u.username === usr);

        // Verify the token using the user's secret
        jwt.verify(token, user.secret);

        res.send({
            'msg': `Hello, ${decoded.name} ! Your JSON Web Token has been verified.`
        });
    } catch (err) {
        res.status(401).send({ 'err': 'Bad JWT!' });
    }
});



// Check the JWT, and display a message if the token is verified and the token holder is an admin.
app.get('/admin_resource', (req, res) => {

    // Read HTTP authorization header value
    const token = req.headers['authorization'].split(' ')[1]

    // We have to go back to app.post('/login') and add an authorization "token" to the payload
    // used to create user's JWT. When we receive the JWT here we can look inside it for 
    // "authorization" and see how it is set. If it matches users' authorization "level" set in
    // the "users" array, (our database effectively), we will allow access !

    try {

        // Decode the token so we can extract the user name. We will need it to derive
        // the secret we will verify the token with. Var "decoded" already declared !
        decoded = jwt.decode(token);
        const usr = decoded.name;
  
        // Get users' claimed authorization (boolean) from the payload
        const auth = decoded.authorization;

        // Search into the array of users to find the user
        const user = users.find(u => u.username === usr);

        // Verify the token using the user's secret
        jwt.verify(token, user.secret);


        // Good to go, valid token but let's check admin level in token payload with user's 
        // given, "real", admin level in stored "users" array to ensure they match.
        if (auth && user.isAdmin) {
            res.send({ 'msg': 'Success ! You have full Admin rights to this resource !' })
        } else {
            res.status(403).send(
                { 'msg': 'Your JWT was verified, but you are not an admin user !' })
        }
        } catch (e) {
            res.sendStatus(401)
    }
})



// Start the server
app.listen(PORT, () => console.log(
`Now listening at http://localhost:${PORT}`))
