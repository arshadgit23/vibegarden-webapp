// Library Imports
import React from "react";
import { useSelector } from "react-redux";
// Custom Imports
import ContainerSection from "../Container";
import { fcisdData } from "../../constants/dummyFCISData";

const FourColumnInfoSection = ({ homeLoggedOut }) => {
  // Redux State Read
  const homepage = useSelector((state) => state.homepage);
  const headlines = [
    homepage.headline1,
    homepage.headline2,
    homepage.headline3,
    homepage.headline4,
  ];
  const headlines1 = [
    {
      heading: "H3 Headline Style Green",
      text: "Default body copy style for text on white / light color backgrounds (Regular weight). Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat euismod porttitor. Nam nec mauris non magna facilisis volutpat ac sit amet nulla. Nullam vestibulum velit vitae sem commodo tempor. Sed dapibus, est non pulvinar fringilla, lorem libero laoreet erat, ac tristique elit nisl eu metus. • Sed fermentum erat sit amet enim blandit, quis dictum nisi tempus. Etiam dui tellus, porttitor vitae rutrum a, ultrices pharetra nulla.",
    },
    {
      heading: "H3 Headline Style Green",
      text: "Default body copy style for text on white / light color backgrounds (Regular weight). Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat euismod porttitor. Nam nec mauris non magna facilisis volutpat ac sit amet nulla. Nullam vestibulum velit vitae sem commodo tempor. Sed dapibus, est non pulvinar fringilla, lorem libero laoreet erat, ac tristique elit nisl eu metus. • Sed fermentum erat sit amet enim blandit, quis dictum nisi tempus. Etiam dui tellus, porttitor vitae rutrum a, ultrices pharetra nulla.",
    },
    {
      heading: "H3 Headline Style Green",
      text: "Default body copy style for text on white / light color backgrounds (Regular weight). Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat euismod porttitor. Nam nec mauris non magna facilisis volutpat ac sit amet nulla. Nullam vestibulum velit vitae sem commodo tempor. Sed dapibus, est non pulvinar fringilla, lorem libero laoreet erat, ac tristique elit nisl eu metus. • Sed fermentum erat sit amet enim blandit, quis dictum nisi tempus. Etiam dui tellus, porttitor vitae rutrum a, ultrices pharetra nulla.",
    },
    {
      heading: "H3 Headline Style Green",
      text: "Default body copy style for text on white / light color backgrounds (Regular weight). Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat euismod porttitor. Nam nec mauris non magna facilisis volutpat ac sit amet nulla. Nullam vestibulum velit vitae sem commodo tempor. Sed dapibus, est non pulvinar fringilla, lorem libero laoreet erat, ac tristique elit nisl eu metus. • Sed fermentum erat sit amet enim blandit, quis dictum nisi tempus. Etiam dui tellus, porttitor vitae rutrum a, ultrices pharetra nulla.",
    },
  ];

  const headlinesArray = headlines1;
  return (
    <section className="fcis my-md-5">
      <ContainerSection isFluid={"yes"}>
        <div className="fcis-container container">
          <div className="row fcis-row">
            {homeLoggedOut &&
              headlinesArray.map((item, index) => {
                return (
                  <div className="col-md-6 fcis-item" key={`${index}`}>
                    <h3 className="fcis-item--heading">{item.heading}</h3>
                    <p className="fcis-item-para">{item.text}</p>
                  </div>
                );
              })}
            {!homeLoggedOut &&
              fcisdData.map((item, index) => {
                return (
                  <div className="col-md-6 fcis-item" key={`${index}`}>
                    <h3 className="fcis-item--heading">{item.heading}</h3>
                    <ul className="fcis-item--list">
                      {item.infoPoints.map((infoPoint) => {
                        return (
                          <li className="fcis-item--list-item">
                            {infoPoint.point}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>
        </div>
      </ContainerSection>
    </section>
  );
};

export default FourColumnInfoSection;
