import React from "react";
import { Link } from "react-router-dom";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

const ColoredLink = ({ text = "Colored Link" }) => {
  return (
    <p className="colored-link">
      {text}
      <span>
        <TrendingFlatIcon fontSize="large" />
      </span>
    </p>
  );
};

export default ColoredLink;
