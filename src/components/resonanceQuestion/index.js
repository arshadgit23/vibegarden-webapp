import React from "react";
import images from "../../constants/images";
import resImage from "../../assets/images/reson1.svg";

const ResonanceQuestion = ({
  image = resImage,
  text = "Answer Text",
  checked,
  setChecked,
}) => {
  return (
    <div className={`resonance-question ${checked && "rq-checked"}`}>
      <div className={`rq-img ${checked && "rq-img-checked"}`}>
        <span className="rq-img-container">
          <img src={image} />
        </span>
      </div>
      <div className={`rq-text`}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ResonanceQuestion;
