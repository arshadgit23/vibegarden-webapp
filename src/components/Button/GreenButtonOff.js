import React from "react";

const GreenButtonOff = ({
  text = "Button",
  paddingX,
  outline,
  padXResponsive,
  padYResponsive,
}) => {
  return (
    // <div classname="btn-green-container">
    <button
      className={`${paddingX && "pd-x"} ${"btn-green-off"} ${
        padYResponsive && "pd-y-res"
      } ${padXResponsive && "pd-x-res"}`}
    >
      {text}
    </button>
    // </div>
  );
};

export default GreenButtonOff;
