import React from "react";
import VideoIcon from "../../assets/images/video-icon-pink.svg";
import images from "../../constants/images";

const EmptyVideoCard = ({
  time = "00:00",
  title,
  leftMargin,
  rightMargin,
  width = "300px",
  height = "230px",
}) => {
  return (
    <div
      className="evc-container"
      style={{
        marginLeft: leftMargin,
        marginRight: rightMargin,
        maxWidth: width,
        height: height,
      }}
    >
      {title && <p className="evc-title">{title}</p>}
      <img src={VideoIcon} className="evc-icon" />
      <p className="evc-time">{time}</p>
    </div>
  );
};

export default EmptyVideoCard;
