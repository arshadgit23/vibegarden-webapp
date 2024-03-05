import React from "react";
import images from "../../constants/images";
import ButtonFilled from "../../components/Button/ButtonFilled";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="thankyou">
      <div className="ec-icon">
        <Link to="/payment">
          <ArrowBackIosRoundedIcon
            color="success"
            fontSize="large"
            className="icon"
          />
        </Link>
      </div>
      <div className="thankyou-img">
        <img src={images.logo3} />
      </div>
      <h3 className="thankyou-heading">Thank You!</h3>
      <p className="thankyou-desc">Katie Will Email With Zoom Information</p>
      <p className="thankyou-details">
        Schedule Details : 02:00 PM | 2/30/2022
      </p>
      <div>
        <Link to="/schedule">
          <ButtonFilled text="Done" bgGradient={"yes"} paddingX />
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
