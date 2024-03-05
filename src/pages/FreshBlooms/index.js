import React from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";
import WhiteImageInfoSection from "../../components/WhiteImageInfoSection.js";

const FreshBlooms = () => {
  return (
    <div className="fresh-blooms">
      <NavBar />
      <div className="au-top-section">
        <h2 className="au-heading">FRESH BLOOMS</h2>
        <p className="au-para">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum.
        </p>
      </div>
      <div className="au-wiis">
        <WhiteImageInfoSection
          noButton
          lightButton
          postedDate
          mainHeading="H3 Headline Style Green"
          freshBlooms
        />
      </div>
      <div className="au-wiis-reverse fb-reverse">
        <WhiteImageInfoSection
          orderReverseWithButton
          noButton
          lightButton
          postedDate
          mainHeading="H3 Headline Style Green"
          freshBlooms
        />
      </div>
      <div className="au-wiis">
        <WhiteImageInfoSection
          noButton
          lightButton
          postedDate
          mainHeading="H3 Headline Style Green"
          freshBlooms
        />
      </div>
      <div className="au-wiis-reverse fb-reverse">
        <WhiteImageInfoSection
          orderReverseWithButton
          noButton
          lightButton
          postedDate
          mainHeading="H3 Headline Style Green"
          freshBlooms
        />
      </div>
      <div className="au-wiis">
        <WhiteImageInfoSection
          noButton
          lightButton
          postedDate
          mainHeading="H3 Headline Style Green"
          freshBlooms
        />
      </div>
      <Footer />
    </div>
  );
};

export default FreshBlooms;
