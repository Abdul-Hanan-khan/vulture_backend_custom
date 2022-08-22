const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const jwt = req("jsonwebtoken");
const jwt = require("jsonwebtoken");
require("dotenv/config");


const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          "status": false,
          "message": "Mail exists already",
          "data": []
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {


            // jwt.sign


            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: req.body.password,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              phone: req.body.phone,
              age: req.body.age,
              city: req.body.city,
              address: req.body.address,
            });

            jwt.sign({ user }, process.env.SECRETE_KEY,(err, token) => {
              user.token = token;
            })
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(200).json({
                  "status": true,
                  "message": "User created",
                  "data": result
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  "status": false,
                  "message": err.message,
                  "data": []
                });
              });
          }
        });
      }
    });
});

router.post('/login', (req, res) => {
console.log(req.body['email']);
console.log(req.body['password']);

User.findOne({ email: req.body['email'] , password : req.body['password']}).then(function (foundUser) {
  if (foundUser == null) {
    res.json({
      "status": false,
      "msg": "no user found with specefied email ",
      "data": []
    });
  } else {
    res.json({
      "status": true,
      "msg": "User fetched successfull",
      "data": foundUser
    });
  }
});

});


router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
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


module.exports = router;
