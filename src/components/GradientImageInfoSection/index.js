// Custom Imports
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Redux Slices
import { updateSrc } from "../../redux/slices/videoSlice";
// Custom Imports
import ButtonFilled from "../Button/ButtonFilled";
import images from "../../constants/images";
import VidCard from "../VidCard";
import imgeee from "../../assets/images/placeholder-2@2x.png";
import { useState } from "react";
import AlertModal from "../Modal/AlertModal";

const para = `Body copy style for white text on dark or gradient backgrounds
(Medium Weight) Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Mauris placerat euismod porttitor. Nam nec
mauris non magna facilisis volutpat ac sit amet nulla. Nullam
vestibulum velit vitae sem commodo tempor. Sed dapibus, est non
pulvinar fringilla, lorem libero laoreet erat, ac tristique elit
nisl eu metus. Sed fermentum erat sit amet enim blandit, quis
dictum nisi tempus. Etiam dui tellus, porttitor vitae rutrum a,
ultrices pharetra nulla.`;

const GradientImageInfoSection = ({
  noButton,
  heading = "Heading",
  desc = para,
  buttonText = "Button",
  btnLink = "#",
  videoLink = "//vjs.zencdn.net/v/oceans.mp4",
  videoImage,
  videoDuration,
  videoTitle,
  noTitle,
}) => {
  // Hooks
  const [alertMessage, setAlertMessage] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const userAccessHandler = () => {
    if (!user?.isPaymentDone) {
      setAlertMessage("Please login to access !");
    } else {
      setAlertMessage(false);
    }
  };
  return (
    <section className="giid">
      <AlertModal
        state={alertMessage}
        setState={setAlertMessage}
        message={alertMessage}
        navigateTo="/login"
        onOverlay={() => {
          setAlertMessage(false);
        }}
      />

      <div class="container giid-container py80">
        <div class="row giid-row">
          <div class="col-md-6 giid-col giid-left-col">
            <h2 className="giid-heading ">{heading}</h2>
            <p className="white-text section-text mt-2 mb-5">{desc}</p>
            {!noButton && (
              <Link
                to={!user?.isPaymentDone ? "#" : btnLink}
                onClick={userAccessHandler}
              >
                <div className="giid-btn-container">
                  <ButtonFilled
                    text={buttonText}
                    paddingYSmall
                    padXResponsive
                  />
                </div>
              </Link>
            )}
          </div>
          <div class="col-sm-6 giid-col giid-right-col">
            <div
              className="giid-vid-card"
              onClick={() => dispatch(updateSrc(videoLink))}
            >
              <VidCard
                image={videoImage}
                title={!noTitle && videoTitle}
                time={videoDuration}
                videoSrc={"//vjs.zencdn.net/v/oceans.mp4"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GradientImageInfoSection;
