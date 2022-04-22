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
        idDomain:""
      });
      const [chapitre, setChapitre] = useState({
        Name: "",
        Description: "",
      });
      let test;
      const onSubmit=async(e)=>{
        try {
        const resultChapitre=   addChapitreAS(chapitre);
        const data1 = new FormData();
    data1.append('file', state.selectedFile);
          test=resultChapitre;
  await upload(data1);
            // setCourse({...course,image:await upload(data1)});
            // localStorage.setItem('aa',JSON.stringify(resultChapitre));
            //  await addCourse(resultChapitre._id);
          }
          catch (error) {
            console.log(error);
          }
      }
      const addCourse=async(iid)=>{
        const resultadd= await addCoursAS(course,course.idDomain,iid)
        .catch((error) => {
            console.log(error);
        });
      }
        const upload =async (data11) => { 
          const resultUp=  await uploadImg(data11).then((e)=> 
          setCourse({ ...course,image:data11.filename}),
          localStorage.setItem('course',JSON.stringify(resultUp))
          ) .catch((error) => {
          console.log(error);
      });
      // setCourse({ ...course,image:resultUp.filename})
      // localStorage.setItem('course',JSON.stringify(resultUp));
     
      
      
      }
      

    
      
  return (
    <section class="course_section layout_padding-bottom">
    <div>
        <form>
            <input  className="col-md-3" type="text" name="Name" placeholder='Name' onChange={(e) =>
                      setCourse({ ...course, Name: e.target.value })
                    }/><br></br>
            <input type="text" className="col-md-3" name="Description" placeholder='Description'
            onChange={(e) =>
                setCourse({ ...course, Description: e.target.value })}/>
            <select name='domain' className='select-courseAS' onChange={(e) =>
                      setCourse({ ...course, idDomain: e.target.value })}>
            {domains?.map((domain,index)=>(
                <option key={index} value={domain._id}>{domain.Name}</option>
            ))}
            </select>
            <input type="file" name="image" multiple onChange={(e) =>setState({selectedFile: e.target.files[0],loaded: 0 })}/>
            <input type="text" className="col-md-3" name="NameChapitre" placeholder='DescriptionCh'
            onChange={(e) =>
                setChapitre({ ...chapitre, Name: e.target.value })}/>
            <input type="text" className="col-md-3" name="DescriptionChapitre" placeholder='DescriptionCh'
            onChange={(e) =>
                setChapitre({ ...chapitre, Description: e.target.value })}/>
            <button name="add" onClick={()=>onSubmit()}>Add</button>
           
        </form>
    </div>
    </section>
  )
}
