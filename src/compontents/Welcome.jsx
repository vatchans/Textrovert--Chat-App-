import React, { useEffect } from 'react'

export default function Welcome({name}) {

   return <>
  <div className='container-fluid w' ><img src="cat-kitten.gif"></img><h2> Welcome, {name?<>{name.Username}!</>:<></>}

          </h2><h6>Tap to start your conversation</h6></div>
          </>

}
