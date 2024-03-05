import React from "react";

const HeadingLine = ({ text = "Heading" }) => {
  return (
    <div className="heading-line">
      <h4 className="hl-heading">{text}</h4>
      <div className="hl-line"></div>
    </div>
  );
};

export default HeadingLine;
