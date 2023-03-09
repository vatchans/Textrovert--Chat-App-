const mongoose = require("mongoose");
const LastseenSchema=new mongoose.Schema(

    {
        userID:{type:String},
        lastseen:{
            type:String,default:Date
         }
    },
   
)
const Onlinestatus=mongoose.model("Offline-users",LastseenSchema)
module.exports={Onlinestatus}