import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar";
import Hero from "../../components/Hero";
import GradientImageInfoSection from "../../components/GradientImageInfoSection";
import FourColumnVideoLayout from "../../components/FourColumnVideoLayout.js";
import BrowseByTags from "../../components/BrowseByTags";
import Footer from "../../components/Footer";
import { dummyVideodata } from "../../constants/dummyVideoData";
import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../../api/axios";
import { setToolCategories } from "../../redux/slices/toolCategories";
import { setLoading } from "../../redux/slices/loadingSlice";
import AlertModal from "../../components/Modal/AlertModal";
import images from "../../constants/images";
import categoriesList from "./categories";
import { AiOutlineSearch } from "react-icons/ai";
import classes from "./style.module.css";

const Tools = () => {
  const array8 = dummyVideodata.slice(0, 8);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const categories = useSelector((state) => state.toolCategories.categories);
  const dispatch = useDispatch();

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
      const { data } = await apiRequest.get("/videos/by-type?videoType=tool");
      dispatch(setToolCategories(data?.data));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      setError(err.message);
    }
  };
  useEffect(() => {
    setCategories();
  }, []);

  console.log(categories);
  // bg-gradient-pinkMask
  return (
    <div className="tools">
      <AlertModal state={error} message={error} setState={setError} />;
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
          heading="What Tools?"
          noButton
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
      {searchResult.map((cat, index) => {
        index++;
        const makeClassIndex = categories.findIndex((data, i) => {
          i++;
          return i % 2 === 0;
        });
        return (
          <div
            className={`${index !== makeClassIndex && "bg-gradient-pinkMask"}`}
          >
            <FourColumnVideoLayout
              // searchInput={index === 1 ? true : false}
              leftHeading={index === 1 ? true : false}
              leftPara={index === 1 ? true : false}
              dataArray={cat?.videos.slice(0, 8)}
              heading={cat?.categoryName}
              desc={cat?.description}
              linkDestination={`/toolscategory/${cat?.categoryName}`}
              tools
              // searchState={(searchVal) => setSearch(searchVal)}
            />
          </div>
        );
      })}
      <BrowseByTags />
      <Footer />
    </div>
  );
};

export default Tools;
