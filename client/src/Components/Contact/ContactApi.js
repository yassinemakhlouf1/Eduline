import axios from "axios";
const url="https://eduline-technonet.herokuapp.com/contact/post";
  /* contact */
  export const sendInfo = async (data1) => {
    try {
        localStorage.setItem('aa',JSON.stringify(data1))
    const { data } = await axios.post(
      url ,
      data1
    );

    return data;
  } catch (error) {
    console.log(error);
  }
  
};