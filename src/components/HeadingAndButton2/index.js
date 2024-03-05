import React from "react";
import ButtonFilled from "../Button/ButtonFilled";
import FormGroupAuth from "../FormInputAuth";

const HeadingAndButton2 = ({ noHeading, noPara, noInput, noButton }) => {
  return (
    <div className="buttonAndHeading2">
      {!noHeading && (
        <h2 className="bah2-heading">Stay In The Community Garden Loop</h2>
      )}
      {!noPara && (
        <p className="bah2-para">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kas
        </p>
      )}
      {!noInput && (
        <div className="bah2-input">
          <FormGroupAuth noLabel placeHolder="Enter Email Address" />
        </div>
      )}
      {!noButton && (
        <ButtonFilled text="Subscribe" bgGradient={"yes"} paddingX />
      )}
    </div>
  );
};

export default HeadingAndButton2;
