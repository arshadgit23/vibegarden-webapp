import React, { useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";
import VideoPlayer from "./VideoPlayer";
import images from "../../constants/images";

const Modal = ({ showModal, setShowModal, image }) => {
  const videoJsOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    // width: 720,
    // height: 300,
    controls: true,
    sources: [
      {
        src: "//vjs.zencdn.net/v/oceans.mp4",
        type: "video/mp4",
      },
    ],
  };
  // const videoRef = useRef(null);
  // const playerRef = useRef(null);
  // useEffect(()=>{

  // })
  return (
    <div className="modalComp">
      <div className="modalComp-container"></div>
      <div className="modalComp-icon" onClick={() => setShowModal(false)}>
        <CloseIcon sx={{ fontSize: 40, color: grey[50] }} />
      </div>
      <div className="modalComp-video">
        <VideoPlayer {...videoJsOptions} image={image} />
      </div>
      {/* <video className="video-js vjs-big-play-centered" /> */}
      {/* <videojs {...videoJsOptions} />
       */}
    </div>
  );
};

export default Modal;
