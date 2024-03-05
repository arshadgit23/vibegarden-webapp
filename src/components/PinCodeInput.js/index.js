import React, { useState, useRef } from "react";

const PinCodeInput = ({
  pci = { pci1: "", pci2: "", pci3: "", pci4: "" /* , pci5: "", pci6: "" */ },
  setPci = () => null,
}) => {
  const pci1Ref = useRef(null);
  const pci2Ref = useRef(null);
  const pci3Ref = useRef(null);
  const pci4Ref = useRef(null);
  // const pci5Ref = useRef(null);
  // const pci6Ref = useRef(null);

  return (
    <div className="pci">
      <input
        ref={pci1Ref}
        type={"text"}
        placeholder="."
        value={pci.pci1}
        onChange={(text) => {
          setPci({
            ...pci,
            pci1: text.target.value,
          });

          if (text.target.value) pci2Ref.current.focus();
        }}
        className="pci-input"
        maxLength={1}
      />
      <input
        type={"text"}
        ref={pci2Ref}
        placeholder="."
        value={pci.pci2}
        onChange={(text) => {
          setPci({
            ...pci,
            pci2: text.target.value,
          });
          if (text.target.value) pci3Ref.current.focus();
        }}
        className="pci-input"
        maxLength={1}
      />
      <input
        type={"text"}
        ref={pci3Ref}
        placeholder="."
        value={pci.pci3}
        onChange={(text) => {
          setPci({
            ...pci,
            pci3: text.target.value,
          });
          if (text.target.value) pci4Ref.current.focus();
        }}
        className="pci-input"
        maxLength={1}
      />
      <input
        type={"text"}
        ref={pci4Ref}
        placeholder="."
        value={pci.pci4}
        onChange={(text) => {
          setPci({
            ...pci,
            pci4: text.target.value,
          });
          // if (text.target.value) pci5Ref.current.focus();
        }}
        className="pci-input"
        maxLength={1}
      />
      {/* <input
        type={"text"}
        ref={pci5Ref}
        placeholder="."
        value={pci.pci5}
        onChange={(text) => {
          setPci({
            ...pci,
            pci5: text.target.value,
          });
          if (text.target.value) pci6Ref.current.focus();
        }}
        className="pci-input"
        maxLength={1}
      />
      <input
        type={"text"}
        ref={pci6Ref}
        placeholder="."
        value={pci.pci6}
        onChange={(text) => {
          setPci({
            ...pci,
            pci6: text.target.value,
          });
        }}
        className="pci-input"
        maxLength={1}
      /> */}
    </div>
  );
};

export default PinCodeInput;
