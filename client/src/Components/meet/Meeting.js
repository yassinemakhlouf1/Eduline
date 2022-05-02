import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function Meeting() {
  const { id} = useParams();
  
  useEffect(() => {
    const domain = "https://eduline.daily.co/";

    axios
      .get(`https://eduline-technonet.herokuapp.com/video-call/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const script = document.createElement("script");
          script.innerHTML = `window.DailyIframe.createFrame({
            iframeStyle: {
              position: "relative",
              width: "1900px",
              height: "1000px",
              border: "50",
              zIndex: 9999
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          }).join({
            url: "${domain}${id}",
          });`;

          document.body.appendChild(script);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  return <div ></div>;
}
