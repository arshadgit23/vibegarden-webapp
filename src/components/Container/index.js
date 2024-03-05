import React from "react";
import { Container } from "react-bootstrap";
import rectangle from "../../assets/images/rectangle.svg";

const gradientBackground = {
  backgroundImage: `url(${rectangle})`,
  backgroundSize: "cover",
  backgroundRepear: "no-repeat",
};

const ContainerSection = ({ isFluid, bgGradient, children, borderRadius }) => {
  return isFluid === "yes" ? (
    <Container
      fluid
      style={bgGradient === "yes" ? gradientBackground : null}
      className="container-section"
    >
      {children}
    </Container>
  ) : (
    <Container
      style={bgGradient === "yes" ? gradientBackground : null}
      className={borderRadius && "border-radius"}
    >
      {children}
    </Container>
  );
};

export default ContainerSection;
