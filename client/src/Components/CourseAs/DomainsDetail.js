import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseASId, getDomainAS } from './CourseASApi';

export default function DomainsDetail() {
    const { id,title } = useParams();
  //const user = (localStorage.getItem('user-info'));
  //const result = JSON.parse(user);
  //console.log(user.user);
  const [domains,setDomains]=useState();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await getCourseASId(id);
      setDomains(result);
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
          Upcoming Education Events to feed your brain.
        </p>
      </div>
      <div class="event_container">
      {domains?.map((domain)=>(
        <div class="box">
          <div class="img-box">
            <img src={"/uploads/"+domain.image} alt="" />
          </div>
          <div class="detail-box">
            <h4>
            {domain.Name} 
            </h4>
            <h6>
            {domain.Description} 
            </h6>
          </div>
          <div class="date-box">
            <h3>
              <span>
              {domain.image}
              </span>
              
            </h3>
          </div>
        </div>
       ))}
      </div>
      
    </div>
  </section>
          
          

          
  )
}
