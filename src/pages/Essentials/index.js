import React from "react";
import NavBar from "../../components/Navbar";
import FourColumnVideoLayout from "../../components/FourColumnVideoLayout.js";
import Footer from "../../components/Footer";
import { dummyVideodata } from "../../constants/dummyVideoData";
import { Link, useNavigate } from "react-router-dom";

const Essentials = () => {
  return (
    <div className="fcvl-caller">
      <NavBar />
      <FourColumnVideoLayout
        searchInput
        heading="Essentials"
        dataArray={dummyVideodata}
        backLink
        linkDestination="/groundwork"
        groundWork
        searchState="groundwork"
        searchCatState={["essentials"]}
      />
      <Footer />
    </div>
  );
};

export default Essentials;
