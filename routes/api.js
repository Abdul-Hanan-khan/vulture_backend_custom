const express = require("express");

const router=express.Router();

const Ninga =require('../models/ninja');
// get a list of ningas 

router.get('/ninjas',function(req,res){

    res.send({type:"GET"})
});


router.post('/ninjas',function(req,res){

  Ninga.create(req.body).then(function(ninja){
    res.send(ninja);
  });
});

router.put('/ninjas/:id',function(req,res){

    res.send({type:"PUT"})
});

router.delete('/ninjas/:id',function(req,res){
 
  try {
    res.send({type:"DELETE"})
  } catch (error) {
    console.log(error)
    res.send({message:'something went wrong'})
  }
});




module.exports =router;