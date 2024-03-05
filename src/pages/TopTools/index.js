import React from "react";
import VidCard from "../../components/VidCard";
import { Link } from "react-router-dom";
import PinkIcon from "../../assets/images/pink-icon.svg";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaTrash } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { apiRequest } from "../../api/axios";
import Loader from "../../components/Modal/loader";
import AlertModal from "../../components/Modal/AlertModal";

const TopTools = () => {
  // const user = useSelector((state) => state?.user?.user);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const response = await apiRequest.get(`/users/me`);
        if (response.status === 200) {
          setUser(response.data.data);
          setLoading(false);
        }
      } catch (err) {
        if (err.message === "Network Error") return setError("Network Error");
        const data = err?.response?.data;
        setError(data?.message);
      }
    };
    getUser();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <AlertModal state={error} setState={setError} message={error} />
      <NavBar />
      <div className="library-list container">
        <h1>Top Tools</h1>
        {!user?.toolsToTry?.length ? (
          <div>
            <p>
              You haven’t rated any Tools yet; but once you do, we’ll keep track
              of those you’ve found most supportive and collect them right here.
            </p>
          </div>
        ) : (
          <div className="library-data">
            {user?.topTools?.map((item) => {
              return (
                <div className="ld-item">
                  {/* <span className="ld-trash">
                  <FaTrash size={24} color="#1C5C2E" />
                </span> */}
                  <div className="ld-item-video">
                    {/* <Link to="/tools/tonglen"> */}
                    <VidCard
                      tool
                      recentVibes
                      groundwork
                      videoSrc={item?.video}
                      id={item?._id}
                    />

                    {/* </Link> */}
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
                        // to={`/groundwork/family-of-light${item?._id}`}
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
                      <div className="ld-item-rating">
                        <AiFillStar size={20} color="rgba(27, 91, 47, 1)" />
                        {/* <p className="ldir-line">-</p> */}
                        <p className="ldir-num">{item?.averageRating}</p>
                      </div>
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

export default TopTools;
