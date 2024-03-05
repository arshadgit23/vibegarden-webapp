// Library Imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Redux Slices
import { saveToken, setUser } from "../../redux/slices/userSlice";
// Custom Imports
import { apiRequest } from "../../api/axios";
import images from "../../constants/images";
import NavBar from "../../components/Navbar";
import CheckBoxList from "../../components/CheckBoxList";
import PaymentPlanCard from "../../components/PaymentPlanCard/PaymentPlanCard";
import Footer from "../../components/Footer";
import FormGroupAuth from "../../components/FormInputAuth";
import VidCard from "../../components/VidCard";
import AlertModal from "../../components/Modal/AlertModal";
import Loader from "../../components/Modal/loader";
import PaymentCard from "../../components/PaymentCard/PaymentCard";
import { usStates, ukCities, pkCities } from "./citiesData";

const JoinUs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Redux State Read
  const user = useSelector((state) => state?.user?.user);
  // Page render depending upon state
  // if (location.state && location.state.isEmailVerified) isEmailVerified = "yes";
  // States
  const [state, setState] = useState({
    // firstName: "abdul",
    // lastName: "khaliq",
    // userName: "abdulkhaliq",
    // email: "ak704047@gmail.com",
    // country: "UK",
    // state: "option2",
    // postalCode: "12345",
    // password: "12345678",
    // confirmPassword: "12345678",
    firstName: "",
    lastName: "",
    // userName: "",
    email: "",
    country: "",
    state: "",
    postalCode: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [reload, setReload] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [paymentDone, setIsPaymentDone] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({});

  useEffect(() => {
    if (user && user?.isVerified) setIsEmailVerified(true);
    if (user && user?.isPaymentDone) setIsPaymentDone(true);
    const getPackageData = async () => {
      try {
        setLoading(true);
        const response = await apiRequest.get("/packages", {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        setPackages(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }
    };
    getPackageData();

    const getSelectedPackage = async () => {
      try {
        setLoading(true);
        const response = await apiRequest.get(`/packages/${user?.package}`);
        setSelectedPackage(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }
    };
    if (user?.package && typeof user?.package !== "object") {
      getSelectedPackage();
    }
  }, [user]);

  // OnClick Handlers
  // No 1
  const signUpUserFunction = async () => {
    // console.log(state);
    var validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    try {
      if (!state.package) {
        return setError(`Please Select a package`);
      } else if (!state.firstName) {
        return setError(`Please Enter First Name`);
      }
      // else if (!state.lastName) {
      //   return setError(`Please Enter Last Name`);
      // }
      // else if (!state.userName) {
      //   return setError(`Please Enter User Name`);
      // }
      else if (!state.email) {
        return setError(`Please Enter Email`);
      }
      // else if (!state.postalCode) {
      //   return setError(`Please Enter a postal code`);
      // } else if (!state.country) {
      //   return setError(`Please Select a Country`);
      // } else if (!state.state) {
      //   return setError(`Please Select a State`);
      // }
      else if (!state.password) {
        return setError(`Please Enter Password`);
      } else if (state.password.length < 8) {
        return setError(`Password must contain more than 8 characters`);
      } else if (!state.confirmPassword) {
        return setError(`Please Enter Confirm Password`);
      } else if (state.confirmPassword.length < 8) {
        return setError(`Password must contain more than 8 characters`);
      } else if (state.password !== state.confirmPassword) {
        return setError(`Password Does not match`);
      } else if (!state.email.toLowerCase().match(validRegex)) {
        return setError(`Invalid Email Address`);
      }

      if (
        !state.firstName ||
        // !state.lastName ||
        // !state.userName ||
        !state.email ||
        !state.password ||
        !state.confirmPassword
        // !state.package ||
        // !state.country ||
        // !state.state ||
        // !state.postalCode
      )
        return setError(`Please fill out all fields`);

      setLoading(true);
      // dispatch(setLoading(true));
      const response = await apiRequest.post("/users/signup", {
        firstName: state.firstName,
        // lastName: state.lastName,
        // userName: state.userName,
        email: state.email,
        package: state.package,
        // country: state.country,
        // state: state.state,
        // postalCode: state.postalCode,
        password: state.password,
        passwordConfirm: state.confirmPassword,
      });

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        // dispatch(signUpUser(response.data.data.user));
        console.log(response.data.data.user);
        dispatch(setUser(response.data.data.user));
        dispatch(saveToken(response.data.token));
        setAccountCreated(true);
        setLoading(false);
        // navigate("/payment");
      }
    } catch (err) {
      setLoading(false);
      if (err.message === "Network Error") return setError("Network Error");
      setError(err.response.data.message);
    }
  };

  return (
    <div className="join-us">
      {loading && <Loader />}
      <AlertModal
        state={error}
        message={error}
        setState={setError}
        reload={reload}
      />
      <AlertModal
        state={accountCreated}
        message={"Account created Successfully! Please verify your account"}
        setState={setAccountCreated}
        navigateTo="/email-confirmation"
      />
      <AlertModal
        state={paymentComplete}
        message={"Payment Successful!"}
        setState={setPaymentComplete}
        navigateTo="/login"
      />
      <NavBar onlyBrand />
      <div className="container-lg join-us-container mt-5">
        <div className="row join-us-row">
          <div className="col-md-5 join-us-left-col">
            <div className="join-us-heading">
              <h2>Brilliant Choice You !</h2>
            </div>
            <div className="join-us-checkbox-list my-5">
              <CheckBoxList checked={true} />
            </div>
            <div className="join-us-video-card">
              <VidCard noTitle pinkVideoIcon image={images.placeholder5} />
            </div>
            <div className="join-us-info my70">
              <h3 className="join-us-info-heading mb-4">
                Reawaken Your Inner Knowing
              </h3>
              <p className="join-us-info-para ">
                Default body copy style for text on white / light color
                backgrounds Mauris placerat euismod porttitor. Nam nec mauris
                non magnaSed dapibus, est non pulvinar fringilla, loremody copy
                style for text on white / light color backgrounds Mauris
                placerat euismod porttitor. Nam nec mauris non magnaSed dapibus,
                est non pulvinar fringilla, loremody copy style for text on
                white / light color backgrounds Mauris placerat euismod
                porttitor. Nam nec mauris non magnaSed dapibus, est non pulvinar
                fringilla, lorem
              </p>
            </div>
          </div>
          <div className="col-md-1 line-break-container">
            <div className="line-break-vertical"></div>
          </div>
          <div className="col-md-6 join-us-right-col">
            <h3
              className="join-us-back-btn"
              onClick={
                !isEmailVerified
                  ? () => navigate(-1)
                  : () => navigate("/email-confirmation")
              }
            >
              &#60; Back
            </h3>
            <p>
              Give yourself the gift of ongoing, expensive support for the year;
              or pay as you go:
            </p>
            <div className="join-us-ppc">
              {isEmailVerified && !paymentDone ? (
                <PaymentPlanCard
                  key={selectedPackage.id}
                  paymentPlan={selectedPackage}
                  state={state}
                  setState={setState}
                />
              ) : (
                packages.length !== 0 &&
                packages.map((paymentPlan) => (
                  <PaymentPlanCard
                    key={paymentPlan._id}
                    paymentPlan={paymentPlan}
                    state={state}
                    setState={setState}
                  />
                ))
              )}
            </div>
            {isEmailVerified === "yes" && (
              <div className="join-us-payment">
                <img src={images.paymentOptions} alt="payment option " />
              </div>
            )}
            {isEmailVerified === "yes" && (
              <h4 className="join-us-credit-heading">
                Credit Card Or Debit Card
              </h4>
            )}

            {isEmailVerified && !paymentDone ? (
              <PaymentCard />
            ) : (
              <form className="join-us-form">
                {/* <FormGroupAuth
                    label="Card Number"
                    inputType="text"
                    value={paymentState.cardNumber}
                    setValue={(val) =>
                      setPaymentState({ ...paymentState, cardNumber: val })
                    }
                  />
                  <FormGroupAuth
                    label="Expiration Date"
                    inputType="date"
                    value={paymentState.expirationDate}
                    setValue={(val) =>
                      setPaymentState({ ...paymentState, expirationDate: val })
                    }
                  />
                  <FormGroupAuth
                    label="Security Code"
                    inputType="text"
                    value={paymentState.securityCode}
                    setValue={(val) =>
                      setPaymentState({ ...paymentState, securityCode: val })
                    }
                  /> */}
                {/* <FormGroupAuth
                    label="Postal Code"
                    inputType="text"
                    value={paymentState.postalCode}
                    setValue={(val) =>
                      setPaymentState({ ...paymentState, postalCode: val })
                    }
                  />
                  <FormGroupAuth
                    label="Country"
                    options={["USA", "UK", "Pakistan"]}
                    isSelectInput
                    value={paymentState.country}
                    setValue={(val) =>
                      setPaymentState({ ...paymentState, country: val })
                    }
                  />
                  <FormGroupAuth
                    label="State"
                    isSelectInput
                    value={paymentState.state}
                    setValue={(val) =>
                      setPaymentState({ ...paymentState, state: val })
                    }
                  /> */}
                {/* </>
              ) : ( */}
                <>
                  <FormGroupAuth
                    label="First Name"
                    inputType="text"
                    value={state.firstName}
                    setValue={(val) => setState({ ...state, firstName: val })}
                  />
                  {/* <FormGroupAuth
                    label="Last Name"
                    inputType="text"
                    value={state.lastName}
                    setValue={(val) => setState({ ...state, lastName: val })}
                  /> */}
                  {/* <FormGroupAuth
                    label="Username"
                    inputType="text"
                    value={state.userName}
                    setValue={(val) => setState({ ...state, userName: val })}
                  /> */}
                  <FormGroupAuth
                    label="Email"
                    inputType="email"
                    value={state.email}
                    setValue={(val) => setState({ ...state, email: val })}
                  />
                  {/* <FormGroupAuth
                    label="Postal Code"
                    inputType="text"
                    value={state.postalCode}
                    setValue={(val) => setState({ ...state, postalCode: val })}
                  /> */}
                  {/* <FormGroupAuth
                    label="Country"
                    options={["select country", "USA", "UK", "Pakistan"]}
                    isSelectInput
                    value={state.country}
                    setValue={(val) => setState({ ...state, country: val })}
                  /> */}
                  {/* <FormGroupAuth
                    label="State"
                    options={
                      state.country === "USA"
                        ? usStates
                        : state.country === "UK"
                        ? ukCities
                        : state.country === "Pakistan"
                        ? pkCities
                        : ["select country first"]
                    }
                    isSelectInput
                    value={state.state}
                    setValue={(val) => setState({ ...state, state: val })}
                  /> */}
                  <FormGroupAuth
                    label="Password"
                    inputType="password"
                    showPasswordIcon
                    value={state.password}
                    setValue={(val) => setState({ ...state, password: val })}
                  />
                  <FormGroupAuth
                    label="Confirm Password"
                    inputType="password"
                    showPasswordIcon
                    value={state.confirmPassword}
                    setValue={(val) =>
                      setState({ ...state, confirmPassword: val })
                    }
                  />
                </>
              </form>
            )}
            {!isEmailVerified && (
              <h3
                className="join-us-next-btn"
                onClick={() => {
                  signUpUserFunction();
                }}
              >
                Next&#62;
              </h3>
            )}
            {/* {isEmailVerified && (
              <div className="join-us-submit-btn" onClick={() => acceptPay()}>
                <GreenButton paddingX text="Submit" />
              </div>
            )} */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JoinUs;
