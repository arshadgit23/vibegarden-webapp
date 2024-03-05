import React, { useState } from "react";
import ButtonFilled from "../Button/ButtonFilled";
import { TiTick } from "react-icons/ti";

const SubscriptionModal = ({
  state = false,
  setState = () => null,
  payNowFunction = () => null,
  //   selected = "monthly"
}) => {
  const [selected, setSelected] = useState("monthly");
  //   const st = false;
  return (
    <>
      {state && (
        <div className="sub-modal-overlay">
          <div className="sub-modal">
            <div
              className="sub-modal-package"
              onClick={() => setSelected("monthly")}
            >
              <h4 className={`${selected === "monthly" && "sbmh-green"}`}>
                Monthly <span>$22</span>
              </h4>
              <span
                className={`${selected !== "monthly" && "sbm-grey"} sbm-icon`}
              >
                <TiTick color="white" size={14} />
              </span>
            </div>
            <div
              className="sub-modal-package"
              onClick={() => setSelected("yearly")}
            >
              <h4 className={`${selected === "yearly" && "sbmh-green"}`}>
                Yearly <span>${22 * 12}</span>
              </h4>
              <span
                className={`${selected !== "yearly" && "sbm-grey"} sbm-icon`}
              >
                <TiTick color="white" size={14} />
              </span>
            </div>
            {selected === "monthly" ? (
              <span onClick={() => setState(false)} className="sbm-btn">
                <ButtonFilled
                  text="Ok"
                  bgGradient={"yes"}
                  padXResponsive
                  paddingYSmall
                />
              </span>
            ) : (
              <span className="sbm-btn" onClick={() => payNowFunction()}>
                <ButtonFilled
                  text="Pay Now"
                  bgGradient={"yes"}
                  padXResponsive
                  paddingYSmall
                />
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionModal;
