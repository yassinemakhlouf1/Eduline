import React, { useEffect, useState } from 'react';
import { getDomainAS } from './CourseASApi';

export default function DomainsAs() {
  
  //const user = (localStorage.getItem('user-info'));
  //const result = JSON.parse(user);
  //console.log(user.user);
  const [domains,setDomains]=useState();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await getDomainAS();
      setDomains(result);
    };
    fetchData();
  }, []);
  return (
    <section class="course_section layout_padding-bottom">
    <div class="side_img">
      <img src="images/side-img.png" alt="" />
    </div>
    <div class="container">
      <div class="heading_container">
        <h3>
        COURSES
        </h3>
        <p>
          It is a long established fact that a reader will be distracted
        </p>
      </div>
      <div class="course_container">
        <div class="course_content">
          {domains?.map((domain)=>(
            <div class="box">
            <img src={"uploads/"+domain.image} alt="" />
            <a href={"/CoursASCH/"+domain._id+"/"+domain.Name} class="">
              <img src="images/link.png" alt="" />
            </a>
            <h5>
              {domain.Name} 
              
            </h5>
          </div>

          ))}
          
          {/* <div class="box">
            <img src="images/MS.jpg" alt="" />
            <a href="" class="">
              <img src="images/link.png" alt="" />
            </a>
            <h5>
              Medical <br />
              Science
            </h5>
          </div> */}
        </div>
        {/* <div class="course_content">
          <div class="box">
            <img src="images/LG.jpg" alt="" />
            <a href="" class="">
              <img src="images/link.png" alt="" />
            </a>
            <h5>
              Language <br />
            </h5>
          </div>
          <div class="box">
            <img src="images/PH.jpg" alt="" />
            <a href="" class="">
              <img src="images/link.png" alt="" />
            </a>
            <h5>
              Photography
            </h5>
          </div>
        </div> */}
      </div>
      <div class="btn-box">
        <a href="">
          Read More
        </a>
      </div>
    </div>
  </section>
  )
}
