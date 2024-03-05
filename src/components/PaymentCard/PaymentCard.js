import React, { useState } from "react";
import {
  CardNumberElement,
  useElements,
  useStripe,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import classes from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import GreenButton from "../Button/GreenButton";
import { apiRequest } from "../../api/axios";
import Loader from "../../components/Modal/loader";
import AlertModal from "../Modal/AlertModal";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const options = {
  style: {
    base: {
      fontSize: "16px",
      width: "100%",
      color: "#424770",
      padding: "10px",
      letterSpacing: "0.025em",
      fontFamily: "Roboto, Source Code Pro, monospace, SFUIDisplay",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const PaymentCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const element = useElements();
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!element || !stripe) {
      return;
    }

    const cardElement = element.getElement(
      CardNumberElement,
      CardCvcElement,
      CardExpiryElement
    );

    try {
      setLoading(true);
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      const paymentIntendDetails = {
        paymentMethodId: paymentMethod.id,
        packageId: user?.package,
      };

      const response = await apiRequest.post(
        "packages/buy",
        paymentIntendDetails
      );

      if (response.status === 200) {
        dispatch(setUser(response.data.data));
        setMessage(response.data.status);
        setLoading(false);
        setTimeout(() => {
          if (!response.data.data.avatar) navigate("/selectAvatar");
          else if (!response.data.data.bloom) navigate("/selectbloom");
          else if (!response.data.data.bloomPercentage) navigate("/bloomcheck");
          else navigate("/");
        }, 1000);
      } else {
        setLoading(false);
        setError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className={classes.paymentCardContainer}>
      {loading && <Loader />}
      <AlertModal state={error} message={error} setState={setError} />
      <form className="paymentCardForm" onSubmit={handleSubmit}>
        <label htmlFor="paymentCard">
          <h3>Payment Card</h3>
        </label>
        <div>
          <label htmlFor="cardNumberElement" className={classes.labels}>
            Card number
          </label>
          <CardNumberElement id="cardNumberElement" options={options} />
        </div>
        <div>
          <label htmlFor="cardExpiryElement" className={classes.labels}>
            Expiration date
          </label>
          <CardExpiryElement id="cardExpiryElement" options={options} />
        </div>
        <div>
          <label htmlFor="cardCvcElement" className={classes.labels}>
            CVC
          </label>
          <CardCvcElement id="cardCvcElement" options={options} />
        </div>
        <div className={classes.buttonContainer}>
          <GreenButton paddingX text="Submit" />
        </div>
        {message && <p className="classes.successMessage">{message}</p>}
      </form>
    </div>
  );
};

export default PaymentCard;
