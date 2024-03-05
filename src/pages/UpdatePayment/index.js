import React from "react";
import FormGroupAuth from "../../components/FormInputAuth";
import GreenButton from "../../components/Button/GreenButton";
import images from "../../constants/images";
import { Link } from "react-router-dom";

const UpdatePayment = () => {
  return (
    <div className="update-payment bg-lightGreenMask">
      {/* <div className="update-payment-logo">
        <img src={images.logo3} />
      </div> */}
      <h3>Update Payment Details</h3>
      <p>Credit Card or Debit card</p>
      <div className="update-payment-form-container">
        <FormGroupAuth label="Card Number" inputType="text" />
        <FormGroupAuth label="Expiration Date" inputType="date" />
        <FormGroupAuth label="Security Code" inputType="text" />
      </div>
      <Link to="/profile">
          <GreenButton text="Done" padXResponsive />
      </Link>
    </div>
  );
};

export default UpdatePayment;
