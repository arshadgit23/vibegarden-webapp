import React from "react";
import VidCard from "../../components/VidCard";
import CheckBoxList from "../../components/CheckBoxList";
import ButtonFilled from "../../components/Button/ButtonFilled";
import AlertModal from "../../components/Modal/AlertModal";
import { useState } from "react";

const CancelSubscription = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <AlertModal
        message="Your Subscription Has Been Cancelled"
        state={showModal}
        setState={setShowModal}
        linkTo="/join-us"
      />
      <div className="cancel-subs cs">
        <div className="container-lg cs-container">
          <h1 className="text-center">Cancel Subscription</h1>
          <div className="row cs-row">
            <div className="col-md-5 cs-col cs-col-1">
              <div className="cs-video">
                <VidCard />
              </div>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam.
              </p>
            </div>
            <div className="col-md-1 cs-col cs-col-2">
              <div className="cs-line"></div>
            </div>
            <div className="col-md-5 cs-col cs-col-3">
              <h5>Leaving Because: </h5>
              <CheckBoxList lg />
            </div>
          </div>
          <div className="cs-btn" onClick={() => setShowModal(true)}>
            <ButtonFilled
              text="Submit"
              bgGradient={"yes"}
              padXResponsive
              padYResponsive
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelSubscription;
