// Library Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
// Redux Slices
import { setUser, setUrl } from "../../redux/slices/userSlice.js";
import { setLoading } from "../../redux/slices/loadingSlice";
// Custom Imports
import { apiRequest } from "../../api/axios";
import PinCodeInput from "../../components/PinCodeInput.js";
import ButtonFilled from "../../components/Button/ButtonFilled.js";
import AlertModal from "../../components/Modal/AlertModal";

const EmailConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // States
  const [error, setError] = useState(false);
  const [btnText, setBtnText] = useState(false);
  const [pci, setPci] = useState({
    pci1: "",
    pci2: "",
    pci3: "",
    pci4: "",
    // pci5: "",
    // pci6: "",
  });
  // Redux State Reads
  const user = useSelector((state) => state?.user?.user);

  console.log(user);
  // verify user OTP
  const verifyUser = async () => {
    let otp = "";
    for (let value in pci) {
      otp += pci[value];
    }

    try {
      dispatch(setLoading(true));
      const { data } = await apiRequest.post("/users/verify-me", {
        verificationCode: otp,
        email: user?.email,
      });

      console.log(data.data.user);
      if (data?.status === "success") {
        dispatch(setUser(data?.data?.user));
        dispatch(setLoading(false));
        setBtnText(true);
        setError("Nice, You're Confirmed");
        dispatch(setUrl(data?.data?.url));
        setTimeout(() => {
          window.location.replace(data.data.url);
        }, 1500);
      }
    } catch (err) {
      dispatch(setLoading(false));
      const data = err?.response?.data;
      setError(data?.message);
    }
  };
  // Resend OTP
  const resendOTP = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiRequest.post("/users/resend-otp");

      if (data.status === "success") {
        dispatch(setUser(data.data));
        setTimeout(() => {
          dispatch(setLoading(false));
          setError("OTP has been resent successfully");
        });
      }
    } catch (err) {
      dispatch(setLoading(false));
      if (err.response.status === 429)
        return setError("1 OTP can be resent 2 in minutes only");
      const data = err?.response?.data;
      setError(data?.message);
    }
  };

  return (
    <section className="ec">
      <AlertModal state={error} message={error} setState={setError} />
      <div className="ec-icon" onClick={() => navigate(-1)}>
        <ArrowBackIosRoundedIcon
          color="success"
          fontSize="large"
          className="icon"
        />
      </div>
      <div className="container ec-container">
        <h3 className="ec-heading">Email Confirmation</h3>
        <p className="ec-para">
          {`Please enter the 4 digit code sent to your registered email address
                ${user?.email}`}
        </p>
        <PinCodeInput pci={pci} setPci={setPci} />
        {!btnText ? (
          <div
            className="ec-btn-container"
            onClick={() => {
              const inputOTP = Object.values(pci).join("");
              verifyUser(inputOTP);
            }}
          >
            <ButtonFilled bgGradient={"yes"} text="Confirm" paddingX />
          </div>
        ) : (
          <div
            className="ec-btn-container"
            onClick={() =>
              navigate("/join-us", { state: { isEmailVerified: "yes" } })
            }
          >
            <ButtonFilled bgGradient={"yes"} text="Confirmed" paddingX />
          </div>
        )}
        <p
          className="resend-otp"
          onClick={() => {
            resendOTP();
          }}
        >
          Resend Confirmation Code
        </p>
      </div>
    </section>
  );
};

export default EmailConfirmation;
