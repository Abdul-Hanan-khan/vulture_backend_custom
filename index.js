
const express = require("express");
const bodyParser= require('body-parser');
var multer = require('multer');
const mongoose =require('mongoose');
require("dotenv/config");
const nija = require ("./models/ninja");

var upload = multer();

const app = express();
//   app.use(express.json());
app.use(bodyParser.json());

app.use('/api',require('./routes/api'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true })); 


mongoose
  .connect(process.env.DB)
  .then(() => {

    console.log("Database Connection");
  })
  .catch((err) => {
    console.log("DB Not Connected");
  });

  mongoose.Promise=global.Promise;
  

app.use(upload.array()); 
app.use(express.static('public'));
         

app.listen(process.env.port || 4000,function(){                 // setup listeners for requests

    console.log("express setup successful and is Now listening for request");

     


});


