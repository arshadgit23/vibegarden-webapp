import React from "react";
import { Link } from "react-router-dom";

const SkipButton = () => {
  return (
    <Link
      to={"/home"}
      style={{
        position: "absolute",
        top: "40px",
        right: "50px",
        fontSize: "20px",
        fontWeight: "700",
        color: "#006400",
      }}
    >
      Skip &gt;
    </Link>
  );
};

export default SkipButton;
