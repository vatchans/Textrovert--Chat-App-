const express = require("express");
const cors = require("cors");
const app = express();
const socket = require("socket.io");
const indexRouter=require('./routes/users')
require("dotenv").config();
app.use(cors());
app.use(express.json({limit: "100mb", extended: true}))
app.use(express.urlencoded({limit: "100mb", extended: true, parameterLimit: 50000}))
app.use("/users",indexRouter)

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
    cors: {
      origin: "https://exquisite-selkie-1bc399.netlify.app",
      credentials: true,
    },
  });
  
  let online=[]
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
       if (!online.some((user) => user.userId ===userId)) {
        online.push({ userId: userId, socketId: socket.id });
        
      }
      io.emit("get-users",online)
    });
    
     socket.on('disconnect',()=>{
      let find_user=online.filter((user)=>user.socketId==socket.id)
      let r=[...new Set(find_user)]
      let user = r.map((e)=>{if(e.userId!==""){return e.userId}}
      ).join("")
      if(!lastseen.some((e) =>e.userId ===user)){   
         lastseen.push({userId:user})
       }
      online=online.filter((user)=>user.socketId!==socket.id)
      io.emit("get-users",online)
      io.emit("lastseen",lastseen)
    })
    
       socket.on("typing", (user) =>{
      if(user.typing==true){
        io.emit("typing_indication",user)
      }
      else{
        io.emit("typing_indication",user)
      }
    })
   
    
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });
