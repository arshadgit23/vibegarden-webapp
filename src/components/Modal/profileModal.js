import React, { useRef, useEffect } from "react";

import images from "../../constants/images";
import ButtonFilled from "../Button/ButtonFilled";

const ProfileModal = ({ showModal, setShowModal }) => {
  return (
    <div className="profile-modalComp">
      <div className="profile-modalComp-container">
        <div className="profile-modalComp-icon">
          <img src={images.logo4} />
        </div>
        <h4>Changes Saved</h4>
        <div onClick={() => setShowModal(false)}>
          <ButtonFilled bgGradient={"yes"} text="Close" paddingX />
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
