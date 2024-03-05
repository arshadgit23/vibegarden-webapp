import React from "react";
import images from "../../constants/images";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { red } from "@mui/material/colors";
import classes from "./style.module.css";
import dummyImage from "../../assets/images/user.png";

const UserButton = ({ userImage, username, onClickFunction = () => null }) => {
  return (
    <div className="user-btn" onClick={() => onClickFunction()}>
      <div className="user-btn-img-container">
        {userImage ? (
          <img src={userImage} className={`${classes.userImage}`} />
        ) : (
          <img src={dummyImage} className={`${classes.userImage}`} />
        )}
      </div>
      <p className="user-btn-name">{username}</p>
      <KeyboardArrowDownIcon
        fontSize="large"
        sx={{ color: red[400] }}
        className="user-btn-icon"
      />
    </div>
  );
};

export default UserButton;
