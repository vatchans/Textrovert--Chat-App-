import React, { useState,useEffect} from 'react'
import '../App.css'
import { Avatar } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
export default function Contacts({Contacts, changeChat}) {
  let [CurrentuserImage,SetcurrentuserImage]=useState(undefined)
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [Search,setsearch]=useState('')
  const changeCurrentChat = (i,e) => {
    setCurrentSelected(i);
    changeChat(e);
  };
  let [Curr,setcurr]=useState('chat-section')
  let queries = {
    xs: '(max-width: 320px)',
    sm: '(max-width: 720px)',
    md: '(max-width: 1024px)'
    }
 let media_screen_width = window.matchMedia(queries.sm);
let handlechange=async(i,e)=>{
 await localStorage.setItem("res","Vanish")
 await localStorage.setItem('res2','Display')
 setCurrentSelected(i);
 changeChat(e);
}
let isExistinguser=async()=>{
let Onlineuser=await JSON.parse(localStorage.getItem('Online-user'))
SetcurrentuserImage(Onlineuser.Profile_pic)
}
useEffect(()=>{
  isExistinguser()
  
})
let get=localStorage.getItem("res")
  return<>
        <div className={get||Curr}>
          <div className='chat-section-header'>
             <Avatar src={CurrentuserImage}/>
             <div className='logo'>
            <img src="chatlog02.png"  alt="logo"/>
            </div>
          </div>
          <div className='chat-search '>
            <div className='chat-search-box'>
            <SearchOutlined/>
            <input type="text" placeholder="Search" onChange={(e)=>{setsearch(e.target.value)}}/>
            </div>
          </div>
       
        <div className='Contact-section'>
            <h4>Chats</h4>
            {Contacts.filter((s)=>{
                 if(Search===""){
                  return s;
                 }
                 else if(s.Username.toLowerCase().includes(Search.toLowerCase())){
                  return s;
                 }
            }).map((e,i)=>{
              return(
           <div className='Contact-list' key={e._id} >
            <Avatar src={e.Profile_pic}></Avatar>
            <div className='User-info' onClick={()=>{
              if(media_screen_width.matches){
                 handlechange(i,e)
              }
              else if(!media_screen_width.matches){
                changeCurrentChat(i,e)
              }
          }}>
            <h2>{e.Username}</h2>
            </div>
           </div>
              )
           })
           }
        </div>
        </div>
      
  </>
}
