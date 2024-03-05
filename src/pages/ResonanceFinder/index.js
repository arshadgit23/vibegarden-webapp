import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar";
import { BsChevronUp, BsChevronDown, BsCheckLg } from "react-icons/bs";
import res1 from "../../assets/images/reson1.svg";
import res2 from "../../assets/images/reson2.svg";
import res3 from "../../assets/images/reson3.svg";
import res4 from "../../assets/images/reson4.svg";
import ButtonFilled from "../../components/Button/ButtonFilled";
import VidCard from "../../components/VidCard";
import images from "../../constants/images";
import QuestionsData from "../../constants/dummyQuestions";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import ResonanceQuestion from "../../components/resonanceQuestion";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/loadingSlice";
import { apiRequest } from "../../api/axios";
import { imageURL } from "../../api/axios";

const ResonanceFinder = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const [resonanceFinder, setResonanceFinder] = useState([]);
  const [resonanceQandA, setResonanceQandA] = useState([]);
  const [heading, setHeading] = useState("Plants are sentilents");
  const [questions, setQuestions] = useState(QuestionsData[0]);
  const [choice, setChoice] = useState("");
  const [percentage, setPercentage] = useState([]);
  const [averagePercentage, setAveragePercentage] = useState();
  const [tags, setTags] = useState({});
  const [user, setUser] = useState();

  // useEffect(() => {
  //   if (count === 1) {
  //     setHeading("Plants are sentilents");
  //     setQuestions(QuestionsData[0]);
  //   }
  //   if (count === 2) {
  //     setHeading("The Multiverse is Real");
  //     setQuestions(QuestionsData[1]);
  //   }
  //   if (count === 3) {
  //     setHeading("Data Help me Accept new concepts.");
  //     setQuestions(QuestionsData[2]);
  //   }
  //   if (count === 4) {
  //     setHeading("We Each Have Angles?");
  //     setQuestions(QuestionsData[3]);
  //   }
  // }, [count]);

  // console.log("state", state);
  // console.log(resonanceFinder?.thumbnail);

  const getResonanceQa = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiRequest.get(
        "/resonance-finder-question/all/questions"
      );
      setResonanceFinder(data?.data?.resonanceFinder);
      setResonanceQandA(data?.data?.questions);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      setError(err?.message);
    }
  };
  useEffect(() => {
    getResonanceQa();
  }, []);

  const answers = [];
  for (let key in state?.data?.questions[count]) {
    switch (key) {
      case "answer1":
        answers.push({
          answer: state?.data?.questions[count]["answer1"],
          percentage: state?.data?.questions[count]["answer1Value"],
        });
        break;
      case "answer2":
        answers.push({
          answer: state?.data?.questions[count]["answer2"],
          percentage: state?.data?.questions[count]["answer2Value"],
        });
        break;
      case "answer3":
        answers.push({
          answer: state?.data?.questions[count]["answer3"],
          percentage: state?.data?.questions[count]["answer3Value"],
        });
        break;
      case "answer4":
        answers.push({
          answer: state?.data?.questions[count]["answer4"],
          percentage: state?.data?.questions[count]["answer4Value"],
        });
        break;
    }
  }

  // let result;
  // let averagePercentage;
  // if (count + 1 > state?.data?.questions.length) {
  //   result = percentage?.reduce((acc, per) => {
  //     const result = acc + per;
  //     return result;
  //   }, 0);
  //   averagePercentage = result / percentage?.length;
  // }

  const resonanceResultHandler = async (text) => {
    if (count < state?.data?.questions.length) {
      setCount(count + 1);
    }
    let result;
    if (text === "See Results") {
      result = percentage?.reduce((acc, per) => {
        const result = acc + per;
        return result;
      }, 0);
      setAveragePercentage(result / percentage?.length);
      setCount(count + 1);
      try {
        setLoading(true);
        const resonanceResult = {
          selectedTagIds: state?.selectedTagIds,
          averageScore: result / percentage?.length,
        };
        const response = await apiRequest.patch(`users/updateMe`, {
          resonanceResult: resonanceResult,
          resonanceResultDate: Date.now(),
        });
        // console.log(response?.data?.data?.user?.resonanceResult);
        setTags(response?.data?.data?.user?.resonanceResult);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err.message === "Network Error") return setError("Network Error");
        const data = err?.response?.data;
        setError(data?.message);
      }
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await apiRequest.get(`/users/me`);
        if (response.status === 200) {
          setUser(response.data.data);
          // setLoading(false);
        }
      } catch (err) {
        console.log("errr", err);
        if (err.message === "Network Error") return setError("Network Error");
        const data = err?.response?.data;
        setError(data?.message);
      }
    };
    getUser();
  }, []);

  console.log("user", user);
  return (
    <div className="res-finder">
      <NavBar />
      <div className="container-lg rf-container">
        <div className="rf-row row">
          <div className={`rf-left ${count < 1 && "col-lg-7"}`}>
            <div className="rf-top">
              <h4>Resonance Finder</h4>
              <span className="rf-topright" onClick={() => navigate(-1)}>
                <span>&#10005;</span>
              </span>
            </div>
            {count + 1 <= state?.data?.questions.length && (
              <div>
                <p className="rf-count">{`${count + 1}/${
                  state?.data?.questions.length
                }`}</p>
                {/* {count !== 1 && (
                  <div className="rf-star">
                    <img src={images.resonanceStar} />
                  </div>
                )} */}
                <p className="rf-direction">
                  <span>Direction: </span>
                  {state?.data?.resonanceFinder?.direction}
                  {count === 1 ? (
                    <span className="rfd-sign">
                      <BsChevronUp size={25} style={{ marginBottom: 5 }} />
                    </span>
                  ) : (
                    <span className="rfd-sign">
                      <BsChevronDown size={25} style={{ marginBottom: 5 }} />
                    </span>
                  )}
                </p>
                {/* {count === 1 && (
                  <p className="rf-text">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    di At vero eos et accusam et justo duo.
                  </p>
                )} */}
                <p className="rf-statement">Statement:</p>
                <h3 className="rf-heading">
                  {state?.data?.questions[count]?.statement}
                </h3>
                {/* <div className="rf-choices">
                  {questions.map((ques) => {
                    return (
                      <span
                        className="rf-choice-container"
                        onClick={() => setChoice(ques.question)}
                      >
                        {ques.question === choice ? (
                          <span className="rf-choice-checked bg-gradient-pink">
                            <BsCheckLg size={25} fill="white" />
                          </span>
                        ) : (
                          <span className="rf-choice">
                            <img src={ques.image} />
                          </span>
                        )}
                        <label
                          className={`${
                            ques.question === "?" && "rf-choicequestion"
                          }`}
                        >
                          {ques.question}
                        </label>
                      </span>
                    );
                  })}
                </div> */}
                <div className={`rf-choices2 ${count !== 1 && "rfc-smwidth"}`}>
                  {answers.map((ques) => {
                    return (
                      <div
                        className="rf-choice2"
                        onClick={() => {
                          setChoice(ques?.answer);
                          setPercentage((prev) => [...prev, ques?.percentage]);
                        }}
                      >
                        {ques?.answer === choice ? (
                          <ResonanceQuestion
                            image={ques.image}
                            text={ques?.answer}
                            checked
                          />
                        ) : (
                          <ResonanceQuestion
                            image={ques.image}
                            text={ques?.answer}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div
                  className="rf-btn"
                  onClick={() =>
                    resonanceResultHandler(
                      count + 1 < state?.data?.questions.length
                        ? "Next"
                        : "See Results"
                    )
                  }
                >
                  <ButtonFilled
                    bgGradient={"yes"}
                    text={
                      count + 1 < state?.data?.questions.length
                        ? "Next"
                        : "See Results"
                    }
                    padXBig
                    paddingY
                  />
                  {/* {count < 4 ? (
                    <ButtonFilled
                      text=">"
                      bgGradient={"yes"}
                      padXBig
                      paddingY
                    />
                  ) : (
                    <ButtonFilled />
                  )} */}
                </div>
              </div>
            )}

            {count + 1 > state?.data?.questions.length && (
              <div className="rf-result">
                <div className="row rf-row">
                  <div className="col-lg-4 rf-col-1">
                    <h4>Result!</h4>
                    <div className="rf-rainbow">
                      <img src={images.resonanceRainbow} />
                    </div>
                    <p className="top-resonance">
                      What fun your top areas resonance?
                    </p>
                    <div className="rf-result-list">
                      {tags?.selectedTagIds?.map((selectedTag, ind) => {
                        return (
                          <div key={ind} className="rf-result-item">
                            <span className="rf-result-no">{ind + 1}</span>
                            <p className="rf-result-topic">
                              {selectedTag?.name}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <p className="rf-rest">
                      And The rest , in Descending Order:
                    </p>
                    <div className="rf-result-list">
                      {tags?.unSelectedTagIds?.map((unSelectedTag, ind) => {
                        return (
                          <div className="rf-result-item">
                            <span className="rf-result-no">{ind + 1}</span>
                            <p className="rf-result-topic">
                              {unSelectedTag?.name}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 rf-col-2">
                    <h4>Note:</h4>
                    <p>
                      as You grow and heal your feelings of resonance will
                      definitely change as it moves close your the essential
                      resonance!
                    </p>

                    <h4>Average Score</h4>
                    <p>{averagePercentage + "%"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* This will show on profle > your resonance finder result  */}

          {count + 1 === 1 && (
            // <div className="rf-right col-lg-5 col-md-6">
            //   <div className="rf-video">
            //     {/* <VidCard /> */}
            //     <img
            //       src={`${imageURL}${resonanceFinder?.thumbnail}`}
            //       width={"100%"}
            //       height={"100%"}
            //     />
            //   </div>
            // </div>

            <div className="rf-result">
              <div className="row rf-row">
                <div className="col-lg-4 rf-col-1">
                  <h4>Result!</h4>
                  <div className="rf-rainbow">
                    <img src={images.resonanceRainbow} />
                  </div>
                  <p className="top-resonance">
                    What fun your top areas resonance?
                  </p>
                  <div className="rf-result-list">
                    {user?.resonanceResult?.selectedTagIds?.map(
                      (selectedTag, ind) => {
                        return (
                          <div key={ind} className="rf-result-item">
                            <span className="rf-result-no">{ind + 1}</span>
                            <p className="rf-result-topic">
                              {selectedTag?.name}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                  <p className="rf-rest">And The rest , in Descending Order:</p>
                  <div className="rf-result-list">
                    {user?.resonanceResult?.unSelectedTagIds?.map(
                      (unSelectedTag, ind) => {
                        return (
                          <div className="rf-result-item">
                            <span className="rf-result-no">{ind + 1}</span>
                            <p className="rf-result-topic">
                              {unSelectedTag?.name}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 rf-col-2">
                  <h4>Note:</h4>
                  <p>
                    as You grow and heal your feelings of resonance will
                    definitely change as it moves close your the essential
                    resonance!
                  </p>

                  <h4>Average Score</h4>
                  <p>
                    {user?.resonanceResult?.averageScore
                      ? user?.resonanceResult?.averageScore + "%"
                      : 0 + "%"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResonanceFinder;
