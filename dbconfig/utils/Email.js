function generateEmail(auth=""){
    return `<div style="border:1px solid silver;width:350px;height:250px;padding:5px;border-radius:10px;">
         <h2 style="margin-left:10px">Access code</h2>
     <h4 style="text-align:center;border:1px solid silver;width:fit-content;padding:8px;margin-left:40%; border-radius:5px";>${auth}</h4>
     <p>Enter this access code for authorization and don’t worry! You can use the following button to reset your password</p>
    <button style="width:fit-content;height:40px;color:white;background-color:#08bd3e;margin-left:30%;padding:10px;border: none;border-radius:8px;">
     <a href="http://localhost:3000/auth" style="text-decoration:none;color:white">Reset your Password</a></button>
     </div>`
 }
 module.exports={generateEmail};