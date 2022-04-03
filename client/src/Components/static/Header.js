import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Header() {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user-info')));
  const navigate=useNavigate();
 
  
  const logout=()=>{
   navigate('home');
    setUser(null);
    sessionStorage.clear();
    localStorage.clear();
    console.log('test');
    

  }
  // const logout = () => {
  //   localStorage.removeItem("user-info");
    
  // };
  return (
	  <>
  <div className="hero_area">
    <header className="header_section">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom_nav-container ">
          <a className="navbar-brand" href="index.html">
            <h3>
              Eduline
            </h3>
            <span> </span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse ml-auto" id="navbarSupportedContent">
            <ul className="navbar-nav  ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="about.html"> About </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="course.html"> Courses </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/forums"> Forums </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact.html">Contact us</a>
              </li>
             {user ? (
               
               <li className="nav-item" >
               <a className="nav-link" onClick={logout} >Logout</a>
             </li>
             )
              :(
                <li className="nav-item" >
                <a className="nav-link" href="login">Login</a>
              </li>)
              
              }
              
            </ul>
            
            <form className="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
              <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit"></button>
            </form>
          </div>
        </nav>
      </div>
    </header>

  </div>
		</>
		
		)
}
