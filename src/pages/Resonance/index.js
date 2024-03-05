import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import Toggle from "react-styled-toggle";
import ButtonFilled from "../../components/Button/ButtonFilled";
import GreenButtonOff from "../../components/Button/GreenButtonOff";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../../api/axios";
import Loader from "../../components/Modal/loader";
import AlertModal from "../../components/Modal/AlertModal";

const Resonance = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tagIds, setTagIds] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        setLoading(true);
        const response = await apiRequest.get("/tags");
        if (response.status === 200) {
          setTags(response.data.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getTags();
  }, []);

  const selectTagsHandler = async () => {
    if (!tagIds.length) {
      setError("Select tag fisrt");
      return;
    }
    try {
      setLoading(true);
      const response = await apiRequest.post(
        `resonance-finder-question/all/questions/web`,
        { tagIds: tagIds }
      );
      // dispatch(setUser(response.data.data.user));
      setLoading(false);
      navigate("/resonancefinder", {
        state: { data: response?.data?.data, selectedTagIds: tagIds },
      });
    } catch (err) {
      setLoading(false);
      if (err.message === "Network Error") return setError("Network Error");
      const data = err?.response?.data;
      setError(data?.message);
    }
  };

  // const selectTagsHandler = async () => {
  //   try {
  //     setLoading(true);
  //     const resonanceResult = {
  //       selectedTagIds,
  //     };
  //     const response = await apiRequest.patch(`users/updateMe`, {
  //       resonanceResult: resonanceResult,
  //     });
  //     // dispatch(setUser(response.data.data.user));
  //     setLoading(false);
  //   } catch (err) {
  //     setLoading(false);
  //     if (err.message === "Network Error") return setError("Network Error");
  //     const data = err?.response?.data;
  //     setError(data?.message);
  //   }
  // };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="resonance">
          <NavBar />
          <AlertModal state={error} message={error} setState={setError} />
          <div className="container resonance-container">
            <div className="rt-top">
              <div className="rt-topleft">
                <h4>
                  Select Your Topic Resonance
                  {/* ? */}
                </h4>
                {/* <div className="d-flex">
                  <h4>OR Try Our</h4>
                  <span className="mx-3">
                    <Link to="/resonancefinder">
                      <GreenButtonOff text="Resonance Finder" />
                    </Link>
                  </span>
                </div> */}
              </div>
              <span className="rt-topright">
                {/* <Link to="/home"> */}
                <div onClick={() => navigate("/")}>
                  <span>&#10005;</span>
                </div>
                {/* </Link> */}
              </span>
            </div>
            <div className="resonance-choices">
              {/* <div className="resonance-toggle">
            <Toggle
              backgroundColorChecked="rgba(27, 91, 47, 1)"
              backgroundColorUnchecked="#75997E"
              value={"buddhism"}
              onChange={(e) =>
                console.log(e.target.checked ? e.target.value : null)
              }
            />
            <label className="rt-label">Buddhism</label>
          </div> */}

              {tags?.map((tag, ind) => {
                return (
                  <div key={ind} className="resonance-toggle">
                    <Toggle
                      backgroundColorChecked="rgba(27, 91, 47, 1)"
                      backgroundColorUnchecked="#75997E"
                      value={tag?._id}
                      onChange={(e) =>
                        e.target.checked
                          ? setTagIds([...tagIds, e.target.value])
                          : setTagIds((prevIds) =>
                              prevIds.filter((id) => id !== e.target.value)
                            )
                      }
                    />
                    <label className="rt-label">{tag?.name}</label>
                  </div>
                );
              })}
            </div>
            <div className="resonance-btn" onClick={selectTagsHandler}>
              <ButtonFilled
                bgGradient={"yes"}
                text="Save"
                padXBig
                padYResponsive
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Resonance;
