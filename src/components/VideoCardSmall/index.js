import React from "react";
import VideoIcon from "../../assets/images/video-icon.svg";
import images from "../../constants/images";

const VideoCardSmall = ({
  time = "00:00",
  leftMargin,
  rightMargin,
  title,
  width,
  height,
}) => {
  return (
    <div
      className="vcs-container"
      style={{
        marginLeft: leftMargin,
        marginRight: rightMargin,
        width: width,
      }}
    >
      <img src={images.placeholder2} className="vcs-image" />
      {title && <p className="vcs-title ">{title}</p>}
      <img src={VideoIcon} className="vcs-icon " />
      <p className="vcs-time">{time}</p>
    </div>
  );
};

export default VideoCardSmall;
