// Library Imports
import React, { useRef, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import Modal from "../Modal";
import VideoIcon2nd from "../../assets/images/video-tag-icon.svg";
import VideoIcon from "../../assets/images/video-icon.svg";
import VideoIconPink from "../../assets/images/video-icon-pink.svg";
import { apiRequest } from "../../api/axios";
import AlertModal from "../Modal/AlertModal";
import { setUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import LightButton from "../Button/LightButton";
import { useEffect } from "react";

const VidCard = ({
  titleIcon,
  blackTitle,
  image,
  title,
  time,
  noTitle,
  pinkVideoIcon,
  recentVibes,
  groundwork,
  freshBlooms,
  tool,
  linkVideo,
  videoSrc,
  video,
  id,
  showDetailButton,
}) => {
  const videoRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [addTool, setAddTool] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoDuration, setVideoDuration] = useState("3:00");
  const dispatch = useDispatch();
  // const { toolsToTry, favourites } = useSelector((state) => stat e?.user?.user);
  const toolsToTry = useSelector((state) => state?.user?.user?.toolsToTry);
  const favourites = useSelector((state) => state?.user?.user?.favourites);
  const navigate = useNavigate();

  const isVideoInToolsToTry = toolsToTry?.some((tool) => tool._id === id);
  const isVideoInFavourites = favourites?.some(
    (favourite) => favourite._id === id
  );

  function formatVideoDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    console.log("minutes", minutes);
    const seconds = Math.floor(durationInSeconds % 60);
    console.log("seconds", seconds);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  // useEffect(() => {
  //   const duration = videoRef?.current?.duration;
  //   console.log(`Video duration: ${duration} seconds`);
  //   const formattedDuration = formatVideoDuration(duration);
  //   setVideoDuration(formattedDuration);
  // }, [videoSrc]);

  const playingVideo = (id) => {
    var minutes = parseInt(videoRef.current.duration / 60, 10);
    var seconds = videoRef.current.duration % 60;
    console.log(minutes, seconds);
    videoRef?.current?.play();

    if (id) {
      const addToRecent = async () => {
        try {
          setLoading(true);
          const response = await apiRequest.patch(`videos/add-to-recent/${id}`);
          dispatch(setUser(response?.data?.data));
          setLoading(false);
        } catch (err) {
          setLoading(false);
          if (err.message === "Network Error") return setError("Network Error");
          const data = err?.response?.data;
          setError(data?.message);
        }
      };
      addToRecent();
    }
  };

  return (
    <>
      <AlertModal message={error} state={error} setState={setError} />

      <div
        className={`card vid-card border-0`}
        style={{ position: "relative" }}
      >
        <video
          controls={playVideo}
          controlsList="nodownload"
          poster={image}
          ref={videoRef}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            backgroundColor: "transparent",
            width: "100%",
            height: "100%",
            objectFit: "fill",
          }}
        >
          <source
            src={`${videoSrc}`}
            // src={linkVideo}
            type="video/mp4"
          ></source>
        </video>
        {!playVideo && (
          <>
            <img src={image} className="vid-card-image" />
            <div className="vid-card-titleAndIcon">
              {titleIcon && <img src={VideoIcon2nd} />}
              {titleIcon && (
                <h5 className={`vid-card-title ${blackTitle && "text-black"}`}>
                  {title?.length > 7 ? `${title.slice(0, 6)}...` : title}
                </h5>
              )}
            </div>

            <div
              style={{
                position: "absolute",
                top: "5%",
                right: "5%",
              }}
            >
              {/* {(groundwork || freshBlooms) && true && (
                <span
                  className="vid-card-heart"
                  onClick={() => {
                    setIsFav(!isFav);
                  }}
                >
                  {!isFav ? (
                      <BsHeart size={20} color="rgba(214, 16, 153, 1)" />
                  ) : (
                    <BsHeartFill size={20} color="rgba(214, 16, 153, 1)" />
                  )}
                </span>
              )} */}

              <span
                className="vid-card-heart"
                onClick={() => {
                  setIsFav(!isFav);
                }}
              >
                {!isVideoInFavourites ? (
                  <BsHeart size={20} color="rgba(214, 16, 153, 1)" />
                ) : (
                  <BsHeartFill size={20} color="rgba(214, 16, 153, 1)" />
                )}
              </span>

              {/* {tool && (
              <span
                className="vid-card-heart"
                onClick={() => {
                  setAddTool(!addTool);
                }}
              >
                {!addTool ? (
                  <AiOutlinePlusCircle
                    size={24}
                    color="rgba(214, 16, 153, 1)"
                    onClick={addToToolsToTry}
                  />
                ) : (
                  <AiFillPlusCircle size={24} color="rgba(214, 16, 153, 1)" />
                )}
              </span>
            )} */}
              <span className="vid-card-plus">
                {!isVideoInToolsToTry ? (
                  <AiOutlinePlusCircle
                    size={24}
                    color="rgba(214, 16, 153, 1)"
                  />
                ) : (
                  <AiFillPlusCircle size={24} color="rgba(214, 16, 153, 1)" />
                )}
              </span>
            </div>

            {!titleIcon && !noTitle && (
              <h5 className={`vid-card-topTitle ${blackTitle && "text-black"}`}>
                {title}
              </h5>
            )}
            {/* <Link to={linkVideo}> */}
            <img
              onClick={() => {
                setPlayVideo(true);
                playingVideo(id);
              }}
              src={pinkVideoIcon ? VideoIconPink : VideoIcon}
              className="vid-card-video-icon"
            />
            {/* </Link> */}
            <p className="vid-card-time">{videoDuration && videoDuration}</p>
          </>
        )}
        {showDetailButton ? (
          <div
            style={{ position: "absolute", bottom: -45 }}
            onClick={() =>
              navigate(`${id}`, {
                state: id,
              })
            }
          >
            <LightButton text="Details" />
          </div>
        ) : null}
      </div>
      {showModal && <Modal showModal={showModal} setShowModal={setShowModal} />}
    </>
  );
};

export default VidCard;
