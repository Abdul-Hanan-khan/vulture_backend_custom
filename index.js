
const express = require("express");
const bodyParser = require('body-parser');
const http = require('http')
var multer = require('multer');
const mongoose = require('mongoose');
require("dotenv/config");
const https = require('https');


var upload = multer();

const app = express();
//   app.use(express.json());
app.use(bodyParser.json());

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
    .connect(process.env.DB)
    .then(() => {

        console.log("Database Connected Successfully");
    })
    .catch((err) => {
        console.log("DB Not Connected");
    });

mongoose.Promise = global.Promise;


app.use(upload.array());
app.use(express.static('public'));


const port=process.env.port


const httpsServer = https.createServer(app);

// httpsServer.listen(443, () => {
//     console.log('HTTPS Server running on port 443');
// });

app.listen( 4000, function () {                 // setup listeners for requests
    console.log("express setup successful and is Now listening for request");
});


