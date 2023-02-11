import React from 'react'
import '../App.css';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link,useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
export default function Signup() {
    const [showPassword, setShowPassword] = React.useState(false);
    const[showerr,seterr]=useState("")
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [incoreectpwd,setErrorMessage] = React.useState(false);
    const navigate=useNavigate()
    const handleMouseDownPassword = (e) => {
      e.preventDefault();
    };
    var [Email, setemail] = useState('')
    var [Password, setpwd] = useState('')
    var [Mobile,setmobile]=useState('')
    var[Username,setname]=useState('')
    let handlesubmit = async(e) => {
      e.preventDefault();
      setErrorMessage(false)
      

        try{
        let res=await axios.post("http://localhost:8000/users/Signup",
        {
            Email,
            Password,
            Mobile,
            Username


        })
         if(res.status===201){
          toast.success(res.data.msg)
          await localStorage.setItem("Online-user",JSON.stringify(res.data.user))
          navigate('/Profilepic')

         }
         else{
           seterr(res.data)
           setErrorMessage(true)
         }
        }
        catch(error){
            console.log('error',error)
            seterr(error.response.data)
            setErrorMessage(true)
            
        }

    }
    return <> <div className='Container-fluid g' style={{ "display": 'flex', "justifyContent": 'center' }}>
        <div className='Container-fluid signin'>
            <h2 className="text-center title">Sign up</h2>
            <Form>
            <Box
      component="form"
      sx={{
        '& > :not(style)': {m:5,mb:2, mt:2,width: '33ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Username" variant="outlined"required onChange={(e)=>setname(e.target.value)} />
    </Box>
            <Box
      component="form"
      sx={{
        '& > :not(style)': {m:5,mb:2, mt:2,width: '33ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Email" variant="outlined" required onChange={(e)=>setemail(e.target.value)} />
    </Box>
    {incoreectpwd?<div className="error mt-2">{showerr} <i class="fa-solid fa-circle-exclamation"></i></div>:<></>} 
                <FormControl 
                sx={{m:5, mb:0, mt:2,width: '33ch' }}variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            required
            onChange={(e)=>setpwd(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
             
            }
            label="Password"
          />
            <Box
      component="form"
      sx={{
        '& > :not(style)': {mb:2, mt:2,width: '33ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Mobile" variant="outlined"  required onChange={(e)=>setmobile(e.target.value)} />
    </Box> 
        </FormControl>
      
        <Form.Group className="text-center w-35 mb-3" controlId="formBasicEmail">
                <button type="submit" className="btn"style={{"width":"20ch"}} variant="primary" required  onClick={(e)=>handlesubmit(e)}
            >
                    Register
                </button>
                <p  className="text-center mb-3 mt-3 info">Already have an account.click&nbsp;<Link to="/"><span>here</span></Link></p>
                </Form.Group>
            </Form>
            </div>
        </div>
    </>

}
