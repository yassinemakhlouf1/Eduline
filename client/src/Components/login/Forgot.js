import React, { useState,useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";

export default function Forgot() {
    
    const [password,setPassword]=useState("");
    const { id } = useParams();
    
    const handleSubmit =async (e)=>{
        console.log(id);
    e.preventDefault();
      console.log('test');
      let item={password};
      console.log(password);
      let result=await fetch("http://localhost:3000/reset/"+id,{
        method :"POST",
        headers:{"Content-Type":"application/json",
        "Accept":"application/json"
      },body:JSON.stringify(item)

      });
    }

    
  return (
       
    <section  className="login_section layout_padding">
    <div className="container">
    
    <div className="login_form ">
      <h5>
        Reset Password
      </h5>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="password" placeholder="Password" onChange={(e)=>{
              setPassword(e.target.value);
          }} />
        </div>
        <div>
          <input type="password" placeholder="Repeat Password" />
        </div>
       
       
        <button  type="submit">reset</button>
      </form>
    </div>
  
  </div>
  </section>

  )
}
