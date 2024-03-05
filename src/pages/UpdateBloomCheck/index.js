import React, { useState } from "react";
import images from "../../constants/images";
import ButtonFilled from "../../components/Button/ButtonFilled";
import { BsCheckLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import NavBar from "../../components/Navbar";
import { RiArrowLeftLine } from "react-icons/ri";

const UpdateBloomCheck = () => {
  const [choice, setChoice] = useState("");
  const [percent, setPercent] = useState(25);

  return (
    <>
      {/* <NavBar onlyBrand /> */}
      <div className="bloom-check bg-lightGreenMask">
        <Link to="/profile">
          <span className="bc-back">
            <RiArrowLeftLine size={30} fill="white" />
          </span>
        </Link>
        <h2>
          How Bloom is <br />
          Your Vibe Today?
        </h2>
        <p className="bloom-check-text">
          Meaning, How Connected to your feel to your light, your Unique
          essence?
        </p>
        <div className="bc-container">
          <div className="bc-imageAndText">
            {percent >= 1 && percent <= 25 ? (
              <span className="bc-choice-checked bg-gradient-pink">
                <BsCheckLg size={50} fill="white" />
              </span>
            ) : (
              <div className="bc-image" onClick={() => setPercent(25)}>
                <img src={images.bloomPercent1} alt="" />
              </div>
            )}
            <p>1-25%</p>
          </div>
          <div className="bc-imageAndText">
            {percent > 25 && percent <= 50 ? (
              <span className="bc-choice-checked bg-gradient-pink">
                <BsCheckLg size={50} fill="white" />
              </span>
            ) : (
              <div className="bc-image" onClick={() => setPercent(50)}>
                <img src={images.bloomPercent2} alt="" />
              </div>
            )}
            <p>26-50%</p>
          </div>
          <div className="bc-imageAndText">
            {percent > 50 && percent <= 75 ? (
              <span className="bc-choice-checked bg-gradient-pink">
                <BsCheckLg size={50} fill="white" />
              </span>
            ) : (
              <div className="bc-image" onClick={() => setPercent(75)}>
                <img src={images.bloomPercent3} alt="" />
              </div>
            )}
            <p>51-75%</p>
          </div>
          <div className="bc-imageAndText">
            {percent > 75 && percent <= 100 ? (
              <span className="bc-choice-checked bc-check-big bg-gradient-pink">
                <BsCheckLg size={50} fill="white" />
              </span>
            ) : (
              <div
                className="bc-image bc-image-big"
                onClick={() => setPercent(100)}
              >
                <img src={images.bloomPercent4} alt="" />
              </div>
            )}
            <p className="bc-image-big-text">76-100%</p>
          </div>
        </div>
        <div className="bc-manual-percent">
          <h4>Dial It In If You Have Any Wish:</h4>
          <div className="bc-manual-select">
            {percent >= 0 && percent <= 25 && (
              <img src={images.bloomPercent1} />
            )}
            {percent > 25 && percent <= 50 && (
              <img src={images.bloomPercent2} />
            )}
            {percent > 50 && percent <= 75 && (
              <img src={images.bloomPercent3} />
            )}
            {percent > 75 && percent <= 100 && (
              <img src={images.bloomPercent4} />
            )}
            <p>{percent}%</p>
            <div className="bc-manual-icons">
              <AiFillCaretUp
                size={25}
                onClick={() => percent < 100 && setPercent(percent + 1)}
              />
              <AiFillCaretDown
                size={25}
                onClick={() => percent > 1 && setPercent(percent - 1)}
              />
              {/* <BsChevronUp size={20} /> */}
              {/* <BsChevronDown size={20} fill="black" color="black" /> */}
            </div>
          </div>
          <Link to="/bloomresult" state={{ percent: percent }}>
            <ButtonFilled
              text="Continue"
              paddingX
              bgGradient={"yes"}
              paddingYSmall
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default UpdateBloomCheck;
