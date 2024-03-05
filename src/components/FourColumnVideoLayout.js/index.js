import React from "react";
import ContainerSection from "../Container";
import VidCard from "../VidCard";
import images from "../../constants/images";
import FormGroupAuth from "../FormInputAuth";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { green } from "@mui/material/colors";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import classes from "./style.module.css";
import { imageURL } from "../../api/axios";
import { useSelector } from "react-redux";

const description = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
et ea rebum. Stet clita kas`;

const FourColumnVideoLayout = ({
  linkState,
  heading = "Heading Here",
  desc,
  leftHeading,
  leftPara,
  noPara,
  whiteHeading,
  whitePara,
  whiteLink,
  whiteSubText,
  searchInput,
  secondRow,
  dataArray,
  seeAllOnClick = () => null,
  backLink,
  disableLink,
  linkDestination = "#",
  backText = "Ground Work",
  linkTo = "/",
  groundWork,
  tools,
  searchState = "all",
  searchCatState = ["nullsq"],
  id,
}) => {
  const navigate = useNavigate();

  return (
    <section className="fcvl">
      <div className="container fcvl-container ">
        <h2
          className={`fcvl-heading ${!leftHeading && "text-center"} ${
            leftHeading && "fcvl-left-heading"
          } ${whiteHeading && "color-white"}`}
        >
          {heading}
        </h2>
        {searchInput && (
          <div className="fcvl-search-input-container">
            <div className={`fcvl-search-input ${classes.searchBar}`}>
              <input
                onChange={(e) => searchState(e.target.value)}
                type="text"
                id="search"
                placeholder="Search..."
              />
              <AiOutlineSearch />
            </div>
          </div>
        )}
        {!noPara && (
          <p
            className={`fcvl-para ${!leftPara && "text-center center-align"}  ${
              whitePara && "color-white"
            } ${leftPara && "fcvl-left-para "}`}
          >
            {desc}
          </p>
        )}
        {dataArray?.length ? (
          <div className="fcvl-row row">
            {dataArray?.map((video, index) => (
              <div className="col-lg-3 col-sm-6 fcvl-col" key={`video${index}`}>
                <div className="fcvl-col-video mb-5">
                  {groundWork || tools ? (
                    <VidCard
                      titleIcon
                      blackTitle
                      title={video?.title}
                      time={video?.videoDuration}
                      videoSrc={video?.video}
                      // groundwork={groundWork ? true : false}
                      // tool={tools ? true : false}
                      recentVibes={groundWork || tools ? true : false}
                      image={`${imageURL}${video?.thumbnail}`}
                      id={video?._id}
                      showDetailButton={true}
                    />
                  ) : (
                    <VidCard
                      titleIcon
                      blackTitle
                      title={video?.title}
                      time={video?.duration}
                      groundwork={groundWork ? true : false}
                      tool={tools ? true : false}
                      image={video?.thumbnail}
                      id={video?._id}
                      showDetailButton={true}
                    />
                  )}
                </div>
                {/* <div className="subtext-container">
                {video?.tags?.map((tag) => {
                  return (
                    // <Link to={`/topic/${tag?._id}`}>
                    <p className={`subtext ${whiteSubText && "color-white"}`}>
                      {tag?.name}
                    </p>
                    // </Link>
                  );
                })}
                {!video.tags && (
                  <div>
                    <Link
                      to={
                        !tools
                          ? `/groundwork/family-of-light`
                          : `/tools/tonglen`
                      }
                      state={{ tool: tools ? true : false }}
                    >
                      <p className={`subtext ${whiteSubText && "color-white"}`}>
                        {`Details`}
                      </p>
                    </Link>
                    <p className={`subtext ${whiteSubText && "color-white"}`}>
                      {`#Tag`}
                    </p>
                  </div>
                )}
              </div> */}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No Data Available</p>
        )}
        {!disableLink && (
          <Link to={`${linkDestination}`}>
            {!backLink && dataArray?.length ? (
              <h5
                className={`fcvl-link ${whiteLink && "color-white"}`}
                // onClick={() => seeAllOnClick()}
              >
                {`See All >`}
              </h5>
            ) : null}
            {backLink && (
              <h5 className={`fcvl-link ${whiteLink && "color-white"}`}>
                {`< Back To All ${backText}`}
              </h5>
            )}
          </Link>
        )}
      </div>
    </section>
  );
};

export default FourColumnVideoLayout;
