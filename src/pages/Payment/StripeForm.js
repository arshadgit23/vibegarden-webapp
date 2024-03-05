import classes from "./style.module.css";
import { useMemo, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import useResponsiveFontSize from "../../components/ResponsiveFontSize/responsive-font-size";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/loadingSlice";
import { apiRequest } from "../../api/axios";
import PaymentSuccessfulModal from "../../components/Modal/PaymentSuccessfulModal";
import reactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const StripeForm = () => {
  const navigate = useNavigate();
  const vgDetails = useSelector((state) => state.schedulVG.scheduleVG);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentKey, setPaymentKey] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  // console.log(paymentKey, vgDetails);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoading(true));
    if (!stripe || !elements) {
      dispatch(setLoading(false));
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });
    if (error) {
      // Handle error
      setErrorMessage(error.message);
    } else {
      // Payment method created successfully, you can proceed with further actions
      setPaymentKey(paymentMethod.id); // Store the payment method ID or any other relevant information
      const data = {
        ...vgDetails,
        pmId: paymentMethod.id,
      };
      try {
        const response = await apiRequest.post("/booking", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.data?.data) {
          dispatch(setLoading(false));
          setIsModal(true);
        }
      } catch (err) {
        setErrorMessage(
          err.response?.data?.message
            ? err.response?.data?.message
            : err.message
        );
        dispatch(setLoading(false));
      }
    }
  };

  const closeModalHelper = (isModal) => {
    setIsModal(isModal);
    navigate("/");
  };

  const modalHelper = reactDOM.createPortal(
    <PaymentSuccessfulModal
      upgradeText=""
      state={isModal}
      setState={closeModalHelper}
    />,
    document.getElementById("overlay")
  );

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      {isModal && modalHelper}
      <label>Card number</label>
      <CardNumberElement
        options={options}
        onReady={() => {
          console.log("CardNumberElement [ready]");
        }}
        onChange={(event) => {
          console.log("CardNumberElement [change]", event);
        }}
        onBlur={() => {
          console.log("CardNumberElement [blur]");
        }}
        onFocus={() => {
          console.log("CardNumberElement [focus]");
        }}
      />
      <label>Expiration date</label>
      <CardExpiryElement
        options={options}
        onReady={() => {
          console.log("CardNumberElement [ready]");
        }}
        onChange={(event) => {
          console.log("CardNumberElement [change]", event);
        }}
        onBlur={() => {
          console.log("CardNumberElement [blur]");
        }}
        onFocus={() => {
          console.log("CardNumberElement [focus]");
        }}
      />
      <label>CVC</label>
      <CardCvcElement
        options={options}
        onReady={() => {
          console.log("CardNumberElement [ready]");
        }}
        onChange={(event) => {
          console.log("CardNumberElement [change]", event);
        }}
        onBlur={() => {
          console.log("CardNumberElement [blur]");
        }}
        onFocus={() => {
          console.log("CardNumberElement [focus]");
        }}
      />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default StripeForm;
