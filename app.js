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
  
 
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
     
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });
