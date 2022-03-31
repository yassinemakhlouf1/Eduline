import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Login() {
  
    const [username,setUsernameReg]=useState("");
    const [password,setPasswordReg]=useState("");
    const [email,setEmailReg]=useState("");
    const [name,setNameReg]=useState("");
    const [last_name,setLastNameReg]=useState("");
    const [birth_date,setBirthDateReg]=useState("");

    const navigate=useNavigate();
    useEffect(()=>  {if(localStorage.getItem('user-info')){
      
      navigate('/')
    }
    },[])
  
    const handleSubmit =async (e)=>{
      e.preventDefault();
      try {
      let item={email, username, password ,name ,last_name,birth_date};
      let result=await fetch("http://localhost:3000/register",{
        method :"POST",
        headers:{"Content-Type":"application/json",
        "Accept":"application/json"
      },body:JSON.stringify(item)

      });
      result = await JSON.stringify(result);
      navigate('/login');
    } catch (err) {
        console.error('err', err);
      }
    }


  return (
    
    <section  className="login_section layout_padding">
    <div className="container">
      <div className="row">
      <div className="col-md-6">
          <div className="login_form">
            <h5>
              Register Now
            </h5>
            <form onSubmit={handleSubmit} >
            <div>
                <input type="text" placeholder="Your Name" onChange={(e)=>{
                    setNameReg(e.target.value);
                }} />
              </div>
              <div>
                <input type="text" placeholder="Your Last Name" onChange={(e)=>{
                    setLastNameReg(e.target.value);
                }} />
              </div>
              <div>
                <input type="email" placeholder="your Address Mail" onChange={(e)=>{
                    setEmailReg(e.target.value);
                }} />
              </div>
            <div>
                <input type="text" placeholder="Username" onChange={(e)=>{
                    setUsernameReg(e.target.value);
                }} />
              </div>
              
              <div>
                <input type="password" placeholder="Password" onChange={(e)=>{
                    setPasswordReg(e.target.value);
                }} autoComplete="on"  />
              </div>
              <div>
                <input type="date" placeholder="your Date of Birth" onChange={(e)=>{
                    setBirthDateReg(e.target.value);
                }} />
              </div>
              <button  type="submit">REGISTER</button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="detail-box">
            <h3>
              GET ONLINE COURSES 
            </h3>
            <p>
              Connecting into your  account now and get  access to
              online courses
            </p>
            <a href='/login'  >
              LOGIN NOW
            </a>
          </div>
        </div>
      
      </div>
    </div>
  </section>
  )
}
