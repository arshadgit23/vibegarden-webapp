import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar";
import FormGroupAuth from "../../components/FormInputAuth";
import { dummyVideodata } from "../../constants/dummyVideoData";
import VidCard from "../../components/VidCard";
import PinkIcon from "../../assets/images/pink-icon.svg";
import images from "../../constants/images";
import GreenButton from "../../components/Button/GreenButton";
import Footer from "../../components/Footer";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { green } from "@mui/material/colors";
import { RiCloseFill } from "react-icons/ri";
import Toggle from "react-styled-toggle";
import { Link, useLocation } from "react-router-dom";
import ButtonFilled from "../../components/Button/ButtonFilled";

const SearchPage = () => {
  const location = useLocation();
  const actTab = location?.state?.searchState || "all";
  const actCat = location?.state?.searchCatState || ["null"];
  console.log("actTab", actCat, location?.state?.searchCatState);
  const [activeTab, setActiveTab] = useState(actTab);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const category = [
    "essentials",
    "building slocks",
    "deeper cuts",
    "play",
    "tools for light",
    "tools for connection",
    "tools for worker",
  ];
  const topics = [
    "topic 1",
    "topic 2",
    "topic 3",
    "topic 4",
    "topic 5",
    "topic 6",
    "topic 7",
    "topic 8",
    "topic 9",
    "topic 10",
    "topic 11",
    "topic 12",
    "topic 13",
    "topic 14",
    "topic 15",
  ];
  useEffect(() => {
    actCat.map((cat) => {
      if (category.includes(cat)) {
        setFiltered([...filtered, cat]);
      }
      if (topics.includes(cat)) {
        setFiltered([...filtered, cat]);
      }
    });
  }, []);
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    function updateSize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return (
    <>
      {showFilterModal && (
        <div className="search-filter-modal-overlay">
          <div className="search-filter-modal">
            <span
              className="sfm-close"
              onClick={() => setShowFilterModal(false)}
            >
              <RiCloseFill size={20} fill="white" />
            </span>
            <div className="sfm-resonance">
              <p>Select Topics Below Or Try Our </p>
              <Link to="/resonancefinder">
                <span>Resonance Finder</span>
              </Link>
            </div>
            <div className="sfm-main">
              <div className="sfm-topicItemContainer">
                {/* <h4 className={`sfm-topicheading `}>Category</h4>; */}
                <div className="sfm-topic">
                  {category.map((cat) => {
                    return (
                      <div className="sfm-topicItem ">
                        <Toggle
                          backgroundColorChecked="rgba(27, 91, 47, 1)"
                          backgroundColorUnchecked="#75997E"
                          sliderWidth={dimensions.width > 991 ? 20 : 12}
                          sliderHeight={dimensions.width > 991 ? 20 : 12}
                          width={dimensions.width > 991 ? 55 : 45}
                          height={dimensions.width > 991 ? 28 : 25}
                          checked={filtered.includes(cat) ? true : false}
                          // onChange={() => setFiltered([...filtered, cat])}
                          onChange={() => {
                            if (filtered.includes(cat)) {
                              setFiltered(
                                filtered.filter((item) => item !== cat)
                              );
                            } else {
                              setFiltered([...filtered, cat]);
                            }
                          }}
                        />
                        <label className="sfm-topicLabel">{cat}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
              {(activeTab === "tools" || activeTab === "groundwork") && (
                <div className="sfm-topicItemContainer">
                  {/* <h4 className="sfm-topicheading ">Topic</h4>; */}
                  <div className="sfm-topic">
                    {topics.map((topic) => {
                      return (
                        <div className="sfm-topicItem ">
                          <Toggle
                            backgroundColorChecked="rgba(27, 91, 47, 1)"
                            backgroundColorUnchecked="#75997E"
                            sliderWidth={dimensions.width > 991 ? 20 : 12}
                            sliderHeight={dimensions.width > 991 ? 20 : 12}
                            width={dimensions.width > 991 ? 55 : 45}
                            height={dimensions.width > 991 ? 28 : 25}
                            checked={filtered.includes(topic) ? true : false}
                            onChange={() => {
                              if (filtered.includes(topic)) {
                                setFiltered(
                                  filtered.filter((item) => item !== topic)
                                );
                              } else {
                                setFiltered([...filtered, topic]);
                              }
                            }}
                          />
                          <label className="sfm-topicLabel">{topic}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="sfm-btnContainer">
              <div
                className="sfm-btn"
                onClick={() => setShowFilterModal(false)}
              >
                <GreenButton text="Apply Filter" />
              </div>
              {/* <div
                className="sfm-btn"
                onClick={() => setShowFilterModal(false)}
              >
                <ButtonFilled bgGradient={"yes"} />
              </div> */}
            </div>
            {/* {(activeTab === "tools" || activeTab === "groundwork") && (
              <div className="rf-option">
                <Link to="/resonancefinder">
                  <p>
                    Not Sure ? <span>Try Resonance Finder</span>
                  </p>
                </Link>
              </div>
            )} */}
          </div>
        </div>
      )}
      <section className="searchpage">
        <NavBar />
        <div className="container-xl sp">
          <div className="sp-top">
            <div className="sp-top-headingAndCount">
              <h3 className="sp-top-heading">{activeTab} Results</h3>
              <p className="sp-top-count">37 Results</p>
            </div>

            <div className="sp-top-search">
              <FormGroupAuth noLabel placeHolder="Search..." icon />
            </div>
          </div>
          <div className="sp-tabs">
            <div
              className={`${activeTab === "all" && "active-tab"} sp-tab`}
              onClick={() => setActiveTab("all")}
            >
              <p>All</p>
            </div>
            <div
              className={`${activeTab === "groundwork" && "active-tab"} sp-tab`}
              onClick={() => setActiveTab("groundwork")}
            >
              <p>Groundwork</p>
            </div>
            <div
              className={`${activeTab === "tools" && "active-tab"} sp-tab`}
              onClick={() => setActiveTab("tools")}
            >
              <p>Tools</p>
            </div>
            <div
              className={`${
                activeTab === "fresh blooms" && "active-tab"
              } sp-tab`}
              onClick={() => setActiveTab("fresh blooms")}
            >
              <p>Fresh Blooms</p>
            </div>
            <div
              className={`${activeTab === "teachers" && "active-tab"} sp-tab`}
              onClick={() => setActiveTab("teachers")}
            >
              <p>Teachers</p>
            </div>
          </div>
          <div className="row sp-row">
            <div className="col-lg-7 sp-left-col">
              <div
                className={`sp-resultAndFilter 
                my-4
                ${
                  (activeTab === "groundwork" || activeTab === "tools") &&
                  "my-5"
                }
                `}
              >
                {/* <h4 className="sp-result"> */}
                {/* Showing results for {filtered} topics */}
                {/* </h4> */}
                {activeTab !== "teachers" &&
                  activeTab !== "fresh blooms" &&
                  activeTab !== "all" && (
                    <div className="filter-tabs">
                      {filtered.map((item) => {
                        return (
                          <span className="sp-filter-tab">
                            {item}
                            <span
                              className="spft-close"
                              onClick={() =>
                                setFiltered(
                                  filtered.filter((it) => it !== item)
                                )
                              }
                            >
                              <RiCloseFill size={15} />
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  )}
                {activeTab !== "teachers" &&
                  activeTab !== "fresh blooms" &&
                  activeTab !== "all" && (
                    <div
                      className="sp-filter"
                      onClick={() => setShowFilterModal(true)}
                    >
                      <FilterAltIcon
                        fontSize="large"
                        sx={{ color: green[700] }}
                      />
                    </div>
                  )}
              </div>
              {(activeTab === "all" || activeTab === "groundwork") && (
                <div className="sp-type">
                  {/* {activeTab !== "all" && (
                    // <div className="search-type-heading-container">
                    //   <h4 className="search-type-heading">Ground Work</h4>
                    //   <Link to="/groundwork">
                    //     <p>See All</p>
                    //   </Link>
                    // </div>
                  )} */}
                  <div className="sp-item">
                    <div className="sp-item-video">
                      <VidCard
                        groundwork
                        recentVibes
                        linkVideo="/groundwork/family-of-light"
                      />
                    </div>
                    <div className="sp-item-info">
                      <div className="sp-item-info-textAndIcon">
                        <div className="sp-item-info-icon">
                          <img src={PinkIcon} alt="" />
                        </div>
                        <h3>Title</h3>
                      </div>
                      <p className="sp-item-info-desc">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                      </p>
                      <div className="sp-item-info-subtext">
                        <Link
                          to="/groundwork/family-of-light"
                          state={{ heading: "GroundWork Video" }}
                        >
                          <p>Details</p>
                        </Link>
                        <Link to="/topic">
                          <p>#Tag</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="sp-item">
                    <div className="sp-item-video">
                      <VidCard
                        groundwork
                        recentVibes
                        linkVideo="/groundwork/family-of-light"
                      />
                    </div>
                    <div className="sp-item-info">
                      <div className="sp-item-info-textAndIcon">
                        <div className="sp-item-info-icon">
                          <img src={PinkIcon} alt="" />
                        </div>
                        <h3>Title</h3>
                      </div>
                      <p className="sp-item-info-desc">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                      </p>
                      <div className="sp-item-info-subtext">
                        <Link
                          to="/groundwork/family-of-light"
                          state={{ heading: "GroundWork Video" }}
                        >
                          <p>Details</p>
                        </Link>
                        <Link to="/topic">
                          <p>#Tag</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="sp-item">
                    <div className="sp-item-video">
                      <VidCard
                        groundwork
                        recentVibes
                        linkVideo="/groundwork/family-of-light"
                      />
                      ]{" "}
                    </div>
                    <div className="sp-item-info">
                      <div className="sp-item-info-textAndIcon">
                        <div className="sp-item-info-icon">
                          <img src={PinkIcon} alt="" />
                        </div>
                        <h3>Title</h3>
                      </div>
                      <p className="sp-item-info-desc">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                      </p>
                      <div className="sp-item-info-subtext">
                        <Link
                          to="/groundwork/family-of-light"
                          state={{ heading: "GroundWork Video" }}
                        >
                          <p>Details</p>
                        </Link>
                        <Link to="/topic">
                          <p>#Tag</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {(activeTab === "all" || activeTab === "tools") && (
                <div className="sp-type">
                  {/* {activeTab !== "all" && (
                    // <div className="search-type-heading-container">
                    //   <h4 className="search-type-heading">Tools</h4>
                    //   <Link to="/tools">
                    //     <p>See All</p>
                    //   </Link>
                    // </div>
                  )} */}
                  <div className="sp-item">
                    <div className="sp-item-video">
                      <VidCard tool recentVibes linkVideo="/tools/tonglen" />
                    </div>
                    <div className="sp-item-info">
                      <div className="sp-item-info-textAndIcon">
                        <div className="sp-item-info-icon">
                          <img src={PinkIcon} alt="" />
                        </div>
                        <h3>Title</h3>
                      </div>
                      <p className="sp-item-info-desc">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                      </p>
                      <div className="sp-item-info-subtext">
                        <Link
                          to="/groundwork/family-of-light"
                          state={{ heading: "Tools Video" }}
                        >
                          <p>Details</p>
                        </Link>
                        <Link to="/topic">
                          <p>#Tag</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="sp-item">
                    <div className="sp-item-video">
                      <Link to="/tools/tonglen">
                        <VidCard tool recentVibes linkVideo="/tools/tonglen" />
                      </Link>
                    </div>
                    <div className="sp-item-info">
                      <div className="sp-item-info-textAndIcon">
                        <div className="sp-item-info-icon">
                          <img src={PinkIcon} alt="" />
                        </div>
                        <h3>Title</h3>
                      </div>
                      <p className="sp-item-info-desc">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                      </p>
                      <div className="sp-item-info-subtext">
                        <Link
                          to="/groundwork/family-of-light"
                          state={{ heading: "Tools Video" }}
                        >
                          <p>Details</p>
                        </Link>
                        <Link to="/topic">
                          <p>#Tag</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="sp-item">
                    <div className="sp-item-video">
                      <Link to="/tools/tonglen">
                        <VidCard tool recentVibes linkVideo="/tools/tonglen" />
                      </Link>
                    </div>
                    <div className="sp-item-info">
                      <div className="sp-item-info-textAndIcon">
                        <div className="sp-item-info-icon">
                          <img src={PinkIcon} alt="" />
                        </div>
                        <h3>Title</h3>
                      </div>
                      <p className="sp-item-info-desc">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                      </p>
                      <div className="sp-item-info-subtext">
                        <Link
                          to="/groundwork/family-of-light"
                          state={{ heading: "Tools Video" }}
                        >
                          <p>Details</p>
                        </Link>
                        <Link to="/topic">
                          <p>#Tag</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "fresh blooms" && (
                <div className="sp-type">
                  {/* {activeTab !== "all" && (
                    <div className="search-type-heading-container">
                      <h4 className="search-type-heading">Fresh Blooms</h4>
                      <Link to="/freshblooms">
                        <p>See All</p>
                      </Link>
                    </div>
                  )} */}
                  <div className="sp-item">
                    <div className="sp-item-video">
                      <VidCard groundwork />
                    </div>
                    <div className="sp-item-info">
                      <div className="sp-item-info-textAndIcon">
                        <div className="sp-item-info-icon">
                          <img src={PinkIcon} alt="" />
                        </div>
                        <h3>Title</h3>
                      </div>
                      <p className="sp-item-info-desc">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                      </p>
                      <div className="sp-item-info-subtext">
                        <Link
                          to="/groundwork/family-of-light"
                          state={{ heading: "Fresh Blooms Video" }}
                        >
                          <p>Details</p>
                        </Link>
                        <Link to="/topic">
                          <p>#Tag</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="sp-item">
                    <div className="sp-item-video">
                      <VidCard groundwork />
                    </div>
                    <div className="sp-item-info">
                      <div className="sp-item-info-textAndIcon">
                        <div className="sp-item-info-icon">
                          <img src={PinkIcon} alt="" />
                        </div>
                        <h3>Title</h3>
                      </div>
                      <p className="sp-item-info-desc">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                      </p>
                      <div className="sp-item-info-subtext">
                        <Link
                          to="/groundwork/family-of-light"
                          state={{ heading: "Fresh Blooms Video" }}
                        >
                          <p>Details</p>
                        </Link>
                        <Link to="/topic">
                          <p>#Tag</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="sp-item">
                    <div className="sp-item-video">
                      <VidCard groundwork />
                    </div>
                    <div className="sp-item-info">
                      <div className="sp-item-info-textAndIcon">
                        <div className="sp-item-info-icon">
                          <img src={PinkIcon} alt="" />
                        </div>
                        <h3>Title</h3>
                      </div>
                      <p className="sp-item-info-desc">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                      </p>
                      <div className="sp-item-info-subtext">
                        <Link
                          to="/groundwork/family-of-light"
                          state={{ heading: "Fresh Blooms Video" }}
                        >
                          <p>Details</p>
                        </Link>
                        <Link to="/topic">
                          <p>#Tag</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "teachers" && (
                <div className="sp-type">
                  {/* <div className="search-type-heading-container">
                    <h4 className="search-type-heading">Teachers</h4>
                    <Link to="/teachers">
                      <p>See All</p>
                    </Link>
                  </div> */}
                  <div className="sp-search-teachers">
                    <div className="teacher-infosearch-imgHeading">
                      <Link to="/schedule">
                        <div className="teacher-infosearch-img-container">
                          <img src={images.teacher1} />
                        </div>
                      </Link>
                      <div>
                        <h3 className="teacher-infosearch-heading">
                          Emily Jordan
                        </h3>
                        <div className="teacher-info-iconPara">
                          <div className="teacher-info-icon">
                            <img src={PinkIcon} />
                          </div>
                          <p>
                            Body copy style for white text on dark or gradient
                            backgrounds (Medium Weight.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sp-search-teachers">
                    <div className="teacher-infosearch-imgHeading">
                      <Link to="/schedule">
                        <div className="teacher-infosearch-img-container">
                          <img src={images.teacher1} />
                        </div>
                      </Link>
                      <div>
                        <h3 className="teacher-infosearch-heading">
                          Emily Jordan
                        </h3>
                        <div className="teacher-info-iconPara">
                          <div className="teacher-info-icon">
                            <img src={PinkIcon} />
                          </div>
                          <p>
                            Body copy style for white text on dark or gradient
                            backgrounds (Medium Weight.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sp-search-teachers">
                    <div className="teacher-infosearch-imgHeading">
                      <Link to="/schedule">
                        <div className="teacher-infosearch-img-container">
                          <img src={images.teacher1} />
                        </div>
                      </Link>
                      <div>
                        <h3 className="teacher-infosearch-heading">
                          Emily Jordan
                        </h3>
                        <div className="teacher-info-iconPara">
                          <div className="teacher-info-icon">
                            <img src={PinkIcon} />
                          </div>
                          <p>
                            Body copy style for white text on dark or gradient
                            backgrounds (Medium Weight.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-5 sp-right-col">
              <div className="sp-mobile-app">
                <img src={images.mobileapp} alt="" />
              </div>
              <p className="sp-moboile-info">
                Join the quest and won your vibe Got the free VibeBloom App
              </p>
              <div style={{ borderRadius: "20px", overflow: "hidden" }}>
                <GreenButton paddingX text="Download Now" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default SearchPage;
