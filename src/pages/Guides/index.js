import React from "react";
import NavBar from "../../components/Navbar";
import Hero from "../../components/Hero";
import GradientImageInfoSection from "../../components/GradientImageInfoSection";
import FourColumnVideoLayout from "../../components/FourColumnVideoLayout.js";
import BrowseByTags from "../../components/BrowseByTags";
import Footer from "../../components/Footer";
import ScheduleSection from "../../components/ScheduleSection";
import GreenLineBreak from "../../components/GreenLineBreak";
import WhiteImageInfoSection from "../../components/WhiteImageInfoSection.js";
import WhiteImageInfoSection2 from "../../components/WhiteImageInfoSection2";
import ButtonAndHeading from "../../components/HeadingAndButton.js";
import { useNavigate } from "react-router-dom";
import images from "../../constants/images";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loadingSlice";
import { apiRequest } from "../../api/axios";

const Guides = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");

  console.log(teachers);
  const getTeachers = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiRequest.get("/users?role=teacher");

      setTeachers(data?.data);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      setError(err.message);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);
  return (
    <div className="guides">
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
      <div className="bg-gradient-pink">
        <GradientImageInfoSection
          videoCardLeftMargin={"30px"}
          noButton
          heading="Vibe Guides"
          videoImage={images.placeholder6}
          videoDuration={"3:15"}
        />
      </div>
      <ScheduleSection />
      <GreenLineBreak />
      <WhiteImageInfoSection
        orderReverseWithButton
        mainHeading="Teachers"
        btnText="See All Teachers"
        padX={false}
        link="/teachers"
        blackHeading
        videoDuration="3:15"
        videoImage={images.placeholder6}
        videoTitle="Title"
      />
      <GreenLineBreak />
      <ButtonAndHeading />
      <Footer />
    </div>
  );
};

export default Guides;
