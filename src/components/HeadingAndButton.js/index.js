import React, { useState } from "react";
import ButtonFilled from "../Button/ButtonFilled";
import { Link } from "react-router-dom";
import AlertModal from "../Modal/AlertModal";
import { useSelector } from "react-redux";
import { apiRequest } from "../../api/axios";
import Loader from "../Modal/loader";

const ButtonAndHeading = () => {
  const [alertMessage, setAlertMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const joinWaitingList = async () => {
    try {
      setLoading(true);
      const response = await apiRequest.post(`users/join/waiting/list`);
      setLoading(false);
      setAlertMessage("You are added to waitlist.");
    } catch (err) {
      setLoading(false);
      if (err.message === "Network Error")
        return setAlertMessage("Network Error");
      const data = err?.response?.data;
      setAlertMessage(data?.message);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <AlertModal
        state={alertMessage}
        setState={setAlertMessage}
        message={alertMessage}
        // navigateTo="/login"
        onOverlay={() => {
          setAlertMessage(false);
        }}
      />
      <div className="buttonAndHeading">
        <h2 className="bah-heading">Interested In Become Vibeguide?</h2>
        <div onClick={joinWaitingList}>
          <ButtonFilled
            text={"Join The Waiting List"}
            padXResponsive
            bgGradient={"yes"}
            paddingY
          />
        </div>
      </div>
    </>
  );
};

export default ButtonAndHeading;
