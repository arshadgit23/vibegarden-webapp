import React, { useEffect, useState } from "react";
import VidCard from "../../components/VidCard";
import { Link } from "react-router-dom";
import PinkIcon from "../../assets/images/pink-icon.svg";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaTrash } from "react-icons/fa";
import { apiRequest } from "../../api/axios";
import Loader from "../../components/Modal/loader";
import AlertModal from "../../components/Modal/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const RecentContent = () => {
  // const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  const removeFromRecentContent = async (id) => {
    try {
      setLoading(true);
      const response = await apiRequest.patch(`videos/add-to-recent/${id}`, {
        status: "remove",
      });
      dispatch(setUser(response?.data?.data));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.message === "Network Error") return setError("Network Error");
      const data = err?.response?.data;
      setError(data?.message);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <AlertModal message={error} state={error} setState={setError} />
      <NavBar />
      <div className="library-list container-lg">
        <h1>Recent Content</h1>
        {!user?.recentContent.length ? (
          <div>
            <p>
              You haven’t viewed any content yet; but once you do, this is a
              great place to come revisit Tools, Groundwork, or Fresh Blooms
              you’ve recently engaged with.
            </p>
          </div>
        ) : (
          <div className="library-data">
            {user?.recentContent?.map((item, ind) => {
              return (
                <div className="ld-item">
                  <span className="ld-trash">
                    <FaTrash
                      size={24}
                      color="#1C5C2E"
                      onClick={() => removeFromRecentContent(item?._id)}
                    />
                  </span>
                  <div className="ld-item-video">
                    <VidCard
                      tool
                      recentVibes
                      linkVideo="/tools/tonglen"
                      videoSrc={item?.video}
                      id={item?._id}
                    />
                  </div>
                  <div className="ld-item-info">
                    <div className="ld-item-info-textAndIcon">
                      <div className="ld-item-info-icon">
                        <img src={PinkIcon} alt="" />
                      </div>
                      <h3>{item?.title}</h3>
                    </div>
                    <p className="ld-item-info-desc">{item?.description}</p>
                    <div className="ld-item-info-subtext">
                      <Link
                        to={`/${
                          item?.videoType == "tool" ? "tools" : item?.videoType
                        }/${item?._id}`}
                        state={{ heading: "Fresh Blooms Video" }}
                      >
                        <p>Details</p>
                      </Link>
                      {/* <Link to="/topic">
                        <p>#Tag</p>
                      </Link> */}
                      {item?.tags
                        ? item?.tags?.map((tag) => {
                            return <p>#{tag?.name}</p>;
                          })
                        : "No Tags Found"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default RecentContent;
