import React from "react";
import images from "../../constants/images";
import { RiArrowLeftLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const AvatarInfo = () => {
  const { state } = useLocation();
  return (
    <div className="avatar-infoAndImage row ">
      <div className="avatar-info col-6">
        <Link to="/selectavatar">
          <span className="avatar-back">
            <RiArrowLeftLine size={30} fill="white" />
          </span>
        </Link>
        <h2>Meet {state.heading}</h2>
        <p>{state.description}</p>
      </div>
      <div className="avatar-img col-6">
        <img src={state.image} />
      </div>
    </div>
  );
};

export default AvatarInfo;
