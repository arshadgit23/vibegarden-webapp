import React from "react";
import { Container } from "react-bootstrap";
import ButtonFilled from "../Button/ButtonFilled";
import VideoCard from "../VideoCard/VideoCard";

const TwoColumnSection = ({ positionRight }) => {
  return (
    <section>
      <Container fluid>
        <div className="row mx-auto align-items-center roo py-5 px-lg-5 px-md-3 center-position">
          <div className="col-md-7 c1">
            <div className="info-container ">
              <h2 className="gradient-section-heading ">
                Embodying Your Fullness
              </h2>
              <p className="gradient-section-text ">
                Body copy style for white text on dark or gradient backgrounds
                (Medium Weight) Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Mauris placerat euismod porttitor. Nam nec
                mauris non magna facilisis volutpat ac sit amet nulla. Nullam
                vestibulum velit vitae sem commodo tempor. Sed dapibus, est non
                pulvinar fringilla, lorem libero laoreet erat, ac tristique elit
                nisl eu metus. Sed fermentum erat sit amet enim blandit, quis
                dictum nisi tempus. Etiam dui tellus, porttitor vitae rutrum a,
                ultrices pharetra nulla.
              </p>
              <div className="">
                <ButtonFilled
                  text="Explorer Tools"
                  // bgGradient={button === "filled" && "yes"}
                />
              </div>
            </div>
          </div>
          <div className={`col-md-4 c2 position-right `}>
            <VideoCard />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TwoColumnSection;
