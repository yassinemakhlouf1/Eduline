import React, { useState } from 'react';
import { sendInfo } from './ContactApi';

export default function Contact() {
  const [status, setStatus] = useState();
  const [cnt, setCnt] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Msg:"",
  });
  const onSubmit=async(e)=>{
    e.preventDefault();
    try {
await sendInfo(cnt).then(() => {
  setStatus('success');
}).catch((err)=>{
  setStatus('Quelque chose ne va pas')
}

)

      }
      catch (error) {
        console.log(error);
      }
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
            <form action="">
              <div>
                <input type="text" placeholder="Full Name " onChange={(e) =>
                      setCnt({ ...cnt, Name: e.target.value })
                    } />
              </div>
              <div>
                <input type="text" placeholder="Phone Number"  onChange={(e) =>
                      setCnt({ ...cnt, Phone: e.target.value })
                    }/>
              </div>
              <div>
                <input type="email" placeholder="Email Address"  onChange={(e) =>
                      setCnt({ ...cnt, Email: e.target.value })
                    } />
              </div>
              <div>
                <input type="text" placeholder="Message" class="input_message"  onChange={(e) =>
                      setCnt({ ...cnt, Msg: e.target.value })
                    } />
              </div>
              <div class="d-flex justify-content-center">
              {status && <div className="error"> {status} </div>}
                <button type="submit" class="btn_on-hover"  onClick={()=>onSubmit()}>
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
