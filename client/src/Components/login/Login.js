import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Login() {
  
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");



    const navigate=useNavigate();
    useEffect(()=>  {if(localStorage.getItem('user-info')){
      navigate('/')}
    },[])
   
    const handleSubmit =async (e)=>{
      e.preventDefault();
      console.log('test');
      let item={username,password};
      let result=await fetch("http://localhost:3000/login",{
        method :"POST",
        headers:{"Content-Type":"application/json",
        "Accept":"application/json"
      },body:JSON.stringify(item)

      });
      result = await result.json();
    if (result.user!=null) 
      localStorage.setItem('user-info',JSON.stringify(result));
      window.location.reload(false);
      navigate('/');

    }


  return (
    
    <section  className="login_section layout_padding">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="detail-box">
            <h3>
              GET ONLINE COURSES 
            </h3>
            <p>
              Create your  account now and get  access to
              online courses
            </p>
            <a href='/register'  >
              REGISTER NOW
            </a>
          </div>
        </div>
        <div className="col-md-6">
          <div className="login_form">
            <h5>
              Login Now
            </h5>
            <form onSubmit={handleSubmit}>
              <div>
                <input type="text" placeholder="Username" onChange={(e)=>{
                    setUsername(e.target.value);
                }} />
              </div>
              <div>
                <input type="password" placeholder="Password" onChange={(e)=>{
                    setPassword(e.target.value);
                }} autoComplete="on"  />
                 <a href='/reset'>Reset Password</a>
              </div>
             
              <button  type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
