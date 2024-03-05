import React from "react";
import images from "../../constants/images";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { green } from "@mui/material/colors";

const AppDownload = () => {
  const navigate = useNavigate();
  return (
    <section className="app-download bg-greenMask-light">
      <div className="rotatedIcon" onClick={() => navigate(-1)}>
        <ArrowBackIosRoundedIcon
          // fontSize="large"
          sx={{ color: green[50], fontSize: 32 }}
          className="icon"
        />
      </div>
      <div className="add-card-container">
        <div className="add-card card border-0">
          <h4>You're invited to meditate on Vibe Garden</h4>
          <p>Scan QR to download the app</p>
          <div className="ad-card-qrcode">
            <img src={images.qrCode} />
          </div>
        </div>
        <div className="circle-img">
          <img src={images.logo4} />
        </div>
      </div>

      {/* <h1>dxms</h1> */}
      {/* <div className="ad-card-container">
        <div className="ad-card card border-0">
          <h4>You're invited to meditate on Vibe Garden</h4>
          <p>Scan QR to download the app</p>
          <div className="ad-card-qrcode">
            <img src={images.qrCode} />
          </div>
        </div>
        <div className="circle-img">
          <img src={images.logo4} />
        </div>
      </div> */}
    </section>
  );
};

export default AppDownload;
