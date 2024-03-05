// Library Imports
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Custom Imports
import { apiRequest } from "../../api/axios";
import NavBar from "../../components/Navbar";
import Hero from "../../components/Hero";
import GradientImageInfoSection from "../../components/GradientImageInfoSection";
import WhiteImageInfoSection from "../../components/WhiteImageInfoSection.js";
import HowItWorks from "../../components/howItWorks/HowItWorks";
import FourColumnInfoSection from "../../components/fourColumnInfoSection";
import LineBreak from "../../components/lineBreak";
import SampleTools from "../../components/SampleToolsSection";
import MoreVG from "../../components/MoreVGSection.js";
import StayInTouch from "../../components/StayInTouchSection";
import Footer from "../../components/Footer";
import AlertModal from "../../components/Modal/AlertModal";
// Redux Slices
import {
  setHero,
  setEmbodyingYourFullness,
  setComingHomeTogether,
  setHiw1,
  setHiw2,
  setHiw3,
  setHiw4,
  setHeadline1,
  setHeadline2,
  setHeadline3,
  setHeadline4,
  setSampleToolsHeading,
  setSampleTools1,
  setSampleTools2,
  setMoreVGHeading,
  setCreationStory,
  setTeacher,
  setVibeBloomApp,
} from "../../redux/slices/homePageSlice";
import { setLoading } from "../../redux/slices/loadingSlice";
import images from "../../constants/images";

const HomePage = () => {
  // Hooks
  const dispatch = useDispatch();
  const homepage = useSelector((state) => state.homepage);
  console.log(homepage);
  // States
  const [error, setError] = useState(false);
  // OnClick Handlers
  const getHomePageData = async () => {
    try {
      console.log("getting homepage data");
      dispatch(setLoading(true));
      const { data } = await apiRequest.get("/homepage");
      console.log("homepage", data.data, homepage);
      dispatch(setHero(data.data));
      dispatch(setEmbodyingYourFullness(data.data));
      dispatch(setComingHomeTogether(data.data));
      dispatch(setHiw1(data.data));
      dispatch(setHiw2(data.data));
      dispatch(setHiw3(data.data));
      dispatch(setHiw4(data.data));
      dispatch(setHeadline1(data.data));
      dispatch(setHeadline2(data.data));
      dispatch(setHeadline3(data.data));
      dispatch(setHeadline4(data.data));
      dispatch(setSampleToolsHeading(data.data));
      dispatch(setSampleTools1(data.data));
      dispatch(setSampleTools2(data.data));
      dispatch(setMoreVGHeading(data.data));
      dispatch(setCreationStory(data.data));
      dispatch(setVibeBloomApp(data.data));
      dispatch(setTeacher(data.data));
      dispatch(setLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  };
  // UseEffect
  useEffect(() => {
    getHomePageData();
  }, []);

  const text =
    "Body copy style for white text on dark or gradient backgrounds (Medium Weight) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat euismod porttitor. Nam nec mauris non magna facilisis volutpat ac sit amet nulla. Nullam vestibulum velit vitae sem commodo tempor. Sed dapibus, est non pulvinar fringilla, lorem libero laoreet erat, ac tristique elit nisl eu metus. Sed fermentum erat sit amet enim blandit, quis dictum nisi tempus.";

  return (
    <div className="remove-overflow">
      <NavBar />
      <AlertModal state={error} message={error} setState={setError} />
      <div
        className="bg-gradient-blueflowers"
        style={{
          // backgroundColor: "blue",
          backgroundImage: `url(${homepage?.headerImage})` || "blue",
        }}
      >
        <Hero
          author="– Thich Nhat Hahn"
          quote={homepage?.mainQuotation}
          backgroundImage={images.hero}
        />
      </div>
      <div className="bg-gradient-pink">
        <GradientImageInfoSection
          desc={homepage?.embodyingYourFullness?.text || text}
          videoCardLeftMargin={"30px"}
          heading={
            homepage?.embodyingYourFullness?.heading ||
            "Embodying Your Fullness"
          }
          buttonText={
            homepage?.embodyingYourFullness?.buttonText || "Explorer Tools"
          }
          videoLink={homepage?.embodyingYourFullness?.video}
          videoImage={
            homepage?.embodyingYourFullness?.thumbnail || images.placeholder2
          }
          videoDuration={
            homepage?.embodyingYourFullness?.videoDuration || "3:15"
          }
          title="Title"
          btnLink="/tools"
        />
      </div>
      <WhiteImageInfoSection
        mainHeading={
          homepage?.comingHomeTogether?.heading || "Coming Home Together"
        }
        desc={
          homepage?.comingHomeTogether?.text || "coming home toghether text"
        }
        videoLink={homepage?.comingHomeTogether?.video}
        videoImage={
          homepage?.comingHomeTogether?.thumbnail || images.placeholder1
        }
        videoDuration={homepage?.comingHomeTogether?.videoDuration || "3:15"}
        title="title"
        btnText={homepage?.comingHomeTogether?.buttonText || "Join Us"}
        link="/join-us"
      />
      <HowItWorks homeLoggedOut />
      <FourColumnInfoSection homeLoggedOut />
      <LineBreak />
      <SampleTools />
      <MoreVG />
      <div className="bg-gradient-pinkMask">
        <StayInTouch />'
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
