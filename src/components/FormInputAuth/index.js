// Library Imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { TiTick } from "react-icons/ti";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { green, grey } from "@mui/material/colors";

const FormGroupAuth = ({
  inputType = "text",
  label = "Label",
  isSelectInput,
  selectId = "default",
  selectName = "defaultname",
  options = ["option1", "option2", "option3"],
  noLabel,
  placeHolder = "",
  icon,
  showPasswordIcon = false,
  value,
  setValue,
  disabled = false,
  searchState = "all",
  searchCatState = ["nulls"],
  selectedIcon,
  selectedIconDisabled,
}) => {
  // States
  const [inputTypeState, setInputTypeState] = useState(inputType);
  // Redux State Read
  const showPasswordText = () => {
    setInputTypeState(inputTypeState === "password" ? "text" : "password");
  };
  if (!isSelectInput) {
    return (
      <div className="fga-form-group">
        {!noLabel && <p className="fga-form-label">{label}</p>}
        <input
          type={inputType !== "date" ? inputTypeState : "date"}
          className={`fga-form-input ${disabled && "fga-form-input-disabled"}`}
          placeholder={placeHolder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          disabled={disabled}
          minLength={inputType === "password" ? 8 : false}
        />
        {icon && (
          <div
            className={` ${
              noLabel ? "fga-form-icon-no-label" : "fga-form-icon"
            }`}
          >
            <Link
              to="/searchpage"
              state={{
                searchState: searchState,
                searchCatState: searchCatState,
              }}
            >
              <SearchIcon fontSize="large" sx={{ color: green[700] }} />
            </Link>
          </div>
        )}
        {selectedIcon && (
          <div
            className={` ${
              noLabel ? "fga-form-icon-no-label" : "fga-form-icon"
            }`}
          >
            <span className="form-selected-icon">
              <TiTick fontSize={18} color="white" />
            </span>
          </div>
        )}
        {selectedIconDisabled && (
          <div
            className={` ${
              noLabel ? "fga-form-icon-no-label" : "fga-form-icon"
            }`}
          >
            <span className="form-selected-icon form-selected-icon-disabled">
              <TiTick fontSize={18} color="white" />
            </span>
          </div>
        )}
        {showPasswordIcon && (
          <div
            className={` ${
              noLabel ? "fga-form-icon-no-label" : "fga-form-icon"
            }`}
            onClick={showPasswordText}
          >
            <div className="showPasswordIcon">
              <VisibilityOffIcon fontSize="large" sx={{ color: grey[600] }} />
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="fga-form-group">
      <p className="fga-form-label">{label}</p>
      <select
        id={selectId}
        name={selectName}
        className={`fga-form-input ${disabled && "fga-form-input-disabled"}`}
        disabled={disabled}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        {options.map((op, index) => (
          <option value={op} key={`${op}-${index}`}>
            {`${op.slice(0, 1).toUpperCase()}${op.slice(1)}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormGroupAuth;
