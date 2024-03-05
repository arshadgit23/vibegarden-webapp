import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import Hero from "../../components/Hero";
import GradientImageInfoSection from "../../components/GradientImageInfoSection";
import FourColumnVideoLayout from "../../components/FourColumnVideoLayout.js";
import BrowseByTags from "../../components/BrowseByTags";
import Footer from "../../components/Footer";
import { dummyVideodata } from "../../constants/dummyVideoData";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../../api/axios";
import { setGWCategories } from "../../redux/slices/groundWorkCategories";
import { setLoading } from "../../redux/slices/loadingSlice";
import AlertModal from "../../components/Modal/AlertModal";
import HeroImage from "../../assets/images/hero@2x.png";
import images from "../../constants/images";
import categoriesList from "./categories";
import classes from "./style.module.css";
import { AiOutlineSearch } from "react-icons/ai";

const GroundWork = () => {
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const array4 = dummyVideodata.slice(0, 4);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.groundWorkCategories.categories
  );

  const searchResult = categories?.filter((category) => {
    let filteredCategory;
    if (search === "") {
      filteredCategory = category;
    } else if (
      category?.categoryName?.toLowerCase()?.includes(search?.toLowerCase())
    ) {
      filteredCategory = category;
    }
    return filteredCategory;
  });

  const setCategories = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiRequest.get(
        "/videos/by-type?videoType=groundwork"
      );
      console.log("data", data);
      dispatch(setGWCategories(data.data));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      setError(err.message);
    }
  };
  useEffect(() => {
    setCategories();
  }, []);
  //bg-gradient-greenMask
  return (
    <div className="groundwork">
      <NavBar />
      <AlertModal state={error} message={error} setState={setError} />
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
          heading="Why Ground Work?"
          videoImage={images.placeholder6}
          videoDuration={"3:15"}
        />
      </div>
      <div className={classes.search}>
        <div className={`fcvl-search-input ${classes.searchBar}`}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            id="search"
            placeholder="Search..."
          />
          <AiOutlineSearch />
        </div>
      </div>

      {searchResult?.map((cat, index) => {
        index++;
        const makeClassIndex = categories.findIndex((data, i) => {
          i++;
          return i % 2 === 0;
        });

        return (
          <div
            key={index}
            className={`${index !== makeClassIndex && "bg-gradient-greenMask"}`}
          >
            <FourColumnVideoLayout
              heading={cat?.categoryName}
              desc={cat?.description}
              dataArray={cat?.videos?.slice(0, 4)}
              linkDestination={`/groundworkcategory/${cat?.categoryName}`}
              // searchState={(searchVal) => setSearch(searchVal)}
              // searchInput={index === 1 ? true : false}
              whiteHeading={index !== makeClassIndex ? true : false}
              whitePara={index !== makeClassIndex ? true : false}
              whiteLink={index !== makeClassIndex ? true : false}
              whiteSubText={index !== makeClassIndex ? true : false}
              groundWork
            />
          </div>
        );
      })}
      <BrowseByTags />
      <Footer />
    </div>
  );
};

export default GroundWork;
