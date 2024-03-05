// Library Imports
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { green } from "@mui/material/colors";
// Custom Imports
import { apiRequest } from "../../api/axios";
import AlertModal from "../../components/Modal/AlertModal";
import NavBar from "../../components/Navbar";
import VidCard from "../../components/VidCard";
import GreenLineBreak from "../../components/GreenLineBreak";
import FormGroupAuth from "../../components/FormInputAuth";
import TeacherInfo from "../../components/TeacherInfo";
import Footer from "../../components/Footer";
import images from "../../constants/images";
// Redux Slices
import { setTeachers, setTeacherRC } from "../../redux/slices/teachersSlice";
import { setLoading } from "../../redux/slices/loadingSlice";
import { imageURL } from "../../api/axios";

const Teachers = () => {
  // const dispatch = useDispatch();
  // const { teachers, relatedContent } = useSelector((state) => state?.teachers);
  const [searchValue, setSearchValue] = useState("");
  // const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");

  console.log(teachers);
  const getTeachers = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiRequest.get("/users?role=teacher", {
        params: { search: searchValue },
      });

      setTeachers(data?.data);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      setError(err.message);
    }
  };

  useEffect(() => {
    getTeachers();
  }, [searchValue]);

  return (
    <>
      <NavBar />
      <AlertModal message={error} state={error} setState={setError} />
      <div className="teachers">
        <h2 className=" teahers-heading">teachers</h2>
        <section className="teachers-top container-lg">
          <div className="row teachers-row">
            <div className="col-lg-4  teachers-left-col">
              <VidCard
                image={images.placeholder6}
                // freshBlooms={freshBlooms ? true : false}
                videoSrc={"//vjs.zencdn.net/v/oceans.mp4"}
                // time={videoDuration}
                // noTitle={noTitle ? true : false}
                // title={videoTitle}
              />
            </div>
            <div className="col-lg-8  teachers-right-col">
              <p>
                Body copy style for white text on dark or gradient backgrounds
                (Medium Weight) Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Mauris placerat euismod porttitor. Nam nec
                mauris non magna facilisis volutpat ac sit amet nulla. Nullam
                vestibulum velit vitae sem commodo tempor. Sed dapibus, est non
                pulvinar fringilla, lorem libero laoreet erat, ac tristique elit
                nisl eu metus. Sed fermentum erat sit amet enim blandit, quis
                dictum nisi tempus. Etiam dui tellus, porttitor vitae rutrum a,
                ultrices pharetra nulla.
              </p>
            </div>
          </div>
        </section>
        <GreenLineBreak />
        {/* <section className="container teacher-search">
          <FormGroupAuth
            noLabel
            placeHolder="Search..."
            icon
            value={searchValue}
            setValue={setSearchValue}
            searchState="teachers"
          />
          <div
            className="teachers-filter-icon"
            // onClick={() => console.log(searchValue)}
          >
            <FilterAltIcon fontSize="large" sx={{ color: green[700] }} />
          </div>
          {searchValue && (
            <div className="search-box">
              <Link to="/groundwork/family-of-light">
                <div className="search-box-container">
                  <div className="search-box-icon">#</div>
                  <div className="search-box-info">
                    <h5>Buddhism</h5>
                    <p>Topic Page</p>
                  </div>
                </div>
              </Link>
              <div className="search-box-container">
                <div className="search-box-icon">#</div>
                <div className="search-box-info">
                  <h5>Buddhism</h5>
                  <p>Topic Page</p>
                </div>
              </div>
              <div className="search-box-container">
                <div className="search-box-icon">#</div>
                <div className="search-box-info">
                  <h5>Buddhism</h5>
                  <p>Topic Page</p>
                </div>
              </div>
              <div className="search-box-container">
                <div className="search-box-icon">#</div>
                <div className="search-box-info">
                  <h5>Buddhism</h5>
                  <p>Topic Page</p>
                </div>
              </div>
            </div>
          )}
        </section> */}

        <section className="container teacher-search">
          <FormGroupAuth
            noLabel
            placeHolder="Search..."
            icon
            value={searchValue}
            setValue={setSearchValue}
            searchState="teachers"
          />
          {searchValue && teachers.length ? (
            <div className="search-box">
              {teachers?.map((teacher) => {
                return (
                  <div className="search-box-container">
                    <div className="search-box-icon">#</div>
                    <div className="search-box-info">
                      <h5>{teacher?.teacherName}</h5>
                      {/* <p>Topic Page</p> */}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </section>

        {teachers?.map((teacher, index) => {
          return (
            <section
              key={teacher._id}
              className={`teachers-info ${
                index % 2 === 0 ? "bg-lightGreen" : "bg-lightPink"
              }`}
            >
              <TeacherInfo
                // tools
                name={teacher?.teacherName}
                profile={`${imageURL}${teacher?.photo}`}
                desc={teacher?.description}
                thumbnail={teacher?.thumbnail}
                videoLink={teacher?.video}
                reels={teacher?.reels}
                data={teacher?.relatedContent}
                videoDuration={teacher?.videoDuration}
              />
            </section>
          );
        })}
        {/* <section className="teachers-info bg-lightGreen">
          <TeacherInfo tools />
        </section>
        <section className="teachers-info bg-lightPink">
          <TeacherInfo groundwork />
        </section> */}
        <Footer />
      </div>
    </>
  );
};

export default Teachers;
