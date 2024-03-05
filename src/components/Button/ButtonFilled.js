// Library Imports
import React from "react";
// Custom Imports
import rectangle from "../../assets/images/rectangle.svg";

const gradientBackground = {
  backgroundImage: `url(${rectangle})`,
  color: "rgba(255, 255, 255, 1)",
  fontWeight: 400,
};

const ButtonFilled = ({
  text = "Button",
  bgGradient,
  paddingX,
  paddingY,
  paddingXSmall,
  paddingYSmall,
  padXResponsive,
  padYResponsive,
  padXBig,
  padYBig,
}) => {
  return (
    <button
      className={`${paddingX && "pd-x"} ${paddingY && "pd-y"} ${
        padYResponsive && "pd-y-res"
      } ${padXResponsive && "pd-x-res"} ${paddingYSmall && "pd-y-small"} ${
        paddingXSmall && "pd-x-small"
      } ${padXBig && "pd-x-big"} ${padYBig && "pd-y-big"} btn-filled`}
      style={bgGradient === "yes" ? gradientBackground : null}
    >
      {text}
    </button>
  );
};

export default ButtonFilled;
