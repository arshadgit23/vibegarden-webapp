// Library Imports
import React from "react";
import { Link } from "react-router-dom";
// Custom Imports
import NavBar from "../../components/Navbar";
import Hero from "../../components/Hero";
import WhiteImageInfoSection2 from "../../components/WhiteImageInfoSection2";
import FeaturedTools from "../../components/FeaturedTools/FeaturedTools";
import GroundWorkEssentials from "../../components/GroundWorkEssentials";
import LineBreak from "../../components/lineBreak";
import HowItWorks from "../../components/howItWorks/HowItWorks";
import BrowseByTags from "../../components/BrowseByTags";
import WhiteImageInfoSection from "../../components/WhiteImageInfoSection.js";
import BigImageSection from "../../components/BigImageSection";
import Footer from "../../components/Footer";
import ButtonFilled from "../../components/Button/ButtonFilled";
import { useSelector } from "react-redux";

const HomeLoggedIn = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="remove-overflow">
      <NavBar />
      <div className="bg-gradient-blueflowers">
        <Hero
          quote1stPart={`"You can put all the flowers`}
          quote2ndPart={`but you can't stop the spring"`}
          author="P.Neauda"
          heading={`Welcome, ${user.firstName}`}
        />
      </div>
      <WhiteImageInfoSection2 freshBlooms />
      <div className="resonance-line bg-gradient-pinkMask">
        <p>
          Check your resonance; from Buddhism to Quantum Physics, see which
          Topics you’ll vibe with most!
        </p>
        <Link to="/resonancefinder">
          <ButtonFilled
            paddingXSmall
            text="Try Resonance Finder"
            bgGradient="yes"
          />
        </Link>
      </div>
      <div className="bg-gradient-green homeloggedin-ft">
        <FeaturedTools
          whiteHeading
          whitePara
          recentVibes
          idgwHeading="Tools Tag Video"
          tool
        />
      </div>
      <GroundWorkEssentials />
      <LineBreak />
      <FeaturedTools
        leftHeading
        heading="Your Recent Vibes"
        noPara
        recentVibes
        idgwHeading="Recent Vibes Video"
        toolDummy
      />
      <HowItWorks />
      <BrowseByTags />
      <div className="bg-gradient-pinkMask ">
        <WhiteImageInfoSection
          noHeading
          topHeading
          videoCardWidth="350px"
          height="270px"
          btnText="See More"
          homeLogged
          link="/guides"
        />
      </div>
      <div className="remove-overflow">
        <div className="bg-gradient-greenMask">
          <WhiteImageInfoSection
            noHeading
            topHeading
            videoCardWidth="350px"
            height="270px"
            orderReverse
            rightAlignBtn
            rightAlignHeading
            whiteHeading
            whitePara
            btnText="See More"
            link="/guides"
          />
        </div>
      </div>
      <div className="my70">
        <LineBreak />
      </div>
      <BigImageSection />
      <Footer />
    </div>
  );
};

export default HomeLoggedIn;
