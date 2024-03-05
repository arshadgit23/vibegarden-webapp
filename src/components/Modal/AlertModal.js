import React, { useState } from "react";
import ButtonFilled from "../Button/ButtonFilled";
import { Link, useNavigate } from "react-router-dom";

const AlertModal = ({
  message = "Please write a message",
  state = false,
  setState = () => null,
  extraFunc = () => null,
  linkTo = "#",
  reload,
  navigateTo = false,
  onOverlay,
}) => {
  //   const [showModal, setShowModal] = useState(state);
  const navigate = useNavigate();
  return (
    <>
      {state && (
        <div
          className="alertModal-overlay"
          onClick={() => {
            onOverlay && onOverlay(false);
          }}
        >
          <div className="alertModal">
            <h4>{message}</h4>
            {/* <Link to={linkTo}> */}
            <span
              onClick={() => {
                setState(false);
                extraFunc();
                if (reload) window.location.reload(false);
                if (navigateTo) navigate(navigateTo);
              }}
            >
              <ButtonFilled
                text="Ok"
                bgGradient={"yes"}
                padXResponsive
                paddingYSmall
              />
            </span>
            {/* </Link> */}
          </div>
        </div>
      )}
    </>
  );
};

export default AlertModal;
