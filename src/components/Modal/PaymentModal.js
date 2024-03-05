import React, { useState } from "react";
import ButtonFilled from "../Button/ButtonFilled";
import { HiCreditCard, HiX } from "react-icons/hi";
import GreenButton from "../Button/GreenButton";
import { Link } from "react-router-dom";

const PaymentModal = ({
  state = false,
  setState = () => null,
  plan = "yearly",
  payNowFunc = () => null,
}) => {
  return (
    <>
      {state && (
        <div className="pay-modal-overlay">
          <div className="pay-modal">
            <span className="md-close" onClick={() => setState(false)}>
              <HiX color="white" size={14} />
            </span>
            <div className="pm-pricetag">
              <h5>{plan}</h5>
              <h2>
                <span>${plan === "monthly" ? 22 : 22 * 12} / </span>
                {plan === "monthly" ? "Month" : "Year"}
              </h2>
              <p>{plan === "monthly" ? "Billed Monthly" : "Billed Annually"}</p>
            </div>
            <div className="vertical-separator"></div>
            <div className="pm-payment">
              <HiCreditCard size={70} color="#1C5C2E" />
              <h5>Saved Cards</h5>
              <p className="pm-cardNumber">4860567867XXXXXX</p>
              <span onClick={() => payNowFunc()}>
                <GreenButton text="Pay Now" />
              </span>
              <Link to="/updatepayment">
                <p className="pm-newCard">Use New Card Instead</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentModal;
