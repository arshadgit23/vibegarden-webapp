// Library Imports
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
// Redux Slices
import { setLoading } from "../../redux/slices/loadingSlice";
// Custom Imports
import { apiRequest } from "../../api/axios";
import ButtonFilled from "../Button/ButtonFilled";
import ThankYouSubModal from "../ThankYouSubModel";
import AlertModal from "../../components/Modal/AlertModal";

const StayInTouch = () => {
  // Hooks
  const dispatch = useDispatch();
  // States
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(null);
  const [error, setError] = useState("");
  // OnClick Handlers
  const subscription = async () => {
    try {
      if (!email) return setError("Please enter a valid email");
      dispatch(setLoading(true));
      const { data } = await apiRequest.patch("/subscribeEmail", {
        email: email,
      });
      console.log("data received", data);
      dispatch(setLoading(false));
      setEmail("");
      setShowModal(true);
    } catch (err) {
      dispatch(setLoading(false));
      if (err.message === "Network Error") return setError("Network Error");
      const data = err?.response?.data;
      setError(data?.message);
    }
  };
  return (
    <Container fluid className="sit text-center px-4 py-5 ">
      <AlertModal message={error} state={error} setState={setError} />
      <h2 className="sit-heading">Want To Stay In Touch</h2>
      <p className="sit-para">
        Default body copy style for text on white / light color backgrounds
        (Regular weight). Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Mauris placerat euismod porttitor.
      </p>
      <input
        type={"email"}
        placeholder="Enter your email address"
        className="sit-input"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <div onClick={() => subscription()}>
        <ButtonFilled text="Subscribe" bgGradient="yes" paddingX="60px" />
      </div>
      {showModal && (
        <ThankYouSubModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </Container>
  );
};

export default StayInTouch;
