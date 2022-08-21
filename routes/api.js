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
      "msg":"ninga created successfully",
      "data": ninja
    });
  }).catch(next);
});



router.put('/ninjas/:id', function (req, res, next) {
  Ninga.findByIdAndUpdate({ _id: req.params.id},req.body).then(function(ninjaaaaa){

    Ninga.findOne({ _id: req.params.id}).then(function(ninjaUpdated){
      res.json({
        "status":true,
        "msg":"ninga updated successfully",
        "data":ninjaUpdated
      })
    });
  });



  // res.send({ type: "PUT" })
});

















router.delete('/ninjas/:id', function (req, res, next) {
  Ninga.findByIdAndRemove({ _id: req.params.id }).then(function (ningaaa) {

    if(ningaaa == null){
      res.json({
        "status": false,
        "msg":"failed to delete ninga",
        'data':ningaaa
  
      });
    }else{
      res.json({
        "status": true,
        "msg":"ninga deleted successfully",
        'data':ningaaa
  
      });
    }


  });
  // console.log(req.params.id);

});




module.exports = router;