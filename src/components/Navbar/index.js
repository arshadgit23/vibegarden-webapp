// Library Imports
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoNotificationsSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavLink } from "react-bootstrap";
// Redux Slices
import { setLoading } from "../../redux/slices/loadingSlice";
import { logoutUser } from "../../redux/slices/userSlice";
// Custom Imports
import ButtonOutline from "../Button/ButtonOutline";
import UserButton from "../userButton.js";
import VibeGardenLogo from "../../assets/images/vibegarden_logo.svg";
import NotificationPopUp from "../NotificationPopUp";
import { FaPlusCircle } from "react-icons/fa";
import AWS from "../../awsImageURL";
import AlertModal from "../Modal/AlertModal";
import images from "../../constants/images";
import { TiSpiral } from "react-icons/ti";

const NavBar = ({ onlyBrand }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Redux State Read
  const user = useSelector((state) => state.user.user);
  const url = useSelector((state) => state.user.url);

  console.log(user);
  // States
  const [userAcces, setUserAccess] = useState({
    login: "/login",
    signup: "/join-us",
  });
  const [links, setLinks] = useState({
    groundwork: "#",
    tools: "#",
    guides: "#",
    communityGarden: "#",
  });

  const [alertMessage, setAlertMessage] = useState(false);

  console.log(userAcces);
  const [expanded, setExpanded] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const wordCapitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  // Update Navbar Responsiveness

  useEffect(() => {
    if (user?.isPaymentDone) {
      setLinks((links) => ({
        ...links,
        groundwork: "/groundwork",
        tools: "/tools",
        guides: "/guides",
        communityGarden: "/community-garden",
      }));
    } else {
      setLinks((links) => ({
        ...links,
        groundwork: "#",
        tools: "#",
        guides: "#",
        communityGarden: "#",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (user?.email && !user?.isVerified) {
      setUserAccess((prev) => ({
        ...prev,
        login: "/email-confirmation",
        signup: "/email-confirmation",
      }));
    } else if (user?.isVerified && !user?.isPaymentExpire) {
      setUserAccess((prev) => ({
        ...prev,
        login: url,
        signup: url,
      }));
    } else if (
      user?.isVerified &&
      user?.isPaymentExpire &&
      !user?.isPaymentDone
    ) {
      setUserAccess((prev) => ({
        ...prev,
        login: "/payment-success",
        signup: "/payment-success",
      }));
    } else {
      setUserAccess((prev) => ({
        ...prev,
        login: "/login",
        signup: "/join-us",
      }));
    }
  }, [user]);

  useEffect(() => {
    function updateSize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // OnClick handlers
  const logoutUserFunction = () => {
    console.log("logged out");
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(logoutUser());
      dispatch(setLoading(false));
      navigate("/login");
    }, 1000);
  };

  const userAccessibleHandler = () => {
    if (!user?.isPaymentDone) {
      setAlertMessage("Please login to access !");
    } else {
      setAlertMessage(false);
    }
  };

  return (
    <Navbar expand="lg" className="navbar">
      <AlertModal
        state={alertMessage}
        setState={setAlertMessage}
        message={alertMessage}
        navigateTo="/login"
        onOverlay={() => {
          setAlertMessage(false);
        }}
      />

      <div className="container-xl">
        <Link to="/">
          <Navbar.Brand className="brand">
            <div>
              <img
                src={VibeGardenLogo}
                alt="Vibe Garden Logo"
                style={{ width: "80%" }}
              />
            </div>
          </Navbar.Brand>
        </Link>
        {!onlyBrand && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto nav-links">
                {/* <NotificationPopUp /> */}
                <NavLink>
                  <Link to={links.groundwork} onClick={userAccessibleHandler}>
                    <div className="list_item">Groundwork</div>
                  </Link>
                </NavLink>
                <NavLink>
                  <Link to={links.tools} onClick={userAccessibleHandler}>
                    <div className="list_item">Tools</div>
                  </Link>
                </NavLink>
                <NavLink>
                  <Link to={links.guides} onClick={userAccessibleHandler}>
                    <div className="list_item">Guides</div>
                  </Link>
                </NavLink>
                <NavLink>
                  <Link
                    to={links.communityGarden}
                    onClick={userAccessibleHandler}
                  >
                    <div className="list_item">Community Garden</div>
                  </Link>
                </NavLink>
              </Nav>
              {!user?.isPaymentDone && (
                <Nav className="ms-auto">
                  <div className="navbar-actions">
                    <div>
                      <NavLink>
                        <Link to={userAcces.login}>
                          <div className="list_item">Login</div>
                        </Link>
                      </NavLink>
                    </div>

                    <div className="nav-btn">
                      <Link to={userAcces.signup}>
                        <ButtonOutline text="Join Us" />
                      </Link>
                    </div>
                  </div>
                </Nav>
              )}
              {user?.isPaymentDone && dimensions.width >= 992 && (
                <Nav className="ms-auto">
                  <div className="navbar-actions">
                    <span className="navbar-tools-icon">
                      {/* <Link to="/resonancefinder"> */}
                      <Link to="/resonance">
                        {/* <div className="profile-bloom">
                          <img
                            src={`${REACT_APP_AWS_URL.REACT_APP_AWS_URL}${user?.bloom?.image}`}
                            // user?.bloom?.croppedImage || images.bloomChu`}
                          />
                        </div> */}

                        {/* <FaPlusCircle
                          className="navbar-plus-icon"
                          style={{ height: "30px", width: "30px" }}
                        /> */}
                        <TiSpiral size={40} color="rgba(27, 91, 47, 1)" />
                      </Link>
                    </span>
                    <span className="navbar-actions-icon">
                      {/* <span
                        onClick={() => setShowNotification(!showNotification)}
                      >
                        <IoNotificationsSharp
                          size={25}
                          fill="rgba(27, 91, 47, 1)"
                          cursor="pointer"
                        />
                      </span>
                      <span className="notification-dot"></span> */}
                    </span>
                    <UserButton
                      userImage={`${AWS.REACT_APP_AWS_URL}${user?.avatar?.image}`}
                      username={
                        wordCapitalize(`${user?.firstName}`) /* + */
                        // " " +
                        // wordCapitalize(`${user?.lastName}`)
                      }
                      onClickFunction={() => setExpanded(!expanded)}
                    />
                    {expanded && dimensions.width >= 992 && (
                      <div className="expandedBar">
                        <NavLink>
                          <Link to="/profile">
                            <div className="list_item-expanded">
                              Profile Setting
                            </div>
                          </Link>
                        </NavLink>
                        <NavLink>
                          <div
                            className="list_item-expanded "
                            onClick={() => logoutUserFunction()}
                          >
                            Logout
                          </div>
                        </NavLink>
                      </div>
                    )}
                    {showNotification && (
                      <div className="nav-not">
                        <NotificationPopUp />
                      </div>
                    )}
                  </div>
                </Nav>
              )}
              {user && dimensions.width <= 991 && (
                <Nav className="ms-auto">
                  <div className="navbar-actions d-flex flex-column">
                    <NavLink>
                      <div className="list_item">Profile Settings</div>
                    </NavLink>
                    <NavLink>
                      <div className="list_item">Logo</div>
                    </NavLink>
                    <NavLink>
                      <div className="list_item">Resonance</div>
                    </NavLink>
                    <NavLink>
                      <div className="list_item">Notification</div>
                    </NavLink>
                  </div>
                </Nav>
              )}
            </Navbar.Collapse>
          </>
        )}
      </div>
    </Navbar>
  );
};

export default NavBar;
