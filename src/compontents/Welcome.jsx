import React, { useEffect,useState } from 'react'

export default function Welcome() {
    let queries = {
        xs: '(max-width: 320px)',
        sm: '(max-width: 720px)',
        md: '(max-width: 1024px)'
      }
    let[username,setname]=useState("")
      let media_screen_width = window.matchMedia(queries.sm);
let resize=async()=>{
    if(media_screen_width.matches){
          let a = await localStorage.getItem('res2')
           let b= await localStorage.getItem("res")
             if(a=="Display"&&b=="Vanish"){
                   await localStorage.setItem('res2',"chat-box")
                   await  localStorage.setItem("res", 'chat-section')
                   console.log("changed")
             }
         }
}
let isExistinguser=async()=>{
let Onlineuser=await JSON.parse(localStorage.getItem('Online-user'))
setname(Onlineuser.Username)
}
useEffect(()=>{
  isExistinguser()
  
})
useEffect(()=>{
     resize()
},[])
   return <>
  <div className='container-fluid w' ><img src="cat-kitten.gif"></img><h2>Welcome, <span>{username}
!
          </span></h2><h6>Tap to start your conversation</h6></div>
  </>
}
