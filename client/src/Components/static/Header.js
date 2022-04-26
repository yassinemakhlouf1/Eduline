import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Header() {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user-info')));
  const [isAdminn,setisAdmin] = useState();
  const navigate=useNavigate();
  
  
  const logout=()=>{
   navigate('home');
    setUser(null);
    sessionStorage.clear();
    localStorage.clear();
    console.log('test');
    

  }
  
   const Courseadd = () => {if (user?.user.isAdmin!=true) {
    return <li className="nav-item"><a className="nav-link" href="/DomainsAs"> Courses </a> </li>;
   }
    
  
    else {           
   return <> <li className="nav-item"><a className="nav-link" href="/ListDomainsAs"> AddDomain </a> </li>
   <li className="nav-item"> <a className="nav-link" href="/AddCourseAS"> AddCourses </a></li>
   <li className="nav-item"> <a className="nav-link" href="/DomainsAs"> Courses </a></li>
   </>;

    
  
  }
}
  return (
	  
	  <><head>

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <meta name="author" content="" />
  
    <title>Eduline</title>
  
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
  
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Poppins:400,600,700&display=swap" rel="stylesheet" />
  
    <link href="css/style.css" rel="stylesheet" />
  
    <link href="css/responsive.css" rel="stylesheet" />
  </head>
  
  <body class="sub_page">
    <div class="hero_area">
      <header class="header_section">
        <div class="container-fluid">
          <nav class="navbar navbar-expand-lg custom_nav-container ">
            <a class="navbar-brand" href="/home">
              <h3>
                EDULINE
              </h3>
              <span> </span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
  
            <div class="collapse navbar-collapse ml-auto" id="navbarSupportedContent">
              <ul className="navbar-nav  ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/home">Home</a>
              </li>
              
              {/* <li className="nav-item">
                <a className="nav-link" href="/DomainsAs"> Courses </a>
              </li> */}
             
              
              {Courseadd()}
              <li className="nav-item">
                <a className="nav-link" href="/course"> CoursesChatBot </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Home1"> Quiz </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/forums"> Forums </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact us</a>
              </li>
             {user ? (
               
               <li className="nav-item" >
               <a className="nav-link"  onClick={logout} >Logout</a>
             </li>
             )
              :(
                <li className="nav-item" >
                <a className="nav-link" href="/login">Login</a>
              </li>)
              
              }
              
            </ul>
              <form class="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
                <button class="btn  my-2 my-sm-0 nav_search-btn" type="submit"></button>
              </form>
            </div>
          </nav>
        </div>
      </header>
      </div>
      </body>
		</>
		
		
		)
}
