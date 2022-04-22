import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseASId, getDomainAS } from './CourseASApi';

export default function DomainsDetail() {
    const { id,title } = useParams();
  //const user = (localStorage.getItem('user-info'));
  //const result = JSON.parse(user);
  //console.log(user.user);
  const [courses,setCourses]=useState();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await getCourseASId(id);
      setCourses(result);
    };
    fetchData();
  }, []);
  return (
    <section class="event_section layout_padding">
    <div class="container">
      <div class="heading_container">
        <h3>
       {title} 
        </h3>
        <p>
        Événements éducatifs à venir pour nourrir votre cerveau.
        </p>
      </div>
      <div class="event_container">
      {courses?.map((course)=>(
        <div class="box">
          <div class="img-box">
            <img src={"/uploads/"+course.image} alt="" />
          </div>
          <div class="detail-box">
            <h4>
            {course.Name} 
            </h4>
            <h6>
            {course.Description} 
            </h6>
          </div>
          <div class="date-box">
            <h3>
              <div className="login_form"> <a href={'/Chp/'+course._id+'/'+course.Name}>REJOINDRE</a></div>
           
              
            </h3>
          </div>
        </div>
       ))}
      </div>
      
    </div>
  </section>
          
          

          
  )
}
