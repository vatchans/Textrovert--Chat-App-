var express = require('express');
var router = express.Router();
// const app = require('../app');
const {dburl } =require('../dbconfig/DB')
const {userModel}=require('../dbconfig/Schema/UserSchema')
const{ Messagemodel}=require('../dbconfig/Schema/MessageSchema')
const {Onlinestatus}=require('../dbconfig/Schema/LastseenSchema')
const {generateEmail } = require('../dbconfig/utils/Email');
const { hashPassword, validate, Createtoken, Decodetoken, Tokenvalidate }=require('../dbconfig/Schema/brycrt')
const shortid=require('shortid')
const nodemailer =require('nodemailer');
const mongoose = require('mongoose');
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/Signup', async (req, res) => {
  try {
    let user = await userModel.findOne({ Email: req.body.Email })
    if (!user) {
      req.body.Password = await hashPassword(req.body.Password)
      let user = await userModel.create(req.body)
      res.status(201).send({msg:"User Registration Successfull",user}
      )
    }
    else {
      res.status(400).send(`User with ${req.body.Email} is Already exists`)
    }
  }
  catch (error) {
    res.status(500).send({ message: `Internal server error` })
  }
})
router.post('/Signin', async (req, res) => {
  try {
    let user = await userModel.findOne({ Email: req.body.Email })
    if (user) {
      if (await validate(req.body.Password, user.Password)) {
        let token = await Createtoken({
          _id: user._id,
          Username:user.Username,
          Profile_pic: user.Profile_pic,
          isProfile_pic: user.isProfile_pic,
        })
        // let decoded=Decodetoken(token)
        res.status(200).send({ message: "login Sucessfull",user})
        
      }
    
    else {
      res.status(400).send({message:"Incorrect password"})
    }}
    else{
           res.status(401).send({message:"Email id doesn't exist"})
    }
  }
  catch(error) {
    res.status(500).send({ message: "Internal server error", error })
  }
})
router.post('/reset-password', async (req, res) => {
  try {
    let existinguser = await userModel.findOne({ Email: req.body.Email })
    if (existinguser) {
      var auth = shortid.generate()
     
      let transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        secure: false,
        auth: {
          user: "vatchans@gmail.com",
          pass: "D2FDE1C28195576B0F29660C3D3D60467FBB",
        },
      });
      let info = await transporter.sendMail({
        from: 'vatchans@gmail.com',
        to: req.body.Email,
        subject: "Password reset Link", 
        html:generateEmail(auth)
        , 
      });
      
      let existinguser = await userModel.updateOne({ Email: req.body.Email }, {
        $set: {
          Auth: auth
        }
      })
      res.status(200).send({message:"Reset Link sent",auth}
      )
      console.log(auth)
    }
    else {
      res.status(400).send({message:"Wrong Email address"})
    }

  }
  catch (error) {
    res.status(500).send({message:"internal server error"})
  }
})
router.post('/Autenticate-code', async (req, res) => {
  try {
    let existinguser = await userModel.findOne({ Auth: req.body.code })


    if (existinguser) {
      res.status(200).send({message:"Authorization Success"})
    }
    else {
      res.status(401).send({message:"Authorization failed you have entered wrong code"})
    }
  }

  catch (error) {
    res.status(500).send("internal server error")
  }
})
router.get('/Alluser/:id',async(req,res)=>{
  try{
     const users=await userModel.find({_id:{$ne:req.params.id}}).select([
      "Email",
      "_id",
      "Profile_pic",
      "Username"
     ])
     res.status(200).send(users)
  }
  catch(error){
      res.status(500).send(error)
  }
})
router.post('/Profile/:id',async(req,res)=>{
  try{
    const userID=req.params.id;
    const Profile_pic=req.body.image;
    const userdata=await userModel.findByIdAndUpdate(
      userID,
      {
        isProfile_pic:true,
        Profile_pic
      },
      {new:true}
    )
    res.status(200).send({isSet:userdata.isProfile_pic,
    image:userdata.Profile_pic})
  }
  catch(error){
    res.status(500).send(error)
  }
})
router.post('/Send_msg',async(req,res)=>{
  try{
     const {from,to,message,location}=req.body;
     const data=await Messagemodel.create({
      message:{text:message,location:location},
      users:[from,to],
      sender:from,
      // time:Date.now()
     })
     if(data){
      res.status(201).send("Message Send Sucessfully")
    }
    else{
      res.status(400).send("Can't send messages")
    }
  }
  catch(error){
     res.status(500).send(error)
  }
})
router.post('/Get_msg',async(req,res)=>{
  try{
   const {from,to}=req.body;
   const messages= await Messagemodel.find({
    users:{
      $all:[from,to]
    }}).sort({updateAt:1});

    const displaymessages=messages.map((e)=>{
      return{
          fromSelf:e.sender.toString()===from,
          message:e.message.text,
          location:e.message.location,
          time:e.createdAt
      }
    })
    res.status(200).send({message:displaymessages});
  }
  catch(error){
    res.status(500).send(error)
  }
})
router.post("/new-password/:Email/", async (req, res) => {
  try {
    let hash= await hashPassword(req.body.Password)
    let newpassword = await userModel.updateOne({ Email: req.params.Email }, { $set: { Password:hash} })
    await userModel.updateOne({Email:req.params.Email},{$unset:{Auth:""}})
    res.status(200).send("Password reseted sucessfully")
 
  }
  catch (error) {
    res.status(500).send('err')
  }
})
router.post("/offline",async(req,res)=>{
  try{
    let user=await Onlinestatus.insertMany(req.body)
    res.status(201).send("Offline users data posted")
  }
  catch(error){
    res.status(500).send(error)
  }
})
router.delete('/online/:id',async(req,res)=>{
  try{
      let user=await Onlinestatus.deleteMany({userID:req.params.id})
      res.status(200).send("Offilne data removed")
  }
  catch(error){
    res.status(500).send(error)
  }
})
router.get("/offline_users",async(req,res)=>{
  try{
    let user=await Onlinestatus.find()
    let data=user.map((e)=>{
      let format=e.lastseen
      let timestamp=format.toString();
      let timezone=timestamp.split(" ").slice(0,4)
      let result=timestamp.split(" ").splice(0,0)
      let d=new Date(format)
      let Today=new Date().getDate()
      let D=d.getDate()
      let H=d.getHours();
      let M=d.getMinutes();
      let current_status=''
      let time_format=''
      if(Today===D){
          current_status='today at'
          result.push(current_status)
      if(H>=13){
       H=H-12
       time_format=`${H}:${M} PM`
       result.push(time_format)
      }else{
        time_format=`${H}:${M} AM`
        result.push(time_format)
      }}if(Today-1===D){
         current_status='Yesterday at'
         result.push(current_status)
         if(H>=13){
          H=H-12
          time_format=`${H}:${M} PM`
          result.push(time_format)
         }else{
           time_format=`${H}:${M} AM`
           result.push(time_format)
         }}
         if(Today!==D&&Today-1!==D){
          current_status=`${timezone.join(" ")} at`
          result.push(current_status)
          if(H>=13){
            H=H-12
            time_format=`${H}:${M} PM`
            result.push(time_format)
           }else{
             time_format=`${H}:${M} AM`
             result.push(time_format)
           }
         }
      return{
        userID:e.userID,
        lastseen:result.join(" "),
      }
    })
    res.status(200).send(data)
    
  }
  catch(error){
    res.status(500).send(error)
  }
})
module.exports = router;
