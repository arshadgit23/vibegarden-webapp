import React from "react";
import ContainerSection from "../Container";
import images from "../../constants/images";
import appleIcon from "../../assets/images/apple-icon.svg";
import androidIcon from "../../assets/images/android.svg";
import copyright from "../../assets/images/copyright.svg";
import ButtonFilled from "../Button/ButtonFilled";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiRequest } from "../../api/axios";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loadingSlice";
import ResusableModal from "../Modal/ResuableModal";
import reactDOM from "react-dom";
import classes from "./style.module.css";

const Footer = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

  const emailInputHandler = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(setLoading(true));
    try {
      const response = await apiRequest.post(
        "/newsLetter",
        { email: email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.data) {
        dispatch(setLoading(false));
        setIsModal(true);
      }
    } catch (err) {
      setError(err.message);
      dispatch(setLoading(false));
    }
  };

  const closeHandler = () => {
    setIsModal(false);
  };

  const modalHelper = (
    <ResusableModal className={classes.modal}>
      Email subscribe successfully
      <button onClick={closeHandler}>Close</button>
    </ResusableModal>
  );

  return (
    <footer className="footer">
      {isModal && modalHelper}
      <div className="container footer-container">
        <div className="row footer-row">
          <div className="col-md-4 col-lg-3 mb-md-0 mb-4 footer-col footer-col-1">
            <div className="footer-logo">
              <img src={images.logo2} />
            </div>
            <p className="footer-para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <Link to="/appDownload">
              <button className="footer-button bg-gradient-pink footer-app-btn">
                <img src={androidIcon} />
                VibeBloom App
              </button>
            </Link>
            <button className="footer-button">
              <img src={appleIcon} />
              Download
            </button>
            <button className="footer-button">
              <img src={androidIcon} />
              Download
            </button>
          </div>
          <div className="col-md-4 col-sm-3 col-lg-3  mb-4 footer-links-col footer-links-col-1">
            <h4 className="footer-list-heading">Quick Links</h4>
            <ul className="footer-list">
              <Link to="/groundwork">
                <li>Groundwork</li>
              </Link>
              <Link to="/guides">
                <li>Guides</li>
              </Link>
              <Link to="/community-garden">
                <li>Community Garden</li>
              </Link>
              <Link to="/about-us">
                <li>About Us</li>
              </Link>
            </ul>
          </div>
          <div className="col-md-4 col-sm-3 col-lg-3 mb-md-0 mb-4 footer-links-col footer-links-col-2">
            <h4 className="footer-list-heading">Contact Us</h4>
            <ul className="footer-list">
              <li>Sample@mail.com</li>
              <li>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam
              </li>
              <li>+222-232-0009</li>
            </ul>
          </div>
          <div className="col-md-4 col-lg-3 mb-md-0 mb-4 footer-form-col">
            <h4 className="footer-form-heading">News Letter</h4>
            <p className="footer-form-para">
              Get Latest Update Through Your Email address
            </p>
            <form
              onSubmit={submitHandler}
              className="subscribe-form footer-form"
            >
              <div className="form-group d-flex footer-form-group">
                <input
                  onChange={emailInputHandler}
                  type="email"
                  className="form-control rounded-left"
                  placeholder="Enter email address"
                />
                {error && (
                  <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
                )}
                <div className="footer-form-btn">
                  <ButtonFilled
                    bgGradient={"yes"}
                    text="Subscribe"
                    paddingX={"10px"}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row footer-second-row">
          <div className="col-md-6 footer-payments">
            <img src={images.paymentOptions} />
          </div>
          <div className="col-md-6 footer-links">
            <Link to="/termsandconditions">
              <li>Terms And Conditions</li>
            </Link>
            <Link to="/privacypolicy">
              <li>Privacy Policy</li>
            </Link>
          </div>
        </div>
        <div className="footer-line-break"></div>
        <div className="footer-copyright">
          <p>
            <span className="copyright-icon">
              <img src={copyright} />
            </span>
            Copy Rights 2022 Reserved - Vibe Garden
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
