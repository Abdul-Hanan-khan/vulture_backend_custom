const express = require("express");

const router=express.Router();
// get a list of ningas 

router.get('/ninjas',function(req,res){

    res.send({type:"GET"})
});


router.post('/ninjas',function(req,res){

    console.log(req.body);

    res.json({
      data: req.body
    });
    // res.send(req.body);
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