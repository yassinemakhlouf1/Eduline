import React, { useEffect, useState } from 'react'
import { getDomainAS,addCoursAS,getChapitreAS,addChapitreAS, uploadImg } from './CourseASApi';

export default function AddCourseAS() {
  const [state,setState] = useState({ selectedFile: null })
  //  const user = await User.findByIdAndUpdate(req.params.idU,{ $push: { wishlist: req.params.idP }})
    const [domains,setDomains]=useState();
    useEffect(()=>{
      const fetchData = async () => {
        const result = await getDomainAS();
        setDomains(result);
      };
      fetchData();
    }, []);
    const [course, setCourse] = useState({
        Name: "",
        Description: "",
        image: "",
        idDomain:"625dd5b17d75186ee44e2103",
      });
      const [chapitre, setChapitre] = useState({
        Name: "",
        Description: "",
        Lien:"",
      });
      const onSubmit=async(e)=>{
        try {
        // const resultChapitre=   addChapitreAS(chapitre);
        const data1 = new FormData();
    data1.append('file', state.selectedFile);
    const resultadd= await addCoursAS(course,course.idDomain,chapitre,data1) 
  //         test=resultChapitre;
  // await upload(data1);

            // setCourse({...course,image:await upload(data1)});
            // localStorage.setItem('aa',JSON.stringify(resultChapitre));
            //  await addCourse(resultChapitre._id);
          }
          catch (error) {
            console.log(error);
          }
      }
      // const addCourse=async(iid)=>{
      //   const resultadd= await addCoursAS(course,course.idDomain,iid)
      //   .catch((error) => {
      //       console.log(error);
      //   });
      // }
      //   const upload =async (data11) => { 
      //     const resultUp=  await uploadImg(data11)
      // };
      // setCourse({ ...course,image:resultUp.filename})
      // localStorage.setItem('course',JSON.stringify(resultUp));}
      
     
      
      
      

    
      
  return (
    <section class="course_section layout_padding-bottom">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
    <div>
        <form class="form-group " >
            <input   type="text" name="Name" placeholder='Name' onChange={(e) =>
                      setCourse({ ...course, Name: e.target.value })
                    }/><br/>
            <input type="text"  name="Description" placeholder='Description'
            onChange={(e) =>
                setCourse({ ...course, Description: e.target.value })}/>
            <select name='domain' className='btn '      onChange={(e) =>
                      setCourse({ ...course, idDomain: e.target.value })}>
            {domains?.map((domain,index)=>(
                <option key={index} value={domain._id}>{domain.Name}</option>
            ))}
            </select>
            {/* <input type="file" name="image" class="form-control form-control-lg" multiple onChange={(e) =>setState({selectedFile: e.target.files[0],loaded: 0 })}/> */}
            <div class="custom-file">
               <input type="file" class="custom-file-input" id="customFile" multiple onChange={(e) =>setState({selectedFile: e.target.files[0],loaded: 0 })}/>
                <label class="custom-file-label" for="customFile">Choose file</label>
                </div>
            <br/>
            <br/>
            <input type="text"  name="NameChapitre" placeholder='Chapitre Name'
            onChange={(e) =>
                setChapitre({ ...chapitre, Name: e.target.value })}/>
                <br/>
            <input type="text"  name="DescriptionChapitre" placeholder='Description'
            onChange={(e) =>
                setChapitre({ ...chapitre, Description: e.target.value })}/>
                <br/>
                 <input type="text"  name="DescriptionChapitre" placeholder='Description'
            onChange={(e) =>
                setChapitre({ ...chapitre, Lien: e.target.value })}/>
                
            <br/>
            <button name="add" className="btn  w-100 p-3" onClick={()=>onSubmit()}>Add</button>
           
        </form>
    </div>
    </section>
  )
}
