
const express = require("express");
const bodyParser = require('body-parser');
var multer = require('multer');
const mongoose = require('mongoose');
require("dotenv/config");
// const nija = require("./models/ninja");

var upload = multer();

const app = express();
//   app.use(express.json());
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));
app.use('/api/user', require('./routes/user'));
app.use('/api/home',require('./routes/get_all_data'));

app.set('view engine', 'jade');
// error handling middleware
app.use(function (err, req, res, next) {
    // console.log( err)
    res.status(442).send({
        status: false,
        error: err.message
    });
});
app.use(bodyParser.urlencoded({ extended: true }));


mongoose
    .connect(process.env.CLUSTER_DB)
    .then(() => {

        console.log("Database Connected Successfully");
    })
    .catch((err) => {
        console.log("DB Not Connected");
    });

mongoose.Promise = global.Promise;


app.use(upload.array());
app.use(express.static('public'));


app.listen(process.env.PORT_NO || 4000, function () {                 // setup listeners for requests

    console.log("express setup successful and is Now listening for request");




});


