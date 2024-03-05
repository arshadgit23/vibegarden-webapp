import React from "react";
import { ClipLoader, BounceLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <ClipLoader
          color="green"
          size={80}
          aria-label="Loading Spinner"
          cssOverride={{ borderWidth: 10 }}
        />
      </div>
      {/* <BounceLoader color="#1C5C2E" size={150} aria-label="Loading Spinner" /> */}
    </div>
  );
};

export default Loader;
