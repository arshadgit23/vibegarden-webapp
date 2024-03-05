import { useState, useMemo } from "react";
import FormGroupAuth from "../../components/FormInputAuth";
import GreenButton from "../../components/Button/GreenButton";
import images from "../../constants/images";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import StripeForm from "./StripeForm";

const Payment = () => {
  const navigate = useNavigate();
  const stripePromise = loadStripe(
    "pk_test_51Lu2eNG7d6LAhtrknXabAfTeJIhWjf3diLSSLCJ6eKksP7f5JBPfioMB8nPHqDZv9CVeeAkNACezvu8r1tqbMwPt00NSPkCsoV"
  );

  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentKey, setPaymentKey] = useState("");

  // const options = {
  //   mode: "payment",
  //   amount: 1099,
  //   currency: "usd",
  // };

  return (
    <div className="payment">
      <div
        className="ec-icon"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBackIosRoundedIcon
          color="success"
          fontSize="large"
          className="icon"
        />
      </div>
      <div className="payment-top">
        <h2>Payment Details</h2>
        <p>Credit Card Or Debit Card</p>
      </div>
      <Elements stripe={stripePromise}>
        <StripeForm />
      </Elements>
      {/* <div>
        <FormGroupAuth label="Card Number" />
        <FormGroupAuth label="Expiration Date" inputType="date" />
        <FormGroupAuth label="Security Code" />
      </div> */}
      {/* <div className="payment-btn">
        <Link to="/thankyou"></Link>
      </div> */}
      <div className="payment-price">
        <img src={images.paymentOptions} />
      </div>
    </div>
  );
};

export default Payment;
