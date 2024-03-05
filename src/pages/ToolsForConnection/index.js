import React from "react";
import NavBar from "../../components/Navbar";
import FourColumnVideoLayout from "../../components/FourColumnVideoLayout.js";
import Footer from "../../components/Footer";
import { dummyVideodata } from "../../constants/dummyVideoData";
import { Link, useNavigate } from "react-router-dom";

const ToolsForConnection = () => {
  return (
    <div className="fcvl-caller">
      <NavBar />
      <FourColumnVideoLayout
        searchInput
        heading="Tools For Connection"
        dataArray={dummyVideodata}
        backLink
        linkDestination="/tools"
        backText="Tools"
        tools
        searchState="tools"
        searchCatState={['tools for connection']}
      />
      <Footer />
    </div>
  );
};

export default ToolsForConnection;
