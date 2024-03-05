// Library Imports
import React, { useState, useEffect } from "react";
import { BsCheckLg } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
// Redux Slices
import { setLoading } from "../../redux/slices/loadingSlice";
import { setUser } from "../../redux/slices/userSlice";
// Custom Imports
import { apiRequest } from "../../api/axios";
import AlertModal from "../../components/Modal/AlertModal";
import ButtonFilled from "../../components/Button/ButtonFilled";
import AWS from "../../awsImageURL";
import SkipButton from "../../components/SkipButton";

const SelectBloom = () => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // States
  const [choice, setChoice] = useState("");
  const [blooms, setBlooms] = useState([]);
  const [error, setError] = useState(false);
  // Redux State Read
  const user = useSelector((state) => state.user.user);

  const getBlooms = async () => {
    try {
      const response = await apiRequest.get("/bloom-or-character?type=bloom");
      if (response.status === 200) {
        setBlooms(response?.data?.data);
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };
  const setUserBloom = async () => {
    try {
      console.log("selecting bloom from user");
      if (!choice) return setError("Please select a bloom");
      dispatch(setLoading(true));
      const response = await apiRequest.patch(`users/updateMe`, {
        bloom: choice,
      });

      if (response.status === 200) {
        dispatch(setUser(response.data.data.user));
        dispatch(setLoading(false));
        setTimeout(() => {
          navigate("/bloomcheck");
        }, 1000);
      }
    } catch (err) {
      dispatch(setLoading(false));
      if (err.message === "Network Error") return setError("Network Error");
      setError(err.response.data.message);
    }
  };
  // UseEffect
  useEffect(() => {
    getBlooms();
  }, []);

  // bg-lightGreenMask
  return (
    <div className="selectavatar" style={{ position: "relative" }}>
      {/* <NavBar onlyBrand /> */}
      <AlertModal message={error} state={error} setState={setError} />
      <div className="select-avatar ">
        <Link to="/selectavatar">
          <span className="bc-back">
            <RiArrowLeftLine size={30} fill="white" />
          </span>
        </Link>
        <h2>
          Brilliant! And Now which Blooms <br />
          Speaks To your heart?
        </h2>

        <div className="avatar-container">
          {blooms.length === 0 ? (
            <h1>No suggested blooms available</h1>
          ) : (
            blooms.map((bloom) => {
              return (
                <div className="sa-imageAndText" key={bloom._id}>
                  {choice === bloom._id ? (
                    <span className="sa-choice-checked bg-gradient-pink">
                      <BsCheckLg size={50} fill="white" />
                    </span>
                  ) : (
                    <div
                      className="sa-image"
                      onClick={() => setChoice(bloom._id)}
                    >
                      <img
                        src={`${AWS.REACT_APP_AWS_URL}${bloom.image}`}
                        alt={bloom?.croppedImage}
                      />
                    </div>
                  )}

                  <Link
                    to="/bloominfo"
                    state={{
                      heading: bloom?.title.split("-").join(" "),
                      description: bloom?.description,
                      image: bloom?.image,
                    }}
                  >
                    <p>
                      Meet <br />
                      {bloom?.title.split("-").join(" ")}
                    </p>
                  </Link>
                </div>
              );
            })
          )}
        </div>
        {/* <Link to="/bloomcheck"> */}
        <span onClick={setUserBloom}>
          <ButtonFilled
            text="Continue"
            bgGradient={"yes"}
            padXResponsive
            padYResponsive
          />
        </span>
        {/* </Link> */}
      </div>
      {/* <Footer /> */}
      <SkipButton />
    </div>
  );
};

export default SelectBloom;
