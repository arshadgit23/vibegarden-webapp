import React, { useEffect, useState } from "react";
import ButtonFilled from "../Button/ButtonFilled";
import { Link } from "react-router-dom";
import { apiRequest } from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { BsCheckLg } from "react-icons/bs";
import AWS from "../../awsImageURL";
import { setUser } from "../../redux/slices/userSlice";
import Loader from "./loader";

const BloomModal = ({ choice, setChoice, setAvatarModel }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [avatars, setAvatars] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAvatars = async () => {
      try {
        setLoading(true);
        const response = await apiRequest.get("/bloom-or-character?type=bloom");
        if (response.status === 200) {
          setAvatars(response.data.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getAvatars();
  }, []);

  console.log("choice", choice);
  const setUserAvatar = async () => {
    try {
      if (!choice) return setError("Please select a bloom");
      setLoading(true);
      const data = {
        bloom: choice,
        bloomUpdatedDate: Date.now(),
      };
      const response = await apiRequest.patch(`users/updateMe`, data);
      dispatch(setUser(response.data.data.user));
      setLoading(false);
      setAvatarModel(false);
    } catch (err) {
      setLoading(false);
      if (err.message === "Network Error") return setError("Network Error");
      const data = err?.response?.data;
      setError(data?.message);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="alertModal-overlay">
          <div className="alertModal">
            <h4>Update Bloom</h4>

            <div className="avatar-container">
              {avatars.length === 0 ? (
                <h1>No suggested bloom available</h1>
              ) : (
                avatars.map((avatar) => {
                  return (
                    <div className="sa-imageAndText" key={avatar._id}>
                      {choice === avatar._id ? (
                        <span className="sa-choice-checked bg-gradient-pink">
                          <BsCheckLg size={50} fill="white" />
                        </span>
                      ) : (
                        <div
                          className="sa-image"
                          onClick={() => setChoice(avatar._id)}
                        >
                          <img
                            src={`${AWS.REACT_APP_AWS_URL}${avatar.image}`}
                            alt={avatar.title}
                          />
                        </div>
                      )}

                      <Link
                        to="/bloominfo"
                        state={{
                          heading: avatar.title.split("-").join(" "),
                          description: avatar.description,
                          image: `${AWS.REACT_APP_AWS_URL}${avatar.image}`,
                        }}
                      >
                        <p>
                          Meet <br />
                          {avatar.title.split("-").join(" ")}
                        </p>
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <span onClick={() => setUserAvatar()}>
                <ButtonFilled
                  text="Update"
                  bgGradient={"yes"}
                  padXResponsive
                  paddingYSmall
                />
              </span>
              <span onClick={() => setAvatarModel(false)}>
                <ButtonFilled text="Cancel" padXResponsive paddingYSmall />
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BloomModal;
