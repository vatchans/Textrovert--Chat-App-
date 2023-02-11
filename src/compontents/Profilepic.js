import React from 'react'
import '../App.css'
import { useState } from 'react';
import PhotoIcon from '@mui/icons-material/Photo';
import axios from 'axios';
import {toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
function Profilepic() {
    const [img,setimage]=useState("")
    let navigate=useNavigate()
    let user=JSON.parse(localStorage.getItem('Online-user'))
    let url=`http://localhost:8000/users/Profile/${user._id}`
    let profile='profile.png'
    function convertToBase64(file){
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result)
          };
          fileReader.onerror = (error) => {
            reject(error)
          }
        })
      }
    const handleSubmit = async(e) => {
      e.preventDefault();
      try{
       let res= await axios.post(url,{
            image:img
        })
        if(res.status===200){
            if (res.data.isSet) {
                user.isProfile_pic = true;
                user.Profile_pic = img;
                user.Password='';
                localStorage.setItem(
                 'Online-user',
                  JSON.stringify(user)
                );
                toast.success("Profile pic updated")
                navigate('/')
              } else {
                toast.error("Please try again.");
              }
        }

      }catch(error){
        console.log(error.data)
      }
      console.log("Uploaded")
    }
  
    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      console.log(base64)
      setimage(base64)
    //   setPostImage({ ...postImage, image : base64 })
    }
  return <>
  <div className='Container-fluid g' style={{display: 'flex', justifyContent: 'center' ,}} 
  >
  <div className="card mt-5" style={{width:"24rem",height:"20rem"}
  }>
  <div className="card-body">
 
          <label htmlFor="file-upload" >
          <img className='Avatar'src={img||profile} alt="" />
        </label>
   
   <h4 className='mt-5 card-img'>Hi,{user.Username}
   </h4> 
  
  </div>
  <input type='file'accept='.jpeg,.png,.jpg' id='file-upload' onChange={(e) => handleFileUpload(e)} />
  <p className='text-center profile-info'>your one step ahead for setting up your profile picture,
    click on the image icon 
   </p>
  <div className='Uploadpic mb-2 text-center' onClick={(e)=>handleSubmit(e)}><span>Upload</span>&nbsp;<PhotoIcon/></div>
</div>
  </div>
  </>
}

export default Profilepic