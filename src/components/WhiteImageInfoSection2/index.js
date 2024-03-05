import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ContainerSection from "../Container";
import ButtonFilled from "../Button/ButtonFilled";
import images from "../../constants/images";
import VideoCard from "../VideoCard/VideoCard";
import ColoredLink from "../ColouredLink";
import LightButton from "../Button/LightButton";
import VidCard from "../VidCard";

const WhiteImageInfoSection2 = ({
  button,
  videoCardLeftMargin,
  videoCardRightMargin,
  videoWidth = "450px",
  videoHeight = "256px",
  freshBlooms,
  groundWork,
  tool,
}) => {
  return (
    <section className="wiis2">
      <ContainerSection isFluid={"yes"}>
        <div className="container-lg wiis2-container py80">
          <div className="row wiis2-row">
            <div className="col-md-7 wiis2-col wiis2-left-col order-md-2">
              <h3 className="wiis2-heading ">H3 Headline Style Green</h3>
              <p className=" wiis2-para mt-2 mb-5">
                Body copy style for white text on dark or gradient backgrounds
                (Medium Weight) Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Mauris placerat euismod porttitor. Nam nec
                mauris non magna facilisis volutpat ac sit amet nulla. Nullam
                vestibulum velit vitae sem commodo tempor. Sed dapibus, est non
                pulvinar fringilla, lorem libero laoreet erat, ac tristique elit
                nisl eu metus. Sed fermentum erat sit amet enim blandit, quis
                dictum nisi tempus.
              </p>
              <Link to="/freshblooms">
                <div className="wiis2-link">
                  <ColoredLink text="See Fresh Blooms Archive" />
                </div>
              </Link>
            </div>
            <div className="col-md-5 wiis2-col wiis2-right-col">
              <div className="wiis2-right-col-heading">
                <h2>H2</h2>
              </div>

              <div className="wiis2-vid-card">
                <VidCard
                  time="3:15"
                  image={images.placeholder2}
                  title="Title"
                  freshBlooms={freshBlooms ? true : false}
                  showDetailButton={false}
                />
              </div>
              <div className="wiis2-right-col-btn-container ">
                <div className="wiis2-right-col-btn ">
                  <Link to="/groundwork/family-of-light" state={{ tool: true }}>
                    <LightButton text="Details" />
                  </Link>
                </div>
                <div className="wiis2-right-col-btn">
                  <Link to="/topic">
                    <LightButton text="#Tag" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerSection>
    </section>
  );
};

export default WhiteImageInfoSection2;
