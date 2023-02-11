import React, { useEffect, useState,useRef} from 'react'
import '../App.css'
import Contacts from './Contacts'
import ChatContainer from './ChatContainer'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { io } from "socket.io-client";
import {RevolvingDot} from 'react-loader-spinner'
export default function Chat() {
  let [Contact, SetContacts] = useState([])
  const socket = useRef();
  let [loading,isloading]=useState(false)
  let [currentuser, setcurrentuser] = useState(undefined)
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
      );
    }
  }
  useEffect(() => {
    isExistinguser()
  }, []);

  useEffect(() => {
    if (currentuser) {
      socket.current = io('https://textrovert.onrender.com');
      socket.current.emit("add-user", currentuser._id);
    }
  }, [currentuser]); 
  
  useEffect(()=>{
  isloading(true)
  setTimeout(()=>{
    isloading(false)
  },400)
  },[])
  let getdata = async () => {
    if (currentuser) {
      if (currentuser.isProfile_pic) {
        const res = await axios.get(`https://textrovert.onrender.com/users/Alluser/${currentuser._id}`);
        SetContacts(res.data);
        console.log(res.data)
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

  return <>
  {
     loading?
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
     </div>:
    <div className='main'>
      <div className="containes">
        <Contacts Contacts={Contact} changeChat={handleChatChange} />
        {currentChat === undefined ? (<div className='w'>Welcome</div>) :
          <ChatContainer currentChat={currentChat} socket={socket}/>}
      </div>
    </div>
}
  </>
}

