import React from "react";

const GreenButton = ({
  text = "Button",
  type = "button",
  paddingX,
  outline,
  padXResponsive,
  padYResponsive,
}) => {
  return (
    // <div classname="btn-green-container">
    <button
      type={type}
      className={`${paddingX && "pd-x"} ${
        !outline ? "btn-green" : "btn-green-outline"
      } ${padYResponsive && "pd-y-res"} ${padXResponsive && "pd-x-res"}`}
    >
      {text}
    </button>
    // </div>
  );
};

export default GreenButton;
