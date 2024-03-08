import React, { useState, useEffect } from "react";
import ButtonFilled from "../../components/Button/ButtonFilled";
import NavBar from "../../components/Navbar";
import HeadingLine from "../../components/HeadingLine";
import FormGroupAuth from "../../components/FormInputAuth";
import EditIcon from "../../assets/images/editIcon.svg";
import Footer from "../../components/Footer";
import ProfileModal from "../../components/Modal/profileModal";
import { Link } from "react-router-dom";
import SubscriptionModal from "../../components/Modal/subscriptionModal";
import PaymentModal from "../../components/Modal/PaymentModal";
import PaymentSuccessfulModal from "../../components/Modal/PaymentSuccessfulModal";
import Loader from "../../components/Modal/loader";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { apiRequest } from "../../api/axios";
import { setUser } from "../../redux/slices/userSlice";
import AlertModal from "../../components/Modal/AlertModal";
import { FaCamera } from "react-icons/fa";
import AWS from "../../awsImageURL";
import AvatarModal from "../../components/Modal/AvatarModal";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsHeart, BsPlusLg, BsStar } from "react-icons/bs";
import { TbArrowBack } from "react-icons/tb";
import images from "../../constants/images";
import defaultUserImg from "../../assets/images/user.png";
import BloomModal from "../../components/Modal/BloomModal";
import classes from "./style.module.css";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [showModal, setShowModal] = useState(false);
  const [editTop, setEditTop] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [editBilling, setEditBilling] = useState(false);
  const [editSubscription, setEditSubscription] = useState(false);
  const [showSubPackageModal, setShowSubPackageModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showPaySuccessModal, setShowPaySuccessModal] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState({});
  const [bloomImage, setBloomImage] = useState({});
  const [loading, setLoading] = useState(false);
  const [aboutInfo, setAboutInfo] = useState({ ...user });
  const [percent, setPercent] = useState(aboutInfo.bloomPercentage);
  const [avatarModel, setAvatarModel] = useState(false);
  const [bloomModel, setBloomModel] = useState(false);
  const [library, setLibrary] = useState(true);

  const [subscriptionInfo, setSubscriptionInfo] = useState({
    startDate: new Date(aboutInfo?.packageStartDate),
    // startDate: "",
    nextBillingDate: new Date(aboutInfo?.packageEndDate),
    // nextBillingDate: "",
    packageType: aboutInfo?.package.name,
    price: aboutInfo?.package.price,
    subscriptionStatus: "active",
  });

  useEffect(() => {
    setAboutInfo({ ...user });
  }, [user]);

  const updateUser = async () => {
    const updatedData = new FormData();
    updatedData.append("firstName", aboutInfo.firstName);
    updatedData.append("lastName", aboutInfo.lastName);
    updatedData.append("country", aboutInfo.country);
    updatedData.append("state", aboutInfo.state);
    updatedData.append("postalCode", aboutInfo.postalCode);
    // updatedData.append("avatar", image);

    try {
      setLoading(true);
      const response = await apiRequest.patch("/users/updateMe", updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(setUser(response.data.data.user));
      setLoading(false);
      setShowModal(true);
      setEditAbout(false);
      setEditTop(false);
      setEditBilling(false);
      setEditSubscription(false);
    } catch (err) {
      setLoading(false);
      if (err.message === "Network Error") return setError("Network Error");
      const data = err?.response?.data.message;
      setError(data);
    }
  };

  const updateBloomPercentage = async () => {
    const updatedData = new FormData();
    updatedData.append("bloomPercentage", percent);

    try {
      setLoading(true);
      const response = await apiRequest.patch("/users/updateMe", updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(setUser(response.data.data.user));
      setLoading(false);
      setShowModal(true);
      setEditAbout(false);
      setEditTop(false);
      setEditBilling(false);
      setEditSubscription(false);
    } catch (err) {
      setLoading(false);
      if (err.message === "Network Error") return setError("Network Error");
      const data = err?.response?.data.message;
      setError(data);
    }
  };
  const updateBillingInfo = async () => {
    const updatedData = new FormData();
    // updatedData.append("country", billingInfo.country);
    // updatedData.append("state", billingInfo.state);
    // updatedData.append("postalCode", billingInfo.postalCode);

    try {
      setLoading(true);
      const response = await apiRequest.patch("/users/updateMe", updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(setUser(response.data.data.user));
      setLoading(false);
      setShowModal(true);
      setEditAbout(false);
      setEditTop(false);
      setEditBilling(false);
      setEditSubscription(false);
    } catch (err) {
      setLoading(false);
      if (err.message === "Network Error") return setError("Network Error");
      const data = err?.response?.data.message;
      setError(data);
    }
  };

  const wordCapitalize = (word) => {
    return word?.charAt(0)?.toUpperCase() + word?.slice(1);
  };

  const avatar = `${AWS.REACT_APP_AWS_URL}${user?.avatar?.image}`;
  const percentage = `${percent}%`;

  return (
    <>
      {loading && <Loader />}
      {avatarModel && (
        <AvatarModal
          state={avatarModel}
          setAvatarModel={setAvatarModel}
          choice={image}
          setChoice={setImage}
        />
      )}
      {bloomModel && (
        <BloomModal
          state={bloomModel}
          setAvatarModel={setBloomModel}
          choice={bloomImage}
          setChoice={setBloomImage}
        />
      )}
      <AlertModal message={error} state={error} setState={setError} />
      <SubscriptionModal
        state={showSubPackageModal}
        setState={setShowSubPackageModal}
        payNowFunction={() => {
          setShowSubPackageModal(false);
          setShowPayModal(true);
        }}
      />
      <PaymentModal
        state={showPayModal}
        setState={setShowPayModal}
        payNowFunc={() => {
          setShowPayModal(false);
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setShowPaySuccessModal(true);
          }, 2000);
        }}
      />
      <PaymentSuccessfulModal
        state={showPaySuccessModal}
        setState={setShowPaySuccessModal}
      />
      <NavBar />
      <section className="profile-screen">
        <div className="container-xl ps-container ">
          <div className="row ps-row ">
            <div className="ps-top col-12">
              <div className="ps-top-imginfo">
                <div style={{ position: "relative" }}>
                  <img
                    className="ps-top-image"
                    src={user?.avatar?.image ? avatar : defaultUserImg}
                  />

                  <div
                    htmlFor="camera-icon"
                    style={{
                      position: "absolute",
                      top: "75%",
                      left: "84%",
                      cursor: "pointer",
                    }}
                    onClick={() => setAvatarModel(true)}
                  >
                    <FaCamera size={18} />
                  </div>
                </div>
                <div className="ps-top-info">
                  <h3 className="ps-top-heading">
                    {
                      wordCapitalize(aboutInfo.firstName) /* + */
                      // " " +
                      // wordCapitalize(aboutInfo.lastName)
                    }
                  </h3>
                  <p className="ps-top-subscription">
                    {aboutInfo.package.name} Package <span>Activated</span>
                  </p>
                  {/* <p className="ps-library">Library : </p> */}
                </div>
              </div>

              {/* <div
                style={{
                  backgroundColor: "aqua",
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  // alignContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    // backgroundColor: "red"
                  }}
                >
                  {!editAbout && (
                    <div
                      className="ps-editPassword"
                      onClick={() => setEditAbout(!editAbout)}
                    >
                      <img src={EditIcon} />
                    </div>
                  )}
                  {editAbout && (
                    <div className="ps-about-btns">
                      <div
                        className="ps-top-btn"
                        onClick={() => {
                          updateUser();
                        }}
                      >
                        <span className="ps-btn-outline">
                          <ButtonFilled text="Save" padXResponsive outline />
                        </span>
                      </div>
                      <span onClick={() => setEditAbout(false)}>
                        <ButtonFilled
                          padXResponsive
                          bgGradient={"yes"}
                          text="Cancel"
                        />
                      </span>
                    </div>
                  )}
                </div>
              </div> */}

              <div
                className="ps-topright"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                }}
              >
                <div className="profile-bloom-check">
                  <h4>Bloom Check</h4>
                  <div className="pbc-container">
                    <div className="pbc-img" style={{ position: "relative" }}>
                      <img
                        src={`${AWS.REACT_APP_AWS_URL}${aboutInfo.bloom.image}`}
                      />

                      <div
                        htmlFor="camera-icon"
                        style={{
                          position: "absolute",
                          top: "60%",
                          left: "70%",
                          cursor: "pointer",
                        }}
                        onClick={() => setBloomModel(true)}
                      >
                        <FaCamera size={18} />
                      </div>
                    </div>
                    {editTop ? (
                      <input
                        className={classes.bloomInput}
                        type="number"
                        value={percent < 1 ? "" : percent > 100 ? "" : percent}
                        min="1"
                        max="100"
                        onChange={(e) => setPercent(e.target.value)}
                      />
                    ) : (
                      <p>{`${percent}%`}</p>
                    )}

                    {editTop && (
                      <div className="pbc-icons">
                        <AiFillCaretUp
                          size={25}
                          onClick={() =>
                            percent < 100 && setPercent(percent + 1)
                          }
                        />
                        <AiFillCaretDown
                          size={25}
                          onClick={() => percent > 1 && setPercent(percent - 1)}
                        />
                      </div>
                    )}
                    {!editTop && (
                      <div
                        className="ps-editPassword"
                        onClick={() => setEditTop(!editTop)}
                        style={{ marginLeft: "3px" }}
                      >
                        <img src={EditIcon} />
                      </div>
                    )}
                  </div>
                </div>
                {editTop && (
                  <div className="ps-top-buttons">
                    <div
                      className="ps-top-btn"
                      onClick={() => setShowModal(true)}
                    >
                      <span
                        className="ps-btn-outline"
                        onClick={() => {
                          updateBloomPercentage();
                        }}
                      >
                        <ButtonFilled
                          // bgGradient={"yes"}
                          text="Save"
                          padXResponsive
                          outline
                        />
                      </span>
                    </div>
                    <span onClick={() => setEditTop(false)}>
                      <ButtonFilled
                        padXResponsive
                        bgGradient={"yes"}
                        text="Cancel"
                      />
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div
              style={{
                // backgroundColor: "red",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <div className="col-md-6 ps-aboutForm">
                <div className="ps-heading">
                  <HeadingLine text="About" />
                </div>

                <div className="ps-form">
                  {!editAbout && (
                    <div
                      className="ps-editPassword"
                      onClick={() => setEditAbout(!editAbout)}
                    >
                      <img src={EditIcon} />
                    </div>
                  )}
                  <FormGroupAuth
                    label="Email Address"
                    value={aboutInfo.email}
                    disabled={true}
                    setValue={(data) =>
                      setAboutInfo({ ...aboutInfo, email: data })
                    }
                  />
                  <FormGroupAuth
                    label="First Name"
                    value={aboutInfo.firstName}
                    setValue={(data) =>
                      setAboutInfo({ ...aboutInfo, firstName: data })
                    }
                    disabled={!editAbout}
                  />
                  <FormGroupAuth
                    label="Last Name"
                    value={aboutInfo.lastName}
                    disabled={!editAbout}
                    setValue={(data) =>
                      setAboutInfo({ ...aboutInfo, lastName: data })
                    }
                  />

                  <FormGroupAuth
                    label="Country"
                    options={["USA", "UK", "Pakistan"]}
                    isSelectInput
                    value={aboutInfo.country}
                    disabled={!editAbout}
                    setValue={(data) =>
                      setAboutInfo({ ...aboutInfo, country: data })
                    }
                  />
                  <FormGroupAuth
                    label="State"
                    options={["Florida", "Texas", "California"]}
                    isSelectInput
                    value={aboutInfo.state}
                    disabled={!editAbout}
                    setValue={(data) =>
                      setAboutInfo({ ...aboutInfo, state: data })
                    }
                  />
                  <FormGroupAuth
                    label="Postal Code"
                    inputType="text"
                    value={aboutInfo.postalCode}
                    disabled={!editAbout}
                    setValue={(data) =>
                      setAboutInfo({ ...aboutInfo, postalCode: data })
                    }
                  />
                  <div className="update-password-container">
                    <div className="ps-inputIcon">
                      <FormGroupAuth
                        label="Password"
                        inputType="password"
                        // showPasswordIcon={editAbout ? true : false}
                        value={"cannot show password"}
                        // showPasswordIcon={true}
                        // disabled={!editAbout}
                        disabled={true}
                        setValue={(data) =>
                          setAboutInfo({ ...aboutInfo, password: data })
                        }
                      />

                      <div className="update-password-icon-container">
                        <Link to="/updatepassword">
                          <img src={EditIcon} />
                        </Link>
                      </div>
                    </div>
                  </div>
                  {editAbout && (
                    <div className="ps-about-btns">
                      <div
                        className="ps-top-btn"
                        onClick={() => {
                          updateUser();
                        }}
                      >
                        <span className="ps-btn-outline">
                          <ButtonFilled text="Save" padXResponsive outline />
                        </span>
                      </div>
                      <span onClick={() => setEditAbout(false)}>
                        <ButtonFilled
                          padXResponsive
                          bgGradient={"yes"}
                          text="Cancel"
                        />
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="col-md-6 ps-aboutForm">
              <div className="ps-heading">
                <HeadingLine text="Library" />
              </div>
              <div className="ps-library-items">
                <Link to="/toolstotry">
                  <div className="ps-library-item">
                    <span>
                      <BsPlusLg size={17} color="rgba(27, 91, 47, 1)" />
                    </span>
                    <p>Tools To Try</p>
                  </div>
                </Link>
                <Link to="/recentcontent">
                  <div className="ps-library-item">
                    <span>
                      <TbArrowBack size={22} color="rgba(27, 91, 47, 1)" />
                    </span>
                    <p>Recent Content</p>
                  </div>
                </Link>
                <Link to="/favorites">
                  <div className="ps-library-item">
                    <span>
                      <BsHeart size={18} color="rgba(27, 91, 47, 1)" />
                    </span>
                    <p>Favorites</p>
                  </div>
                </Link>
                <Link to="/toptools">
                  <div className="ps-library-item">
                    <span>
                      <BsStar size={20} color="rgba(27, 91, 47, 1)" />
                    </span>
                    <p>Top Tools</p>
                  </div>
                </Link>
                <Link to="/resonanceresult">
                  <div className="ps-library-item">
                    <span>
                      <img src={images.spiral} />
                    </span>
                    <p>Your Resonance Finder Result</p>
                  </div>
                </Link>
              </div>
            </div> */}
              {/* <div className="col-md-6 ps-billingForm">
              <div className="ps-heading">
                <HeadingLine text="Billing Info" />
              </div>
              <div className="ps-form">
                {!editBilling && (
                  <div
                    className="ps-editPassword billing-edit"
                    onClick={() => setEditBilling(!editBilling)}
                  >
                    <img src={EditIcon} />
                  </div>
                )}
                <FormGroupAuth
                  label="Country"
                  options={["USA", "UK", "Pakistan"]}
                  isSelectInput
                  value={billingInfo.country}
                  disabled={!editBilling}
                  setValue={(data) =>
                    setBillingInfo({ ...billingInfo, country: data })
                  }
                />
                <FormGroupAuth
                  label="State"
                  options={["Florida", "Texas", "California"]}
                  isSelectInput
                  value={billingInfo.state}
                  disabled={!editBilling}
                  setValue={(data) =>
                    setBillingInfo({ ...billingInfo, state: data })
                  }
                />
                <FormGroupAuth
                  label="Postal Code"
                  inputType="text"
                  value={billingInfo.postalCode}
                  disabled={!editBilling}
                  setValue={(data) =>
                    setBillingInfo({ ...billingInfo, postalCode: data })
                  }
                />
                {editBilling && (
                  <div className="ps-about-btns">
                    <div
                      className="ps-top-btn"
                      onClick={() => {
                        updateBillingInfo();
                      }}
                    >
                      <span className="ps-btn-outline">
                        <ButtonFilled text="Save" padXResponsive outline />
                      </span>
                    </div>
                    <span onClick={() => setEditBilling(false)}>
                      <ButtonFilled
                        padXResponsive
                        bgGradient={"yes"}
                        text="Cancel"
                      />
                    </span>
                  </div>
                )}
              </div>
            </div> */}
              <div style={{ width: "fit-content" }}>
                {library && (
                  <div className="ps-subscriptionForm">
                    <div className="ps-heading">
                      <HeadingLine text="Library" />
                    </div>
                    <div className="ps-library-items">
                      <Link to="/toolstotry">
                        <div className="ps-library-item">
                          <span>
                            <BsPlusLg size={17} color="rgba(27, 91, 47, 1)" />
                          </span>
                          <p>Tools To Try</p>
                        </div>
                      </Link>
                      <Link to="/recentcontent">
                        <div className="ps-library-item">
                          <span>
                            <TbArrowBack
                              size={22}
                              color="rgba(27, 91, 47, 1)"
                            />
                          </span>
                          <p>Recent Content</p>
                        </div>
                      </Link>

                      <Link to="/favorites">
                        <div className="ps-library-item">
                          <span>
                            <BsHeart size={18} color="rgba(27, 91, 47, 1)" />
                          </span>
                          <p>Favorites</p>
                        </div>
                      </Link>

                      <Link to="/toptools">
                        <div className="ps-library-item">
                          <span>
                            <BsStar size={20} color="rgba(27, 91, 47, 1)" />
                          </span>
                          <p>Top Tools</p>
                        </div>
                      </Link>

                      <Link to="/resonancefinder">
                        <div className="ps-library-item">
                          <span>
                            {/* <img height={20} src={images.spiral} /> */}
                            <span>
                              <BsPlusLg size={17} color="rgba(27, 91, 47, 1)" />
                            </span>
                          </span>
                          <p>Your Resonance Finder Result</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
                <div className="ps-subscriptionForm">
                  <div className="ps-heading">
                    <HeadingLine text="Subscription Info" />
                  </div>
                  <div className="ps-form">
                    {/* {!editSubscription && (
                  <div
                    className="ps-editPassword "
                    onClick={() => setEditSubscription(!editSubscription)}
                  >
                    <img src={EditIcon} />
                  </div>
                )} */}
                    <FormGroupAuth
                      label="Start Date"
                      inputType="date"
                      disabled={!editSubscription}
                      value={moment(subscriptionInfo?.startDate).format(
                        "YYYY-MM-DD"
                      )}
                      setValue={(data) =>
                        setSubscriptionInfo({
                          ...subscriptionInfo,
                          startDate: data,
                        })
                      }
                    />
                    <FormGroupAuth
                      label="Next Billing Date"
                      inputType="date"
                      disabled={!editSubscription}
                      value={moment(subscriptionInfo?.nextBillingDate).format(
                        "YYYY-MM-DD"
                      )}
                      setValue={(data) =>
                        setSubscriptionInfo({
                          ...subscriptionInfo,
                          nextBillingDate: data,
                        })
                      }
                    />
                    <div
                      className="ps-inputIcon"
                      onClick={() => {
                        if (editSubscription) {
                          setShowSubPackageModal(true);
                        }
                      }}
                    >
                      <FormGroupAuth
                        label="Package Select"
                        selectedIcon={editSubscription ? true : false}
                        // options={["Monthly", "Yearly"]}
                        // isSelectInput
                        disabled={true}
                        value={`${subscriptionInfo.packageType} ${subscriptionInfo.price}$`}
                        // setValue={(data) =>
                        //   setSubscriptionInfo({
                        //     ...subscriptionInfo,
                        //     packageType: data,
                        //   })
                        // }
                      />

                      {/* <span
                  className="edit-To"
                    onClick={() => {
                      setShowSubPackageModal(true);
                    }}
                  >
                    <BiEditAlt color={"white"} size={18} />
                  </span> */}
                    </div>
                    {editSubscription && (
                      <div
                        className="ps-inputIcon"
                        onClick={() => {
                          if (editSubscription) {
                            setShowSubPackageModal(true);
                          }
                        }}
                      >
                        <FormGroupAuth
                          noLabel
                          selectedIconDisabled={editSubscription ? true : false}
                          // options={["Monthly", "Yearly"]}
                          // isSelectInput
                          disabled={true}
                          value={`Yearly ${22 * 12}`}
                          // setValue={(data) =>
                          //   setSubscriptionInfo({
                          //     ...subscriptionInfo,
                          //     packageType: data,
                          //   })
                          // }
                        />
                      </div>
                    )}
                    {/* <FormGroupAuth
                  label="Subsciption Status"
                  options={["Active", "inactive"]}
                  isSelectInput
                  disabled={!editSubscription}
                  value={subscriptionInfo.subscriptionStatus}
                  setValue={(data) =>
                    setSubscriptionInfo({
                      ...subscriptionInfo,
                      subscriptionStatus: data,
                    })
                  }
                /> */}
                    {/* {!editSubscription && (
                  <Link to="/cancelsubscription">
                    <div className="sub-btn">
                      <GreenButton text="Cancel Subscription" />
                    </div>
                  </Link>
                )} */}
                    {editSubscription && (
                      <div className="ps-about-btns">
                        <div
                          className="ps-top-btn"
                          onClick={() => {
                            setShowModal(true);
                            setEditAbout(false);
                            setEditTop(false);
                            setEditBilling(false);
                            setEditSubscription(false);
                          }}
                        >
                          <span className="ps-btn-outline">
                            <ButtonFilled
                              // bgGradient={"yes"}
                              text="Save"
                              padXResponsive
                              outline
                            />
                          </span>
                        </div>
                        <span onClick={() => setEditSubscription(false)}>
                          <ButtonFilled
                            padXResponsive
                            bgGradient={"yes"}
                            text="Cancel"
                          />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {showModal && (
        <ProfileModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default ProfileScreen;
