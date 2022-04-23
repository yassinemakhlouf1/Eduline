import axios from "axios";
const url="http://localhost:3000/courseAS/"
export const addCoursAS = async (cours,idDomain,Chapter,data11) => {
  
      try {
      
        const chp =  await addChapitreAS(Chapter);
        const resultUp=  await uploadImg(data11);
      const { data } = await axios.post(
        url + "create/"+idDomain+"/"+chp._id+"/"+resultUp.filename,
        cours
      );
  
      return data;
    } catch (error) {
      console.log(error);
    }
    
  };
  /*Domain*/
export const DelCourse = async (id) => {
  try {
    const { data } = await axios.delete(url + "/DelCoursesAS/"+id);
    return data;
  } catch (error) {
    console.log(error);
  }
  
};

  export const getCourseAS = async () => {
    try {
      const { data } = await axios.get(url + "allCoursesAS");
      return data;
    } catch (error) {
      console.log(error);
    }
    
  };


  /* Chapitres */
  export const addChapitreAS = async (chapitre) => {
    try {
  
    const { data } = await axios.post(
      url + "chapter/createC",
      chapitre
    );

    return data;
  } catch (error) {
    console.log(error);
  }
  
};

export const getChapitreAS = async () => {
  try {
    const { data } = await axios.get(url + "chapter/allChaptersAS");
    return data;
  } catch (error) {
    console.log(error);
  }
  
};
 /* domain */
 export const addDomainAS = async (domain,img) => {
   
    try {
      const resultUp=  await uploadImg(img);
    const { data } = await axios.post(
      url + "domain/createD/"+resultUp.filename,
      domain
    );

    return data;
  } catch (error) {
    console.log(error);
  }
  
};
/*Domain*/
export const DelDomain = async (id) => {
  try {
    const { data } = await axios.delete(url + "domain/DelDomainsAS/"+id);
    return data;
  } catch (error) {
    console.log(error);
  }
  
};

export const getDomainAS = async () => {
  try {
    const { data } = await axios.get(url + "domain/allDomainsAS");
    return data;
  } catch (error) {
    console.log(error);
  }
  
};
export const getCourseASId = async (id) => {
  try {
    const { data } = await axios.get(url + "CoursesASIdDomain/"+id);
    return data;
  } catch (error) {
    console.log(error);
  }
  
};
export const uploadImg = async (img) => {
 
  try {
    const { data } = await axios.post("http://localhost:3000/upload/upload",img);
   
    return data;
    
  } catch (error) {
    console.log(error);
  }
  
};
export const getChapterCId = async (id) => {
  try {
    const { data } = await axios.get(url + "chapter/getCourseChp/"+id);
    return data;
  } catch (error) {
    console.log(error);
  }}
  export const pushChpCr = async (chapter,idC) => {
    try {
      
      const chp=await addChapitreAS(chapter);
      

      const { data } = await axios.put("http://localhost:3000/courseAS/addChToCourse/"+idC+"/"+chp._id);
      return data;
    } catch (error) {
      console.log(error);
    }}

