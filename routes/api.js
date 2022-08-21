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
  Ninga.findByIdAndRemove({ _id: req.params.id }).then(function (ningaaa) {
    res.json({
      "status": true,
      'data':ningaaa

    });
  });
  // console.log(req.params.id);

});




module.exports = router;