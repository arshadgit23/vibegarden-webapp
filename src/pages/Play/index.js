import React from "react";
import NavBar from "../../components/Navbar";
import FourColumnVideoLayout from "../../components/FourColumnVideoLayout.js";
import Footer from "../../components/Footer";
import { dummyVideodata } from "../../constants/dummyVideoData";
import { Link, useNavigate } from "react-router-dom";

const Play = () => {
  return (
    <div className="fcvl-caller">
      <NavBar />
      <FourColumnVideoLayout
        searchInput
        heading="Play"
        dataArray={dummyVideodata}
        backLink
        linkDestination="/groundwork"
        groundWork
        searchState="groundwork"
        searchCatState={["play"]}
      />
      <Footer />
    </div>
  );
};

export default Play;
