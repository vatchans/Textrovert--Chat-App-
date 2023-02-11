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
import { useNavigate } from "react-router-dom";
function Newpassword() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    let navigate=useNavigate()
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const email=localStorage.getItem("Email")
    let [Password, setpwd] = useState('')
    let[cPassword,setcpwd]=useState('')
    const [incoreectpwd,setErrorMessage] = React.useState(false);
    const[showerr,seterr]=useState("")
    let handlesubmit = async() => {
      setErrorMessage(false)
        try{
            if(Password===cPassword){
        let res=await axios.post(`http://localhost:8000/users/new-password/${email}`,
        {
            Password

        })
         if(res.status===200){
            await localStorage.removeItem('Email')
            navigate('/')
         }
         else if(res.status===400){
            alert(res.data.message)
         }}
        else{
            seterr("Password doesn't match")
            setErrorMessage(true)
        }
        }
        catch(error){
            console.log('error',error)
            alert(error.response.data.message)
        }

    }
    return <> <div className='Container-fluid g' style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='Container-fluid signin'>
           <h4 className="text-center">Change password for <p id="email">{email}</p></h4>
            <Form>
               
                <FormControl sx={{ m: 5, mb:0, mt:2, width: '35ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e)=>setpwd(e.target.value)}
            endAdornment={
              <InputAdornment position="start">
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
        </FormControl>
        <FormControl sx={{ m: 5, mb:0, mt:2, width: '35ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e)=>setcpwd(e.target.value)}
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
        </FormControl>
        <Form.Group className="text-center w-35 mb-3 mt-3" controlId="formBasicEmail">
                <button className='button' onClick={()=>handlesubmit()}>
                    Change password
                </button>
                {incoreectpwd?<div className="error mt-2">{showerr} <i class="fa-solid fa-circle-exclamation"></i></div>:<></>}
                </Form.Group>
            </Form>
            </div>
        </div>
    </>
}

export default Newpassword