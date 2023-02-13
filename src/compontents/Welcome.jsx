import React, { useEffect } from 'react'

export default function Welcome({name}) {
    let queries = {
        xs: '(max-width: 320px)',
        sm: '(max-width: 720px)',
        md: '(max-width: 1024px)'
      }
    
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
useEffect(()=>{
     resize()
     console.log("changed")
},[])
   return <>
  <div className='container-fluid w' ><img src="cat-kitten.gif"></img><h2>Welcome, <span>{name.Username}!
          </span></h2><h6>Tap to start your conversation</h6></div>
  </>
}
