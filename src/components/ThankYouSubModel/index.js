import React, { useRef, useEffect } from "react";
import images from "../../constants/images";
import ButtonFilled from "../Button/ButtonFilled";

const ThankYouSubModal = ({ showModal, setShowModal }) => {
  return (
    <div className="tysm-modalComp">
      <div className="tysm-modalComp-container">
        <div className="tysm-modalComp-icon">
          <img src={images.logo4} />
        </div>
        <h4>Thank You For Subscribing</h4>
        <div onClick={() => setShowModal(false)}>
          <ButtonFilled bgGradient={"yes"} text="Close" paddingX />
        </div>
      </div>
    </div>
  );
};

export default ThankYouSubModal;
