// Library Imports
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
// Redux Slices
import { setLoading } from "../../redux/slices/loadingSlice";
import { setUser } from "../../redux/slices/userSlice";
// Custom Imports
import { apiRequest } from "../../api/axios";
import ButtonFilled from "../../components/Button/ButtonFilled";
import AlertModal from "../../components/Modal/AlertModal";
import AWS from "../../awsImageURL";
import SkipButton from "../../components/SkipButton";

const SelectAvatar = () => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // States
  const [choice, setChoice] = useState("");
  const [avatars, setAvatars] = useState([]);
  const [error, setError] = useState(false);
  // Redux State Read
  const user = useSelector((state) => state.user.user);

  // OnClick Handlers
  const getAvatars = async () => {
    try {
      const response = await apiRequest.get(
        "/bloom-or-character?type=character"
      );

      dispatch(setLoading(true));
      if (response.status === 200) {
        setAvatars(response.data.data);
        dispatch(setLoading(false));
      }
    } catch (err) {
      dispatch(setLoading(false));
      console.log(err);
    }
  };
  const setUserAvatar = async () => {
    try {
      if (!choice) return setError("Please select an avatar");
      const token = `Bearer ${localStorage.getItem("token")}`;
      console.log(token);
      dispatch(setLoading(true));
      const response = await apiRequest.patch(`users/updateMe`, {
        avatar: choice,
      });

      setTimeout(() => {
        dispatch(setUser(response.data.data.user));
        dispatch(setLoading(false));
        navigate("/selectbloom");
        // if (!user.bloom) {
        //   navigate("/selectbloom");
        // } else if (!user.bloomPercentage) {
        //   navigate("/bloomcheck");
        // } else {
        //   navigate("/home");
        // }
      }, 1000);
    } catch (err) {
      dispatch(setLoading(false));
      if (err.message === "Network Error") return setError("Network Error");
      const data = err?.response?.data;
      setError(data?.message);
    }
  };
  // UseEffect
  useEffect(() => {
    getAvatars();
  }, []);

  return (
    <div className="selectavatar" style={{ position: "relative" }}>
      <AlertModal message={error} state={error} setState={setError} />
      <div className="select-avatar ">
        <h2>
          Which of these avatars
          <br /> resonate you most?
        </h2>

        <div className="avatar-container">
          {avatars.length === 0 ? (
            <h1>No suggested avatars available</h1>
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
                    to="/avatarinfo"
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

        <span onClick={setUserAvatar}>
          <ButtonFilled
            text="Continue"
            bgGradient={"yes"}
            padXResponsive
            padYResponsive
          />
        </span>
      </div>
      <SkipButton />
    </div>
  );
};

export default SelectAvatar;
