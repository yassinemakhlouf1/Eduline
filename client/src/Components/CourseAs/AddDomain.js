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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

    <div>
      <h3>List of Domains</h3>
    <table class="table table-striped table-responsive-md">
  <thead>
    <tr>
      <th scope="col" >#</th>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
  {domains?.map((domain,index)=>(
            
    <tr>
      <th scope="row" >{index}</th>
      <td  class="text-info">{domain._id}</td>
      <td class="text-info">{domain.Name}</td>
      <td class="text-info">{domain.Description}</td>
      
    <button  name="add" className='btn btn-info w-100'  onClick={(event)=>onDelete(event,domain._id)}><i class="fa fa-trash"></i> </button>
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
            <div class="d-flex justify-content-center">
            <button name="add" className="btn btn-info  " onClick={(e)=>onSubmit(e)}>Add</button>
             </div>
        </form>
    </div>
    </section>
  )
}

