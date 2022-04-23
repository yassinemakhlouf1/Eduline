import React, { useEffect, useState } from 'react'
import { addDomainAS, DelDomain, getDomainAS } from './CourseASApi';

export default function AddDomain() {
const [state,setState] = useState({ selectedFile: null })
  //  const user = await User.findByIdAndUpdate(req.params.idU,{ $push: { wishlist: req.params.idP }})
    const [domains,setDomains]=useState();
    const fetchData = async () => {
        const result = await getDomainAS();
        setDomains(result);
      };
      useEffect(()=>{
      
      fetchData();
    }, []);
    const [dm, setDm] = useState({
        Name: "",
        Description: "",
        image: "",
      });
    
      const onDelete=async(event,id)=>{
        event.preventDefault();
        try {
        const data1 = new FormData();
    data1.append('file', state.selectedFile);
    const resultadd= await DelDomain(id) }
          catch (error) {
            console.log(error);
          }
          
      fetchData();
      }
      const onSubmit=async(e)=>{
          e.preventDefault();
        try {
        const data1 = new FormData();
    data1.append('file', state.selectedFile);
    const resultadd= await addDomainAS(dm,data1) }
          catch (error) {
            console.log(error);
          }
          fetchData();
      }
     
      
      
      

    
      
  return (
    <section class="course_section layout_padding-bottom">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
    <div>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
  {domains?.map((domain,index)=>(
            
    <tr>
      <th scope="row">{index}</th>
      <td>{domain._id}</td>
      <td>{domain.Name}</td>
      <td>{domain.Description}</td>
      
    <button name="add" className="btn  w-100 p-3" onClick={(event)=>onDelete(event,domain._id)}>Deleted</button>
    </tr>
    ))}
  </tbody>
</table>
        <form class="form-group " >
            <input   type="text" name="Name" placeholder='Name' onChange={(e) =>
                      setDm({ ...dm, Name: e.target.value })
                    }/> <br/>
            <input type="text"  name="Description" placeholder='Description'
            onChange={(e) =>
                setDm({ ...dm, Description: e.target.value })}/>
            <div class="custom-file">
               <input type="file" class="custom-file-input" id="customFile" multiple onChange={(e) =>setState({selectedFile: e.target.files[0],loaded: 0 })}/>
                <label class="custom-file-label" for="customFile">Choose file</label>
                </div>
            <br/>
            <br/>
            <button name="add" className="btn  w-100 p-3" onClick={(e)=>onSubmit(e)}>Add</button>
           
        </form>
    </div>
    </section>
  )
}

