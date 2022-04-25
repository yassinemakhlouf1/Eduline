import React, { useState } from 'react';
import { sendInfo } from './ContactApi';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object().shape({
  Name: yup.string().required("Name should be required please"),
  Email: yup.string().email().required(),
  Phone: yup.number().min(8).required(),
  Msg: yup.string().required(),
});
export default function Contact() {
 
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [cnt, setCnt] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Msg:"",
  });
  const onSubmit=async(e)=>{
   
    console.log(JSON.stringify(e))
    try {
await sendInfo(e).catch((err)=>{
 console.log(err)
}


)

      }
      catch (error) {
        console.log(error);
      }
      e.preventDefault();
  }
  return (
    <section class="contact_section">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="detail-box">
            <div class="heading_container">
              <h3>
                Contact Us
              </h3>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="contact-form">
            <h5>
              Get In Touch
            </h5>
            <form action="" >
              <div>
                <input type="text" placeholder="Full Name " name='Name'  onChange={(e) =>
                      setCnt({ ...cnt, Name: e.target.value() }) } {...register('Name')}  />
                    {errors.Name?.message && <p>{errors.Name?.message}</p>}
              </div>
              <div>
                <input type="number" placeholder="Phone Number" name='Phone' onChange={(e) =>
                      setCnt({ ...cnt, Phone: e.target.value })
                    } {...register('Phone')}/>
                    {errors.Phone?.message && <p>'8 number require'</p>}

              </div>
              <div>
                <input type="email" placeholder="Email Address" name='Email' onChange={(e) =>
                      setCnt({ ...cnt, Email: e.target.value })
                    } {...register('Email')} />
                    {errors.Email?.message && <p>{errors.Email?.message}</p>}

              </div>
              <div>
                <input type="text" placeholder="Message" class="input_message" name='Msg'  onChange={(e) =>
                      setCnt({ ...cnt, Msg: e.target.value })
                    } {...register('Msg')}/>
                    {errors.Msg?.message && <p>{errors.Msg?.message}</p>}

              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn_on-hover" onClick={handleSubmit((e)=>onSubmit(e))} >
                  Send
                </button>
                
           
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  )
}
