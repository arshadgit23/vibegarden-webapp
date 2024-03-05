import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar";
import images from "../../constants/images";
import QuestionsData from "../../constants/dummyQuestions";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const ResonanceResult = () => {
  const [count, setCount] = useState(1);
  const [heading, setHeading] = useState("Plants are sentilents");
  const [questions, setQuestions] = useState(QuestionsData[0]);
  const [choice, setChoice] = useState("");

  useEffect(() => {
    if (count === 1) {
      setHeading("Plants are sentilents");
      setQuestions(QuestionsData[0]);
    }
    if (count === 2) {
      setHeading("The Multiverse is Real");
      setQuestions(QuestionsData[1]);
    }
    if (count === 3) {
      setHeading("Data Help me Accept new concepts.");
      setQuestions(QuestionsData[2]);
    }
    if (count === 4) {
      setHeading("We Each Have Angles?");
      setQuestions(QuestionsData[3]);
    }
  }, [count]);

  return (
    <div className="res-finder">
      <NavBar />
      <div className="container-lg rf-container res-res">
        {/* <div className="rf-row row"> */}
        {/* <div className={`rf-left ${count !== 5 && "col-lg-7 col-md-6"}`}> */}
        <div className="rf-top">
          <h4>Resonance Finder</h4>
          <span className="rf-topright">
            <Link to="/homepage">
              <span>&#10005;</span>
            </Link>
          </span>
        </div>

        <div className="rf-result">
          <div className="row rf-row rr-row">
            <div className="col-md-6 rf-col-1 ">
              <h4>Result!</h4>
              <div className="rf-rainbow">
                <img src={images.resonanceRainbow} />
              </div>
              <p className="top-resonance">
                What fun your top areas resonance?
              </p>
              <div className="rf-result-list">
                <div className="rf-result-item">
                  <span className="rf-result-no">1</span>
                  <p className="rf-result-topic">Buddhism</p>
                </div>
                <div className="rf-result-item">
                  <span className="rf-result-no">2</span>
                  <p className="rf-result-topic">Plant Wisdom</p>
                </div>
                <div className="rf-result-item">
                  <span className="rf-result-no">3</span>
                  <p className="rf-result-topic">Quantum Physics Science</p>
                </div>
              </div>
              <p className="rf-rest">And The rest , in Descending Order:</p>
              <div className="rf-result-list">
                <div className="rf-result-item">
                  <span className="rf-result-no">1</span>
                  <p className="rf-result-topic">Inner dim light Beings</p>
                </div>
                <div className="rf-result-item">
                  <span className="rf-result-no">2</span>
                  <p className="rf-result-topic">Mindfullness</p>
                </div>
                <div className="rf-result-item">
                  <span className="rf-result-no">3</span>
                  <p className="rf-result-topic">Buddhism</p>
                </div>
                <div className="rf-result-item">
                  <span className="rf-result-no">4</span>
                  <p className="rf-result-topic">Western Physics</p>
                </div>
                <div className="rf-result-item">
                  <span className="rf-result-no">5</span>
                  <p className="rf-result-topic">Ascent Wisdom</p>
                </div>
                <div className="rf-result-item">
                  <span className="rf-result-no">6</span>
                  <p className="rf-result-topic">Nature</p>
                </div>
              </div>
            </div>
            <div className="col-md-6  rf-col-2">
              <h4>Note:</h4>
              <p>
                as You grow and heal your feelings of resonance will definitely
                change as it moves close your the essential resonance!
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default ResonanceResult;
