const mongoose = require('mongoose');
const Shcema=mongoose.Schema;


//create ninga schema on module 
const NingaSchema = new Shcema({
    name:{
        type: String,
        required:[true,"parameter name is required"],
    },
    rank:{
        type: String,
        // required:[true,"parameter name is required"],
    },
    available:{
        type: Boolean,
        default:false,
        // required:[true,"parameter name is required"],
    },
    // add in geo location
});


// create module 

const Ninga = mongoose.model("ninja",NingaSchema);     // model('ninja') will create collection in database with name ninja

module.exports=Ninga;
