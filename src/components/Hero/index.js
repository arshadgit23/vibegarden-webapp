// Library Imports
import React from "react";
import { Container } from "react-bootstrap";
import classes from "./style.module.css";

const Hero = ({
  quote = "",
  quote1stPart = "“There is a sun within every person;",
  quote2ndPart = "the you we call campanion.”",
  author = "– Thich Nhat Hahn",
  heading = "Hi, You",
  greenColor,
  shortPadding,
  reduceFont,
  topPadding,
  backgroundImage,
}) => {
  // Manipulate Quote Data
  const quoteExtract = quote
    .match(/[“|"](\\.|[^"\\])*[”|"]/g)
    ?.pop()
    ?.split("\n");
  const quoteExcept = quote
    .split(/[“|"](\\.|[^"\\])*[”|"]/g)
    .filter((el) => el !== "" && el !== "." && el !== " ")
    .join(" ")
    .split("\n")
    .filter((el) => el !== "" && el !== "." && el !== " ");
  const quoteAuthor = quoteExcept[0];
  const quoteHeading = quoteExcept[1];

  return (
    <Container
      fluid
      className={`hero text-center px-4 ${shortPadding && "short-padding"} ${
        topPadding && "top-padding"
      }`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {quote && quoteExtract ? (
        <div>
          {quoteExtract?.map((quote) => {
            return (
              <h2
                className={`hero-quote ${greenColor && "text-green"} ${
                  reduceFont && "hero-font-quote"
                }`}
              >
                {quote}
              </h2>
            );
          })}
        </div>
      ) : (
        <div>
          <h2
            className={`hero-quote ${greenColor && "text-green"} ${
              reduceFont && "hero-font-quote"
            }`}
          >
            {quote1stPart}
          </h2>
          <h2
            className={`hero-quote ${greenColor && "text-green"} ${
              reduceFont && "hero-font-quote"
            }`}
          >
            {quote2ndPart}
          </h2>
        </div>
      )}

      <p
        className={`hero-author ${greenColor && "text-green"} ${
          reduceFont && "hero-font-author"
        }`}
      >
        {quoteAuthor || author}
      </p>

      <h1
        className={`hero-heading ${greenColor && "text-green"} ${
          topPadding && "hero-heading-pad"
        } ${reduceFont && "hero-font-heading"}`}
      >
        {quoteHeading || heading}
      </h1>
    </Container>
  );
};

export default Hero;
