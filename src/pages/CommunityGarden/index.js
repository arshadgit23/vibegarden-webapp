import React from "react";
import NavBar from "../../components/Navbar";
import Hero from "../../components/Hero";
import GradientImageInfoSection from "../../components/GradientImageInfoSection";
import FourColumnVideoLayout from "../../components/FourColumnVideoLayout.js";
import BrowseByTags from "../../components/BrowseByTags";
import Footer from "../../components/Footer";
import GreenLineBreak from "../../components/GreenLineBreak";
import WhiteImageInfoSection from "../../components/WhiteImageInfoSection.js";
import ButtonAndHeading2 from "../../components/HeadingAndButton2";
import { dummyVideodata } from "../../constants/dummyVideoData";
import images from "../../constants/images";
import videos from "./categories";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loadingSlice";
import { apiRequest } from "../../api/axios";
import classes from "./style.module.css";

const CommunityGarden = () => {
  const array4 = dummyVideodata.slice(0, 4);
  const dispatch = useDispatch();
  const [featuredTools, setFeaturedTools] = useState([]);
  const [error, setError] = useState("");

  // videos/featured?videoType=tool

  console.log(featuredTools);
  const getFeaturedTools = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiRequest.get("/videos/featured?videoType=tool");

      setFeaturedTools(data?.data);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      setError(err.message);
    }
  };
  useEffect(() => {
    getFeaturedTools();
  }, []);

  return (
    <div className="community-garden">
      <NavBar />
      <div className="bg-lightFlower ">
        <Hero
          quote2ndPart="lorem ipsum lorem ipsum.”"
          quote1stPart="“Lorem ipsum lorem ipsum lorem;"
          greenColor
          author="– Lorem Ipsum Dolar"
          heading="Lorem Ipsum"
          topPadding
        />
      </div>
      <div className="bg-gradient-green">
        <GradientImageInfoSection
          videoCardLeftMargin={"30px"}
          noButton
          heading="Coming Home Together A Beginning"
          videoImage={images.placeholder6}
          videoDuration={"3:15"}
        />
      </div>
      <div className={classes.faturedToolsConnection}>
        <FourColumnVideoLayout
          disableLink={true}
          heading="Featured Tool For Connection"
          tools
          desc={`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
        erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
        et ea rebum. Stet clita kas`}
          dataArray={featuredTools}
        />
      </div>

      <GreenLineBreak />
      <WhiteImageInfoSection
        noButton
        noHeading
        doubleHeading
        videoCardTopHeading
        bottomInfo
        vidHeading
        btnText="Take A Survey"
        videoImage={images.placeholder6}
        videoDuration="3:15"
        videoTitle="Title"
      />
      <GreenLineBreak />
      <ButtonAndHeading2 />
      <Footer />
    </div>
  );
};

export default CommunityGarden;
