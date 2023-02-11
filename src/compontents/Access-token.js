import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Form from 'react-bootstrap/Form';
import {toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Accesstoken() {
  var [code, setCode] = useState('')
  const[showerr,seterr]=useState("")
  const [incoreectpwd,setErrorMessage] =useState(false);
  let navigate=useNavigate()
  let handlesubmit = async(e) => {
    e.prevantDefault()
    setErrorMessage(false)
  try{
  let res=await axios.post("http://localhost:8000/users/Autenticate-code",
  {
      code,

  })
   if(res.status===200){
      navigate('/New')
      toast.success(res.data.message)
   }
   else if(res.status===400){
      alert(res.data.message)
   }
  }
  catch(error){
      console.log('error',error)
      seterr(error.response.data.message)
      setErrorMessage(true)
  }

}
return <> <div className='Container-fluid g' style={{ 'display': 'flex', 'justifyContent': 'center' }}>
    <div className='Container-fluid signin'>
        <h4 className="text-center mt-4"> <span className="font-link">Access token</span></h4>
        <Form>
        <Box
  component="form"
  sx={{
    '& > :not(style)': { m: 5, mb:1, mt:2 ,width: '35ch' },
  }}
  noValidate
  autoComplete="off"
>
  <TextField id="standard-basic" label="Access code" variant="standard"onChange={(e)=>setCode(e.target.value)}/>
  {/* <i class="fa-solid fa-key"></i> */}
  {incoreectpwd?<div className="error mt-2">{showerr} <i class="fa-solid fa-circle-exclamation"></i></div>:<></>}
</Box>

    <Form.Group className="text-center w-35 mb-3 mt-4" controlId="formBasicEmail">
            <button className='button' onClick={()=>handlesubmit()}
            type="submit">
                verify
            </button>
            </Form.Group>
        </Form>
        </div>
    </div>
</>
}

export default Accesstoken