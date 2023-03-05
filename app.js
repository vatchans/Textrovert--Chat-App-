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
      origin: "http://localhost:3000",
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
      online=online.filter((user)=>user.socketId!==socket.id)
      io.emit("get-users",online)

    })
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });
