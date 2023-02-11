import React from 'react'
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
function Returntologin() {
    
  return<> <div className='Container-fluid g ' style={{ 'display': 'flex', 'justifyContent': 'center' }}>
  <div className='Container-fluid signin'>
      <h5 className="text-center p-2 title2">Reset your password</h5>
      <Form>
          <p className="text-center p-2 txtarea">Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.</p>
    
  <Form.Group className="text-center w-35 mb-3 mt-4" controlId="formBasicEmail">
  <Link to="/" style={{"textDecoration":"none","color":"black"}}> <button className='button' >
             Return to Signin
          </button>
          </Link>
          </Form.Group>
      </Form>
      </div>
  </div>
</>
}

export default Returntologin