import React, { useState } from 'react'
import { uploadImg } from './CourseASApi'

export default function Testimg() {
  const [state,setState] = useState({ selectedFile: null })
  const [fil,setFil]=useState();

  const uploadHandler = (e) => { 
    const data = new FormData()
    data.append('file', state.selectedFile)
    upload(data)

        localStorage.setItem('upload',fil.filename)

  }
  const upload = async(data) => { 
    const result= await uploadImg(data) .catch((error) => {
    console.log(error);
});

localStorage.setItem('upload',result.filename);
}
  return (
  <form>
    <input type="file" name="file" multiple  onChange={(e) =>setState({selectedFile: e.target.files[0],loaded: 0 })}/>
    <button onClick={()=>uploadHandler()}>Upload!</button>
  </form>
  )
}
