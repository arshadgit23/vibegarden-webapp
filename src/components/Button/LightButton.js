import React from "react";

const LightButton = ({ text = "Lorem", paddingX }) => {
  return <button className={`${paddingX && "pd-x"} btn-light`}>{text}</button>;
};

export default LightButton;
