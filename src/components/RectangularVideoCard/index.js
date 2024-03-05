import React from "react";
import VideoIcon from "../../assets/images/video-icon.svg";
import images from "../../constants/images";

const RectangularVideoCard = ({
  leftMargin,
  rightMargin,
  width,
  title,
  time = "00:00",
  image = images.placeholder4,
}) => {
  return (
    <div
      className="rvc-container"
      style={{
        marginLeft: leftMargin,
        marginRight: rightMargin,
        width: width,
      }}
    >
      <img src={image} className="rvc-image" />
      {title && <p className="rvc-title ">{title}</p>}
      <img src={VideoIcon} className="rvc-icon " />
      <p className="rvc-time">{time}</p>
    </div>
  );
};

export default RectangularVideoCard;
