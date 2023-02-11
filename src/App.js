import './App.css';
import Login from './compontents/Login';
import Resetpassword from './compontents/Reset-password';
import Accesstoken from './compontents/Access-token';
import Newpassword from './compontents/Access-token';
import Returntologin from './compontents/Returntologin';
import Signup from './compontents/Signup';
import Profilepic from './compontents/Profilepic';
import Chat from './compontents/Chat';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path="/Reset" title="Reset password" element={<Resetpassword/>}/>
    <Route path="/auth" element={<Accesstoken/>}/>
    <Route path="/New" element={<Newpassword/>}/>
    <Route path='/return' element={<Returntologin/>}/>
    <Route path='/Profilepic' element={<Profilepic/>}/>
    <Route path='/' element={<Chat/>}/>
      </Routes>
      <ToastContainer/>
  </BrowserRouter>

}

export default App;
