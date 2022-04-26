import React from 'react';

export default function CoursASCH() {
  
  //const user = (localStorage.getItem('user-info'));
  //const result = JSON.parse(user);
  //console.log(user.user);
  return (
    

   <section class="course_section layout_padding-bottom  ">
    <div class="side_img">
      <img src="images/side-img.png" alt="" />
    </div>
    <div class="container">
      <div class="heading_container">
        <h3>
        Computer  Science 
        </h3>
      </div>
      
      <div class="course_container">
        <div class="course_content">
          <div class="box">
            <img src="images/Symphony.png" alt="" />
            <a href="" class="">
              <img src="images/link.png" alt="" />
            </a>
            <h5>
              Symphony
            </h5>
          </div>
          <div>   <h3> Symfony is a set of reusable PHP components and a PHP framework to build web applications, APIs, microservices and web services.</h3></div>
        </div>
       
      </div>
      <div class="course_container">
        <div class="course_content">
          <div class="box">
            <img src="images/react.png" alt="" />
            <a href="" class="">
              <img src="images/link.png" alt="" />
            </a>
            <h5>
           React
            </h5>
          </div>
          
          <div>   <h3>  React est une bibliothèque JavaScript libre développée par Facebook depuis 2013. Le but principal de cette bibliothèque 
            est de faciliter la création d'application web monopage, 
            via la création de composants dépendant d'un état et générant une page HTML à chaque changement d'état.</h3></div>
          
        </div>
       
      </div>
      <div class="course_container">
        <div class="course_content">
          <div class="box">
            <img src="images/node.png" alt="" />
            <a href="" class="">
              <img src="images/link.png" alt="" />
            </a>
            <h5>
              Node.JS
            </h5>
          </div>
          <div>   <h3>   is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 
              engine and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command 
              line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser</h3></div>
        </div>
       
      </div>
      
    </div>
  </section>
  
  )
}