import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
function Resetpassword() {
    var [Email, setemail] = useState('')
    let navigate=useNavigate()
    const [incoreectpwd,setErrorMessage] = React.useState(false);
    const[showerr,seterr]=useState("")
    let handlesubmit = async() => {
        setErrorMessage(false)
    try{
    let res=await axios.post("https://reset-password-oydo.onrender.com/users/reset-password",
    {
        Email,

    })
     if(res.status===200){
        toast.success(res.data.message)
        await localStorage.setItem("Email",Email);
        navigate("/Return")
     }
     else if(res.status===400){
        alert(res.data.message)
     }
    }
    catch(error){
        seterr(error.response.data.message)
        setErrorMessage(true)
    }

}
return <> <div className='Container-fluid g ' style={{ 'display': 'flex', 'justifyContent': 'center' }}>
    <div className='Container-fluid signin'>
        <h5 className="text-center p-2 title2">Reset your password</h5>
        <Form>
            <p className="text-center p-2 txtarea">Enter your user account's verified email address and we will send you a password reset link.</p>
        <Box
  component="form"
  className='box'
  justifyContent="center" 
  sx={{
    '& > :not(style)': {width: '20rem', },
  }}
  noValidate
  autoComplete="off"
>
  <TextField id="outlined-basic" label="Email" variant="outlined"onChange={(e)=>setemail(e.target.value)} />
  {incoreectpwd?<div className="error mt-2">{showerr} <i class="fa-solid fa-circle-exclamation"></i></div>:<></>}
</Box>
    <Form.Group className="text-center w-35 mb-3 mt-4" controlId="formBasicEmail">
            <button className='button'  onClick={()=>handlesubmit()}>
                Send password reset email
            </button>
            </Form.Group>
        </Form>
        </div>
    </div>
</>
}

export default Resetpassword