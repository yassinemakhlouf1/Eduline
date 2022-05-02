import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Reset() {
    const handleSubmit =async (e)=>{
    e.preventDefault();
      console.log('test');
      let item={email};
      let result=await fetch("https://eduline-technonet.herokuapp.com/forgot",{
        method :"POST",
        headers:{"Content-Type":"application/json",
        "Accept":"application/json"
      },body:JSON.stringify(item)

      });
    }

    const [email,setEmail]=useState("");
  return (
       
    <section  className="login_section layout_padding">
    <div className="container">
    
    <div className="login_form ">
      <h5>
        Reset Password
      </h5>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="Email" onChange={(e)=>{
              setEmail(e.target.value);
          }} />
        </div>
       
       
        <button  type="submit">reset</button>
      </form>
    </div>
  
  </div>
  </section>

  )
}
