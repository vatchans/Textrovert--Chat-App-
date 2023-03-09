import React, { useEffect, useState, useRef } from 'react'
import '../App.css'
import Contacts from './Contacts'
import ChatContainer from './ChatContainer'
import Welcome from './Welcome'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { io } from "socket.io-client";
import { RevolvingDot } from 'react-loader-spinner'
export default function Chat() {
  let [Contact, SetContacts] = useState([])
  const socket = useRef();
  let [loading, isloading] = useState(false)
  let [Onlineuser,setonline]=useState([])
  let [lastseen,setlastseen]=useState([])
  let [currentuser, setcurrentuser] = useState('')
  const [currentChat, setCurrentChat] = useState(undefined);
  let navigate = useNavigate()
  let isExistinguser = async () => {
    if (!localStorage.getItem('Online-user')) {
      navigate("/login");
    } else {
      setcurrentuser(
        await JSON.parse(
          localStorage.getItem('Online-user')
        )
      )
     
     
    }
    
  }
  useEffect(async() => {
    isExistinguser()
  }, []);
 
  useEffect(async() => {
    let data= JSON.parse(
      localStorage.getItem('Online-user')
    )
      socket.current = io('https://textrovert.onrender.com');
      socket.current.emit("add-user",data._id);
      socket.current.on("get-users", (users) => {
        setonline(users)
      });
      socket.current.on("lastseen",(users)=>{
        users.filter((e)=>{if(e.userId!==""&&!e.userId.includes(data._id)){
          return e;
        }}).map(async(e)=>{
          
        await axios.post("https://textrovert.onrender.com/users/offline",{
          userID:e.userId,
        })
      
      })})
    
   

  },[]);

let removeOffline=async()=>{
  if(currentuser._id){
  let res=await axios.delete(`https://textrovert.onrender.com/users/online/${currentuser._id}`
  )
  }
}
let offline_users=async()=>{
  if(currentuser._id){
    let res=await axios.get('https://textrovert.onrender.com/users/offline_users')
    setlastseen(res.data)
  }
}
  useEffect(() => {
    isloading(true)
    setTimeout(() => {
      isloading(false)
    }, 400)
  }, [])
  
  let getdata = async () => {
    if (currentuser) {
      if (currentuser.isProfile_pic) {
        const res = await axios.get(`https://textrovert.onrender.com/users/Alluser/${currentuser._id}`);
        SetContacts(res.data);
      } else {
        navigate("/Profilepic");
      }
    }
  }

  useEffect(() => {
    getdata()
  }, [currentuser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  
  let queries = {
    xs: '(max-width: 320px)',
    sm: '(max-width: 720px)',
    md: '(max-width: 1024px)'
  }

  let media_screen_width = window.matchMedia(queries.sm);

  let resize = async () => {
    if (media_screen_width.matches) {
      let a = await localStorage.getItem('res2')
      let b = await localStorage.getItem("res")
      if (a == "Display" && b == "Vanish") {
        await localStorage.setItem('res2', "chat-box")
        await localStorage.setItem("res", 'chat-section')
        console.log("changed")
      }
    }
  }
  useEffect(() => {
    resize()
  }, [])

  useEffect(()=>{
  removeOffline()
  },[currentuser])

  useEffect(()=>{
  offline_users()
  },[Onlineuser,setonline])

  let name = JSON.parse(localStorage.getItem("Online-user"))
  return <>
    {
      loading ?
        <div className='Loader'>
          <RevolvingDot
            height="100%"
            width="100%"
            radius="50"
            color="blue"
            secondaryColor=''
            ariaLabel="revolving-dot-loading"
            wrapperClass="Loader"
            visible={loading} />
        </div> :
        <div className='main'>
          <div className="containes">
            <Contacts Contacts={Contact} changeChat={handleChatChange} online={Onlineuser} />
            {currentChat === undefined ? <Welcome name={name} /> :
              <ChatContainer currentChat={currentChat} socket={socket} online={Onlineuser} lastseen={lastseen}/>}
          </div>
        </div>
    }
  </>
}

