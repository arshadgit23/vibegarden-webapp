import React from "react";
import { Link } from "react-router-dom";
import ButtonFilled from "../../components/Button/ButtonFilled";

const PaymentFailure = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "40%",
          marginInline: "auto",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <p
          style={{
            fontSize: "28px",
            textAlign: "center",
            fontWeight: "700",
            color: "rgba(27, 91, 47, 1)",
          }}
        >
          Payment Failed
        </p>
        <p
          style={{
            fontSize: "24px",
          }}
        >
          Please, Retry Payment
        </p>
        <Link
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          to={"/login"}
        >
          <ButtonFilled
            text="Go to Login"
            bgGradient={"yes"}
            padXResponsive
            paddingYSmall
          />
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailure;
