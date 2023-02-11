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
import { Link,useNavigate} from "react-router-dom";
import {toast } from 'react-toastify';
function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [incoreectpwd,setErrorMessage] = React.useState(false);
    const [wrgemail,setErrorMessage2]=useState(false)
    const[showerr,seterr]=useState("")
    let navigate=useNavigate()
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    var [Email, setemail] = useState('')
    var [Password, setpwd] = useState('')
    let handlesubmit = async(e) => {
      e.preventDefault()
      setErrorMessage(false)
      setErrorMessage2(false)
        try{
        let res=await axios.post("https://textrovert.onrender.com/users/Signin",
        {
            Email,
            Password

        })
         if(res.status===200){
          toast.success(res.data.message)
            if(!localStorage.getItem("Online-user")){
            await localStorage.setItem("Online-user",JSON.stringify(res.data.user))
            if(res.data.user.isProfile_pic){
              navigate('/')
            }
            else{
              navigate('/Profilepic')
            }
            }
          
         }
         else if(res.status===400){
            setErrorMessage2(res.data.message)
            setErrorMessage2(true)
            
         }
        }
        catch(error){
            console.log('error',error)
            seterr(error.response.data.message)
            setErrorMessage(true)
            
        }

    }
    return <> <div className='Container-fluid g' style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='Container-fluid signin'>
            <h2 className="text-center title">Sign in</h2>
            <Form>
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
    {wrgemail?<div className="error mt-2">{showerr} <i class="fa-solid fa-circle-exclamation"></i></div>:<></>}    
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
          {incoreectpwd?<div className="error mt-2">{showerr} <i class="fa-solid fa-circle-exclamation"></i></div>:<></>}
        </FormControl>
       <Link to="/Reset" style={{"textDecoration":"none","color":"black"}}><p className="m-5 mb-3 mt-3">Forget password <img src='icons8-forgot-password-100.png' width={"15px"}alt="?"></img></p></Link> 
        <Form.Group className="text-center w-35 mb-3" controlId="formBasicEmail">
                <button className="btn"style={{"width":"20ch"}} onClick={(e)=>handlesubmit(e)}
            >
                Login
                </button>
                <p  className="text-center mb-3 mt-3 info">Don't have an account.Register&nbsp;<Link to="/signup"><span>here</span></Link></p>
                </Form.Group>
            </Form>
            </div>
        </div>
    </>
}

export default Login;