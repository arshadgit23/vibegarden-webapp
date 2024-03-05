import React from "react";
import images from "../../constants/images";
import ButtonFilled from "../Button/ButtonFilled";
import { Link } from "react-router-dom";

const PleaseSignUpModal = () => {
  return (
    <div className="psup">
      <div className="psup card border-0">
        <div className="psup-circle-img">
          <img src={images.logo4} />
        </div>
        <h2>Join VibeGarden</h2>
        <p>Hey, you've reached the max content without joining .</p>
        <Link to="/join-us">
          <div className="psup-btn-container">
            <ButtonFilled text="Join Us" padXResponsive />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PleaseSignUpModal;
