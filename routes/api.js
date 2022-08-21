const express = require("express");

const router = express.Router();

const Ninga = require('../models/ninja');
// get a list of ningas 

router.get('/ninjas', function (req, res, next) {

console.log(req.body['id']);

  if (req.body['id'] == null) {
    Ninga.find({}).then(function (ninjassss) {
      if (ninjassss == null) {
        res.json({
          "status": false,
          "msg": "no data found",
          "data": ninjassss
        });
      } else {
        res.json({
          "status": true,
          "msg": "fetched all ninjas",
          "data": ninjassss

        });
      }

    });
  } else {
    Ninga.findOne({ _id: req.body['id'] }).then(function (ninjaById) {
      if (ninjaById == null) {
        res.json({
          "status": false,
          "msg": "no ninga found with specefied id",
          "data": ninjaById
        });
      } else {
        res.json({
          "status": true,
          "msg": "fetched all ninjas",
          "data": ninjaById
        });
      }
    });
  }



});

router.post('/ninjas', function (req, res, next) {

  Ninga.create(req.body).then(function (ninja) {
    res.json({
      "status": true,
      "msg": "ninga created successfully",
      "data": ninja
    });
  }).catch(next);
});



router.put('/ninjas/:id', function (req, res, next) {
  Ninga.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (ninjaaaaa) {

    Ninga.findOne({ _id: req.params.id }).then(function (ninjaUpdated) {
      res.json({
        "status": true,
        "msg": "ninga updated successfully",
        "data": ninjaUpdated
      })
    });
  });



  // res.send({ type: "PUT" })
});

















router.delete('/ninjas/:id', function (req, res, next) {
  Ninga.findByIdAndRemove({ _id: req.params.id }).then(function (ningaaa) {

    if (ningaaa == null) {
      res.json({
        "status": false,
        "msg": "failed to delete ninga",
        'data': ningaaa

      });
    } else {
      res.json({
        "status": true,
        "msg": "ninga deleted successfully",
        'data': ningaaa

      });
    }


  });
  // console.log(req.params.id);

});




module.exports = router;