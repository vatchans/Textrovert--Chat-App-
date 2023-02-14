import React from 'react'
import '../App.css'
import { SearchOutlined, MoreVert, AttachFile} from '@mui/icons-material'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import GifBoxIcon from '@mui/icons-material/GifBox';
import { Avatar, IconButton, Tooltip } from '@mui/material'
import Box from '@mui/material/Box';
import GifPicker from 'gif-picker-react';
import Modal from '@mui/material/Modal';
import notfication from './messenger_chat_sound.mp3'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import Picker from 'emoji-picker-react';
import styled from "styled-components";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useRef } from 'react';
import { format } from 'timeago.js'
import ReactPlayer from 'react-player';
import axios from 'axios';
export default function ChatContainer({ currentChat, socket }) {
  let [Messages, setmessages] = useState([])
  let [showgifbox,hidegifbox]=useState(false)
  let [arrivalMessage, setArrivalMessage] = useState(null);
  let [issearchbar,setsearchbar]=useState(false)
  let [msg, setmsg] = useState("")
  let scrollRef = useRef();
  let [Show, hide] = useState("chat-box")
  let [showemoji, hideemoji] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [get, set] = useState(false)

  const textAreaRef = useRef(null);
  const handlemojipicker = () => {
    hideemoji(!showemoji)
  }
  const handlegifpicker=()=>{
    hidegifbox(!showgifbox)
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:"18rem",
    height:"20rem",
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius:"6px",
    boxShadow: 24,
    p: 1,
  };
  let queries = {
    xs: '(max-width: 320px)',
    sm: '(max-width: 720px)',
    md: '(max-width: 1024px)'
  }

  let media_screen_width = window.matchMedia(queries.sm);
  let g = localStorage.getItem('res2')

  let handlechange = async () => {
    await localStorage.setItem('res2', Show)
    await localStorage.setItem("res", 'chat-section')
    window.location.reload(false)
  }
  let Collectmsgs = async () => {
    const data = await JSON.parse(
      localStorage.getItem("Online-user")
    );
    const res = await axios.post('https://textrovert.onrender.com/users/Get_msg', {
      from: data._id,
      to: currentChat._id,
    });
    setmessages(res.data);
  }
  useEffect(() => {
    Collectmsgs() 
  }, [currentChat]);
  let handleEmoji = (e, emojiObject) => {
    e.preventDefault()
    let message = msg;
    message += emojiObject.emoji;
    setmsg(message)
  }

  let handlesendmsg = async (msg) => {
    try {
      const data = await JSON.parse(
        localStorage.getItem('Online-user')
      );
      let res = await axios.post(`https://textrovert.onrender.com/users/Send_msg`, {
        from: data._id,
        to: currentChat._id,
        message: msg
      })
      const msgs = [...Messages];
      msgs.push({ fromSelf: true, message: msg });
      setmessages(msgs);
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: data._id,
        msg,
      });
    }
    catch (error) {
      console.log(error.data)
    }
  }
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
        let audio = new Audio(notfication)
        audio.play();
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setmessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  let sendchat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handlesendmsg(msg)
      setmsg('')
    }
  }
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Messages]);
  const resizeTextArea = () => {
    textAreaRef.current.style.height = "20px";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };
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

  const recorderControls = useAudioRecorder()
  const addAudioElement = async(blob) => {
    const url =await convertToBase64(blob)
    handlesendmsg(url)
  };

  const sendgif=async(gif)=>{
   await handlesendmsg(gif.url)
  }

  useEffect(resizeTextArea, [msg]);
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    handlesendmsg(base64)
    console.log(base64)
  }
  return <>
    <div className={g || Show}>
      <div className='chat-head'>
        <ArrowBackIcon style={{color:"#EFF1EC"}}
          onClick={() => {
            if (media_screen_width.matches) {
              handlechange()

            }

          }}
        />
        <Avatar src={currentChat.Profile_pic} onClick={handleOpen} />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ display: "flex", justifyContent: "center"}}>
              <img src={currentChat.Profile_pic}  style={{borderRadius:"8px" ,width:"17rem",height:"19rem"}}alt='view dp'></img>
            </div>
          </Box>
        </Modal>
        <div className='chat-head-info' >
          <h3>{currentChat.Username}</h3>
        </div>
        {<div className='Chat-head-right'>
          <Tooltip title="Search messages">
            <IconButton style={{color:"#EFF1EC"}}>
              <SearchOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Attach File">
          <label htmlFor="file-upload" >
          <AttachFile />
            {/*  */}
            </label>
          </Tooltip>
          <input type='file'accept='.jpeg,.png,.jpg,.mp3,.mp4' id='file-upload' onChange={(e) => handleFileUpload(e)} />
          <Tooltip title="menu">
            <IconButton style={{color:"#EFF1EC"}}>
              <MoreVert />
            </IconButton>
          </Tooltip>
        </div>}
      </div>
  

      <div className='chat-body'>
        {Messages.map((e) => {
          return (

            <div
              ref={scrollRef} className={e.fromSelf ? "message own" : "message"} key={uuidv4()}
            >{e.message.includes("https") && e.message.includes('youtu.be') ? <ReactPlayer width="290px" height="200px" url={e.message} /> : e.message.startsWith("https")&& !e.message.includes("https://media.tenor.com")?
              <span><a href={e.message} target="_blank" >{e.message}</a></span> : e.message.includes("data:audio/webm")?<span>
                <audio controls style={{width:"14rem"}}>
              <source src={e.message} />
            </audio></span>:e.message.includes("data:image")?<img src={e.message}></img>:
            e.message.startsWith("https://media.tenor.com")&&e.message.endsWith(".gif")?<img src={e.message}></img>:
              <span>{e.message}</span>}
              <span style={{ fontSize: "0.5rem" }}>{format(e.time)}</span>
            </div>


          )
        })
        }
        <div className='emoji'>
         {showemoji && <Picker onEmojiClick={(e, emojiObject) => handleEmoji(e, emojiObject)} />}
        </div>
        <div className='gif'>
          {showgifbox&& <GifPicker tenorApiKey={"AIzaSyCvDFneWgq-6Z3N1NwcCXflSGxu141dJKA"} onGifClick={(TenorImage)=>{sendgif(TenorImage)}} width="20rem" /> }
        </div>
      </div>

      <div className='chat-footer'>
      <GifBoxIcon onClick={handlegifpicker}/>
        <EmojiEmotionsIcon onClick={handlemojipicker} />&nbsp;
        <TextArea ref={textAreaRef} placeholder="Message..." value={msg} type='text' onChange={(e) => { setmsg(e.target.value) }} row="1"  />&nbsp;
       {msg.length>0?<>
        <div className='sendbtn' type="submit" onClick={(e) => sendchat(e)}
        ><SendIcon /></div>
       
       </>:
        <div className={recorderControls.recordingTime>0?"":'sendbtn'}  onPointerDown={recorderControls.startRecording} onPointerUp={recorderControls.stopRecording}>{recorderControls.recordingTime>0?<img src="rec.gif" style={{width:"6rem",padding:"0px"}}></img>:<KeyboardVoiceIcon/>}</div>
      }
      <div className='AudioRecorder'> <AudioRecorder 
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      /></div> 
      </div>
    </div>
  </>

}
const TextArea = styled.textarea`

`;
