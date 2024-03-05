import React from "react";
import classes from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setPackage } from "../../redux/slices/selectPackage";
import { BsCheckLg } from "react-icons/bs";

const PaymentPlanCard = ({ paymentPlan, state, setState }) => {
  const dispatch = useDispatch();
  const pkg = useSelector((state) => state.selectPackage.packageId);

  return (
    <div
      className={`ppcy ${paymentPlan._id === pkg && classes.clickedCard}`}
      style={{
        position: "relative",
      }}
      onClick={() => {
        dispatch(setPackage(paymentPlan._id));
        console.log(paymentPlan._id);
        setState({ ...state, package: paymentPlan._id });
      }}
    >
      <h4 className="ppcy-heading">{paymentPlan.name}</h4>
      <p className="ppcy-price">${paymentPlan.price}</p>
      <p className="ppcy-info">{paymentPlan.duration}</p>
      <p className="ppcy-sub-info">{paymentPlan.description}</p>

      {paymentPlan._id === pkg ? (
        <div
          style={{
            width: "100%",
            position: "absolute",
            bottom: "-20px",
            left: "0",
          }}
        >
          <span
            className="sa-choice-checked bg-gradient-pink"
            style={{
              borderRadius: "50%",
              width: "75px",
              height: "75px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginInline: "auto",
            }}
          >
            <BsCheckLg size={50} fill="white" />
          </span>
        </div>
      ) : (
        <div>
          <button
            style={{
              textTransform: "uppercase",
              backgroundColor: "#2979ff",
              outline: "none",
              border: "none",
              color: "white",
              fontSize: "14px",
              width: "55%",
              borderRadius: "10px",
              paddingBlock: "5px",
            }}
            onClick={() => {
              dispatch(setPackage(paymentPlan._id));
              console.log(paymentPlan._id);
              setState({ ...state, package: paymentPlan._id });
            }}
          >
            select
          </button>
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default PaymentPlanCard;
