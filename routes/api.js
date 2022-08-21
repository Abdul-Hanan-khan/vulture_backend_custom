const express = require("express");

const router = express.Router();

const Ninga = require('../models/ninja');
// get a list of ningas 

router.get('/ninjas', function (req, res, next) {

  res.send({ type: "GET" })
});












router.post('/ninjas', function (req, res, next) {

  Ninga.create(req.body).then(function (ninja) {
    res.json({
      "status": true,
      "data": ninja
    });
  }).catch(next);
});












router.put('/ninjas/:id', function (req, res, next) {

  res.send({ type: "PUT" })
});

router.delete('/ninjas/:id', function (req, res, next) {

  try {
    res.send({ type: "DELETE" })
  } catch (error) {
    console.log(error)
    res.send({ message: 'something went wrong' })
  }
});




module.exports = router;