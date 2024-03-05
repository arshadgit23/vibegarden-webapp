import React, { useEffect } from "react";
import ButtonFilled from "../Button/ButtonFilled";
import { useState } from "react";
import { apiRequest } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const SearchInput = ({ value, onChange, selectedTag }) => {
  const navigate = useNavigate();

  const getVideosByTags = async () => {
    try {
      // setLoading(true);
      const response = await apiRequest.get(`videos/tag/${selectedTag?._id}`);
      if (response.status === 200) {
        console.log("response?.data", response?.data?.data);
        navigate(`/tag/${selectedTag?.name}`, {
          state: { videos: response?.data?.data },
        });
        // setLoading(false);
      }
    } catch (err) {
      console.log(err);
      // setLoading(false);
    }
  };

  return (
    <div className="search-input-container">
      <input
        className="search-input"
        placeholder="Search by tags"
        value={selectedTag?.name}
        onChange={onChange}
      />
      <div className="search-input-btn" onClick={getVideosByTags}>
        <ButtonFilled text="Search" bgGradient={"yes"} />
      </div>
    </div>
  );
};

export default SearchInput;
