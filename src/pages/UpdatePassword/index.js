import React, { useState } from "react";
import FormGroupAuth from "../../components/FormInputAuth";
import GreenButton from "../../components/Button/GreenButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../../api/axios";
import AlertModal from "../../components/Modal/AlertModal";
import Loader from "../../components/Modal/loader";
import { useSelector } from "react-redux";

const UpdatePassword = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnText, setBtnText] = useState("update");
  const [updatePasswordDetails, setUpdatePasswordDetails] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const handleUpdatePassword = async () => {
    try {
      setLoading(true);
      await apiRequest.patch("/users/updateMyPassword", updatePasswordDetails);
      setLoading(false);
      setBtnText("updated");
      setTimeout(() => {
        navigate(-1);
      }, 500);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
    // console.log(updatePasswordDetails);
  };

  const forgetPassword = async () => {
    try {
      setLoading(true);
      await apiRequest.post("/users/forgotPassword", {
        email: user?.email,
      });
      setLoading(false);
      navigate("/resetpassword");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  console.log(location);

  const handleReset = async () => {
    const newObject = { ...updatePasswordDetails };
    delete newObject["passwordCurrent"];
    if (
      !updatePasswordDetails.password ||
      !updatePasswordDetails.passwordConfirm
    ) {
      console.log("Please fill all fields");
    }
    const reset = { ...newObject, email: user?.email };

    try {
      setLoading(true);
      await apiRequest.post("/users/resetPasswordDone", reset);
      setLoading(false);
      setBtnText("updated");
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <section className="update-password">
      {loading && <Loader />}
      <AlertModal message={error} state={error} setState={setError} />
      <div className="ec-icon" onClick={() => navigate(-1)}>
        <ArrowBackIosRoundedIcon
          color="success"
          fontSize="large"
          className="icon"
        />
      </div>
      <div className="container update-password-container">
        <h2 className="update-password-heading ">Change Password</h2>
        <div className="update-password-form">
          {!location.state?.resetPassword && (
            <FormGroupAuth
              showPasswordIcon
              label="Current Password"
              setValue={(data) =>
                setUpdatePasswordDetails({
                  ...updatePasswordDetails,
                  passwordCurrent: data,
                })
              }
            />
          )}
          <FormGroupAuth
            showPasswordIcon
            label="New Password"
            setValue={(data) =>
              setUpdatePasswordDetails({
                ...updatePasswordDetails,
                password: data,
              })
            }
          />
          <FormGroupAuth
            showPasswordIcon
            label="Confirm Password"
            setValue={(data) =>
              setUpdatePasswordDetails({
                ...updatePasswordDetails,
                passwordConfirm: data,
              })
            }
          />
        </div>
        {btnText !== "update" ? (
          <Link to="/profile">
            <GreenButton paddingX text="Updated" />
          </Link>
        ) : (
          <span
            onClick={() =>
              !location.state?.resetPassword
                ? handleUpdatePassword()
                : handleReset()
            }
          >
            <GreenButton paddingX text="Update" />
          </span>
        )}
        {!location.state?.resetPassword && (
          <>
            <p className="update-password-or">Or</p>
            <div onClick={() => forgetPassword()}>
              <p className="update-password-forgot-password">
                Forgot Password?
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default UpdatePassword;
