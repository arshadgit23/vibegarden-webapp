import React from "react";
import images from "../../constants/images";
import VideoCard from "../VideoCard/VideoCard";
import VidCard from "../VidCard";
import ButtonFilled from "../Button/ButtonFilled";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateSrc } from "../../redux/slices/videoSlice";

const WhiteInfoCard = ({
  heading = "Heading",
  para = "Body copy style for white text on dark or gradient backgrounds (Medium Weight) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat euismod porttitor.",
  image = images.placeholder4,
  btnText = "Button Text",
  linkText = "/",
  videoLink = "//vjs.zencdn.net/v/oceans.mp4",
  videoDuration = "3:15",
}) => {
  const homepage = useSelector((state) => state.homepage);
  const dispatch = useDispatch();

  return (
    <div className="wic">
      <h4 className="wic-heading">{heading}</h4>
      <p className="wic-para">{para}</p>
      <div
        className="wic-vid-container"
        // onClick={() => dispatch(updateSrc(videoLink))}
      >
        <VidCard
          image={image}
          noTitle
          videoSrc={videoLink}
          time={videoDuration}
        />
      </div>
      <div className="wic-btn-container">
        <Link to={linkText}>
          <ButtonFilled bgGradient={"yes"} text={btnText} />
        </Link>
      </div>
    </div>
  );
};

export default WhiteInfoCard;
