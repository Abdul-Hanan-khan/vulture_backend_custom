const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv/config");





router.get('/getAllData', verifyToken, (req, res) => {
    console.log(process.env.SECRETE_KEY);

    jwt.verify(req.token, process.env.SECRETE_KEY, (err, authData) => {
        if (err) {
            //authorization failed
            res.status(403).json({
                "status": false,
                "msg": "Authorization failed ",
                "data": []
              });
        } else {
            res.json({
                "status": true,
                "msg": "Authorized by Admin",
                "data": []
              });
        }
    });
});

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // console.log(req.token);
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];

        // Set the token
        req.token = bearerToken;
        // console.log(req.token);
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}


function showResponse(parameter1, parameter2, parameter3) {
    
    // code to be executed
}

module.exports = router;