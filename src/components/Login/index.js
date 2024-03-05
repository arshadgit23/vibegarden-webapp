// Library Imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
// Redux Slices
import { setLoading } from "../../redux/slices/loadingSlice";
import { setUser, saveToken } from "../../redux/slices/userSlice";
import { signUpUser } from "../../redux/slices/signUpUserSlice";
// Custom Importrs
import { apiRequest } from "../../api/axios";
import images from "../../constants/images";
import AlertModal from "../../components/Modal/AlertModal";
import ContainerSection from "../Container";
import FormGroupAuth from "../FormInputAuth";
import ButtonFilled from "../Button/ButtonFilled";
import EmailConfirmation from "../../pages/EmailConfirmation";

// Checkbox Icon
// ***************************
const RememberMeCheckboxIcon = styled("span")(({ theme }) => ({
  borderRadius: 5,
  width: 15,
  height: 15,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor:
      theme.palette.mode === "dark" ? "#30404d" : "rgba(255, 84, 90, 1)",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const RememberMeCheckedIcon = styled(RememberMeCheckboxIcon)({
  backgroundColor: "rgba(255, 84, 90, 1)",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 15,
    height: 15,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "rgba(255, 84, 90, 1)",
  },
});
// *****************************************

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // States
  const [state, setState] = useState({
    email: "",
    password: "",
    // email: "ak704047@gmail.com",
    // password: "12345678",
  });
  const [paymentIncomplete, setPaymentIncomplete] = useState(false);
  const [error, setError] = useState(false);

  // OnClick Handlers
  const loginUser = async () => {
    try {
      if (!state.email || !state.password)
        return setError("Please fill in your email and password");
      dispatch(setLoading(true));

      const { data } = await apiRequest.post("/users/login", {
        email: state.email,
        password: state.password,
      });

      console.log(data.data.url);
      if (data.status === "success") {
        dispatch(setUser(data.data.user));
        // dispatch(signUpUser(data.data.user));
        dispatch(saveToken(data.token));
        // setTimeout(() => {
        dispatch(setLoading(false));
        // if (
        //   // data?.data?.user?.isPaymentDone &&
        //   data.data.user.avatar &&
        //   data.data.user.bloom &&
        //   data.data.user.bloomPercentage
        // )
        //   navigate("/");
        if (!data.data.user.isVerified) navigate("/email-confirmation");
        // else if (!data.data.user.isPaymentDone) navigate("/join-us");
        else if (!data.data.user.isPaymentDone)
          window.location.replace(data.data.url);
        else if (!data.data.user.avatar) navigate("/selectAvatar");
        else if (!data.data.user.bloom) navigate("/selectbloom");
        else if (!data.data.user.bloomPercentage) navigate("/bloomcheck");
        else navigate("/");
        // }, );
      }
      localStorage.setItem("token", data.token);
    } catch (err) {
      // console.log("catching error", err);
      dispatch(setLoading(false));
      if (err.message === "Network Error") return setError("Network Error");
      const data = err?.response?.data;
      if (data?.specialMessage === "paymentIncomplete") {
        setPaymentIncomplete(true);
        // dispatch(signUpUser(data?.specialData));
        setError(data?.message);
      }
      setError(data?.message);
    }
  };

  return (
    <section className="login">
      <AlertModal
        state={error}
        message={error}
        setState={setError}
        navigateTo={paymentIncomplete ? "/join-us" : false}
      />
      <div className="ec-icon" onClick={() => navigate("/home")}>
        <ArrowBackIosRoundedIcon
          color="success"
          fontSize="large"
          className="icon"
        />
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "20px",
          // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          marginInline: "auto",
          width: "30%",
          border: "1px rgba(27, 91, 47, 0.3) solid",
        }}
      >
        <div className="container login-container">
          <div className="login-img">
            <img src={images.logo3} width={100} />
          </div>
          <h3 className="login-heading">Login</h3>
          <form action="#" className="login-form">
            <FormGroupAuth
              label="Email Address"
              inputType="email"
              value={state.email}
              setValue={(val) => setState({ ...state, email: val })}
            />
            <FormGroupAuth
              label="Password"
              inputType="password"
              value={state.password}
              setValue={(val) => setState({ ...state, password: val })}
              showPasswordIcon
            />
            <div className="form-options">
              <div className="login-checkbox">
                <Checkbox
                  icon={<RememberMeCheckboxIcon />}
                  checkedIcon={<RememberMeCheckedIcon />}
                />
                <p className="login-form-label">Remember</p>
              </div>
              <p
                className="login-forgot-password"
                onClick={() => navigate("/resetpassword")}
              >
                Forgot Password?
              </p>
            </div>
            <div
              className="login-button"
              onClick={(e) => {
                e.preventDefault();
                loginUser();
              }}
            >
              {/* <Link to="/selectavatar"> */}
              <ButtonFilled text="Login" bgGradient={"yes"} paddingX />
              {/* </Link> */}
            </div>
            <h3 className="login-or">OR</h3>
            <p className="login-signup">
              Don't have an account ?{" "}
              <span>
                <Link to="/join-us">Sign Up</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
