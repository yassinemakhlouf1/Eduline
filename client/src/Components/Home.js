import React from 'react';

export default function Home() {
  
  const user = (localStorage.getItem('user-info'));
  const result = JSON.parse(user);
  console.log(result.user);
  return (
    <>
    <section >
   <div>Home</div>
  </section>
  </>
  )
}
