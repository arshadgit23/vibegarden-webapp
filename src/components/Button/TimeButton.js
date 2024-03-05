import React, { useState } from "react";

const TimeButton = ({ first = "00:00", second }) => {
  return (
    <div className="time-button ">
      <p>{first}</p>
      {second && (
        <>
          <p className="character">|</p>
          <p>{second}</p>
        </>
      )}
    </div>
  );
};

export default TimeButton;
