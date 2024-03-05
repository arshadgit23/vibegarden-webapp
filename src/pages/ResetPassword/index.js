import React, { useState } from "react";
import PinCodeInput from "../../components/PinCodeInput.js";
import ButtonFilled from "../../components/Button/ButtonFilled.js";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../../api/axios.js";
import { setLoading } from "../../redux/slices/loadingSlice.js";
import AlertModal from "../../components/Modal/AlertModal.js";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const navigate = useNavigate();
  const [resetPasswordVerified, setResetPasswordVerified] = useState(false);
  const [error, setError] = useState(false);
  const [pci, setPci] = useState({
    pci1: "",
    pci2: "",
    pci3: "",
    pci4: "",
    pci5: "",
    pci6: "",
  });

  const resetpassword = async () => {
    let otp = "";
    for (let value in pci) {
      otp += pci[value];
    }

    try {
      dispatch(setLoading(true));
      await apiRequest.post("/users/verify-forgot-password-otp", {
        otpCode: Number(otp),
        email: user?.email,
      });

      dispatch(setLoading(false));
      setResetPasswordVerified(!resetPasswordVerified);
    } catch (err) {
      dispatch(setLoading(false));
      const data = err?.response?.data;
      setError(data?.message);
    }
  };

  return (
    <section className="ec">
      <AlertModal message={error} state={error} setState={setError} />

      <div className="ec-icon" onClick={() => navigate(-1)}>
        <ArrowBackIosRoundedIcon
          color="success"
          fontSize="large"
          className="icon"
        />
      </div>
      <div className="container ec-container">
        <h3 className="ec-heading">Reset Password</h3>
        <p className="ec-para">
          {`Please enter the 6 digits code sent to you registered email address ${user?.email}`}
        </p>
        <PinCodeInput pci={pci} setPci={setPci} />

        {!resetPasswordVerified ? (
          <div className="ec-btn-container" onClick={() => resetpassword()}>
            <ButtonFilled bgGradient={"yes"} text="Confirm" paddingX />
          </div>
        ) : (
          <div
            className="ec-btn-container"
            onClick={() =>
              navigate("/updatepassword", {
                state: { resetPassword: true },
              })
            }
          >
            <ButtonFilled bgGradient={"yes"} text="Confirmed" paddingX />
          </div>
        )}
      </div>
    </section>
  );
};

export default ResetPassword;
