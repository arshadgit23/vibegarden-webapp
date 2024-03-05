// Library Imports
import React from "react";
import { useSelector } from "react-redux";
// Custom Imports
import ContainerSection from "../Container";
import howItWorks1 from "../../assets/images/howitworks1.png";
import howItWorks2 from "../../assets/images/howitworks2.png";
import howItWorks3 from "../../assets/images/howitworks3.png";
import howItWorks4 from "../../assets/images/howitworks4.png";
import plusSign from "../../assets/images/plus-sign.svg";
import equalsSign from "../../assets/images/equals-sign.svg";

const HowItWorks = ({ homeLoggedOut }) => {
  // Redux State Read
  const homepage = useSelector((state) => state.homepage);
  return (
    <section className="hiw py-5">
      <ContainerSection isFluid={"yes"}>
        <div className="">
          <h2 className="hiw-heading">How It Works</h2>
          <div className="row mb-5 hiw-container">
            <div className="col-md-2 col-sm-4 col-4 hiw-big-col">
              <div className="hiw-img-container">
                <img
                  src={
                    homeLoggedOut &&
                    (homepage?.hiw1?.image
                      ? homepage?.hiw1?.image
                      : howItWorks1)
                  }
                  className="hiw-img"
                />
              </div>
              <div className="hiw-text-container">
                <h5 className="hiw-text-heading">
                  {homeLoggedOut &&
                    (homepage?.hiw1?.heading
                      ? homepage?.hiw1?.heading
                      : "Column Header Green")}
                </h5>
                <p className="hiw-text-para">
                  {homeLoggedOut &&
                    (homepage?.hiw1?.text
                      ? homepage?.hiw1?.text
                      : `Column Body Copy - same as default body copy style. Lorem
                  ipsum dolor sit amet`)}
                </p>
              </div>
            </div>
            <div className="col-md-1 col-sm-2 col-3 hiw-small-col">
              <img src={plusSign} />
            </div>
            <div className="col-md-2 col-sm-4 col-4 hiw-big-col">
              <div className="hiw-img-container">
                <img
                  src={
                    homeLoggedOut &&
                    (homepage?.hiw2?.image
                      ? homepage?.hiw2?.image
                      : howItWorks2)
                  }
                  className="hiw-img"
                />
              </div>
              <div className="hiw-text-container">
                <h5 className="hiw-text-heading">
                  {homeLoggedOut &&
                    (homepage?.hiw2?.heading
                      ? homepage?.hiw2?.heading
                      : "Column Header Green")}
                </h5>
                <p className="hiw-text-para">
                  {homeLoggedOut &&
                    (homepage?.hiw2?.text
                      ? homepage?.hiw2?.text
                      : `Column Body Copy - same as default body copy style. Lorem
                  ipsum dolor sit amet`)}
                </p>
              </div>
            </div>
            <div className="col-md-1 col-sm-2 col-3 hiw-small-col">
              <div className="hiw-small-col-img">
                <img src={plusSign} />
              </div>
            </div>
            <div className="col-md-2 col-sm-4 col-4 hiw-big-col">
              <div className="hiw-img-container">
                <img
                  src={
                    homeLoggedOut &&
                    (homepage?.hiw3?.image
                      ? homepage?.hiw3?.image
                      : howItWorks3)
                  }
                  className="hiw-img"
                />
              </div>
              <div className="hiw-text-container">
                <h5 className="hiw-text-heading">
                  {homeLoggedOut &&
                    (homepage?.hiw3?.heading
                      ? homepage?.hiw3?.heading
                      : "Column Header Green")}
                </h5>
                <p className="hiw-text-para">
                  {homeLoggedOut &&
                    (homepage?.hiw3?.text
                      ? homepage?.hiw3?.text
                      : `Column Body Copy - same as default body copy style. Lorem
                  ipsum dolor sit amet`)}
                </p>
              </div>
            </div>
            <div className="col-md-1 col-sm-2 col-3 hiw-small-col">
              <img src={equalsSign} />
            </div>
            <div className="col-md-2 col-sm-4 col-4 hiw-big-col">
              <div className="hiw-img-container">
                <img
                  src={
                    homeLoggedOut &&
                    (homepage?.hiw4?.image
                      ? homepage?.hiw4?.image
                      : howItWorks4)
                  }
                  className="hiw-img"
                />
              </div>
              <div className="hiw-text-container">
                <h5 className="hiw-text-heading">
                  {homeLoggedOut &&
                    (homepage?.hiw4?.heading
                      ? homepage?.hiw4?.heading
                      : "Column Header Green")}
                </h5>
                <p className="hiw-text-para">
                  {homeLoggedOut &&
                    (homepage?.hiw4?.text
                      ? homepage?.hiw4?.text
                      : `Column Body Copy - same as default body copy style. Lorem
                  ipsum dolor sit amet`)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="hiw-container mt-2"> */}

        {/* <div className="hiw-col-1"> */}
        {/* <img src={howItWorks1} /> */}
        {/* <div className="hiw-text-container"> */}
        {/* <h5 className="hiw-text-heading">Column Header Green</h5> */}
        {/* <p className="hiw-text-para"> */}
        {/* Column Body Copy - same as default body copy style. Lorem
                    ipsum dolor sit amet */}
        {/* </p> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* <div className="col-md-1 hiw-col-2"> */}
        {/* <img src={plusSign} /> */}
        {/* </div> */}
        {/* <div className="col-md-2 hiw-col-1"> */}
        {/* <img src={howItWorks2} /> */}
        {/* <div className="hiw-text-container"> */}
        {/* <h5 className="hiw-text-heading">Column Header Green</h5> */}
        {/* <p className="hiw-text-para"> */}
        {/* Column Body Copy - same as default body copy style. Lorem
                  ipsum dolor sit amet */}
        {/* </p> */}
        {/* </div> */}
        {/* </div> */}
        {/* <div className="col-md-1 hiw-col-2 ">
              <img src={plusSign} />
            </div> */}
        {/* <div className="col-md-2 hiw-col-1"> */}
        {/* <img src={howItWorks3} /> */}
        {/* <div className="hiw-text-container"> */}
        {/* <h5 className="hiw-text-heading">Column Header Green</h5> */}
        {/* <p className="hiw-text-para"> */}
        {/* Column Body Copy - same as default body copy style. Lorem
                  ipsum dolor sit amet */}
        {/* </p> */}
        {/* </div> */}
        {/* </div> */}
        {/* <div className="col-md-1 hiw-col-2 "> */}
        {/* <img src={equalsSign} /> */}
        {/* </div> */}
        {/* <div className="col-md-2 hiw-col-1"> */}
        {/* <img src={howItWorks4} /> */}
        {/* <div className="hiw-text-container"> */}
        {/* <h5 className="hiw-text-heading">Column Header Green</h5> */}
        {/* <p className="hiw-text-para"> */}
        {/* Column Body Copy - same as default body copy style. Lorem
                  ipsum dolor sit amet */}
        {/* </p> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
      </ContainerSection>
    </section>
  );
};

export default HowItWorks;
