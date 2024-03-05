import React from "react";
import ButtonFilled from "../../components/Button/ButtonFilled";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../../api/axios";
import Loader from "../../components/Modal/loader";
import { useState, useEffect } from "react";
import AlertModal from "../../components/Modal/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const PaymentSuccess = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log(user);

  useEffect(() => {
    if (user?.id) {
      updatePaymentExpiry();
    }
  }, []);

  const updatePaymentExpiry = async () => {
    setLoading(true);
    try {
      const response = await apiRequest.post(
        "/users/subscription/payment-success",
        {
          id: user?.id,
          isPaymentExpire: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(setUser(response?.data?.data));
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError(e?.response?.data?.data?.message);
    }
  };

  const handleUpdateMe = async () => {
    const updateUser = new FormData();
    updateUser.append("isPaymentDone", "true");
    setLoading(true);
    try {
      const response = await apiRequest.patch("/users/updateMe", updateUser, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.data);
      dispatch(setUser(response.data.data.user));
      setLoading(false);
      navigate("/selectAvatar");
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError(e.response.data.data.message);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AlertModal state={error} message={error} setState={setError} />
      {loading ? (
        <Loader />
      ) : (
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
            Payment Successful
          </p>
          <p
            style={{
              fontSize: "24px",
            }}
          >
            Success, Now let’s get you set up in the Garden with 3 quick
            questions!
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            onClick={handleUpdateMe}
          >
            <ButtonFilled
              text="Continue"
              bgGradient={"yes"}
              padXResponsive
              paddingYSmall
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
