import React from "react";
import images from "../../constants/images";
import { RiArrowLeftLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const BloomInfo = () => {
  const { state } = useLocation();
  return (
    <div className="avatar-infoAndImage row ">
      <div className="avatar-info col-6">
        <Link to="/selectbloom">
          <span className="avatar-back">
            <RiArrowLeftLine size={30} fill="white" />
          </span>
        </Link>
        <h2>Meet {state?.heading}</h2>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua.
        </p>
      </div>
      <div className="avatar-img col-6">
        <img src={state?.image} />
      </div>
    </div>
  );
};

export default BloomInfo;
