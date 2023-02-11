const mongoose=require('mongoose')
const validator=require('validator')
const userSchema=new mongoose.Schema({
    Email:{type:String,required:true,validate:(value)=>validator.isEmail(value)},
    Username:{type:String,required:true},
    Password:{type:String,required:true},
    Mobile:{type:String,required:true,validate:(value)=>validator.isNumeric(value)&&value.length===10},
    isProfile_pic:{type:Boolean,default:false},
    Profile_pic:{type:String,default:''},
    CreatedAt:{type:Date,default:Date.now()}

},{
    versionkey:false
})
const userModel=mongoose.model('User',userSchema)
module.exports={userModel}