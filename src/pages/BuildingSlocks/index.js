import React from "react";
import NavBar from "../../components/Navbar";
import FourColumnVideoLayout from "../../components/FourColumnVideoLayout.js";
import Footer from "../../components/Footer";
import { dummyVideodata } from "../../constants/dummyVideoData";
import { Link, useNavigate } from "react-router-dom";

const BuildingSlocks = () => {
  return (
    <div className="fcvl-caller">
      <NavBar />
      <FourColumnVideoLayout
        searchInput
        heading="Building Slocks"
        dataArray={dummyVideodata}
        backLink
        linkDestination="/groundwork"
        groundWork
        searchState="groundwork"
        searchCatState={["building slocks"]}
      />
      <Footer />
    </div>
  );
};

export default BuildingSlocks;
