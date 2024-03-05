import React, { useState } from "react";
import VideoIcon from "../../assets/images/video-icon.svg";
import images from "../../constants/images";
import Modal from "../Modal";

const VideoCard = ({
  time = "00:00",
  title,
  leftMargin,
  rightMargin,
  width = "300px",
  height = "230px",
  image = images.placeholder4,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="vc-container"
        style={{
          marginLeft: leftMargin,
          marginRight: rightMargin,
          width: width,
          height: height,
        }}
      >
        <img src={image} className="vc-img" />
        {title && <p className="vc-title">{title}</p>}
        <img src={VideoIcon} className="vc-icon" />
        <p className="vc-time">{time}</p>
      </div>
      {showModal && (
        // <div onClick={() => setShowModal(false)}>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          image={image}
        />
        // </div>
      )}
    </>
  );
};

export default VideoCard;
