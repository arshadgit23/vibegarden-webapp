import React from "react";
// import { Button } from "react-bootstrap";

const ButtonOutline = ({ text = "Button" }) => {
  return (
    <div className="btn-outline-container">
      <button className="btn-outline">{text}</button>
    </div>
  );
};

export default ButtonOutline;
