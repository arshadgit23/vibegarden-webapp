import React from "react";
import { useLocation, useParams } from "react-router-dom";
import NavBar from "../../components/Navbar";
import FourColumnVideoLayout from "../../components/FourColumnVideoLayout.js";
import Footer from "../../components/Footer";
import { dummyVideodata } from "../../constants/dummyVideoData";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const TagVideos = () => {
  const { state } = useLocation();
  console.log("state", state);

  const { name } = useParams();

  return (
    <div className="fcvl-caller">
      <NavBar />
      <FourColumnVideoLayout
        heading={name}
        dataArray={state?.videos}
        groundWork
      />
      <Footer />
    </div>
  );
};

export default TagVideos;
