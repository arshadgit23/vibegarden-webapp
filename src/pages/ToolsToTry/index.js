import React from "react";
import VidCard from "../../components/VidCard";
import { Link } from "react-router-dom";
import PinkIcon from "../../assets/images/pink-icon.svg";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { apiRequest } from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import Loader from "../../components/Modal/loader";
import AlertModal from "../../components/Modal/AlertModal";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ToolsToTry = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  const removeFromAddToolsToTry = async (id) => {
    try {
      setLoading(true);
      const response = await apiRequest.patch(
        `videos/add-to-tools-to-try/${id}`,
        {
          status: "remove",
        }
      );
      dispatch(setUser(response?.data?.data));
      // setUser(response?.data?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.message === "Network Error") return setError("Network Error");
      const data = err?.response?.data;
      setError(data?.message);
    }
  };

  console.log("user", user);
  return loading ? (
    <Loader />
  ) : (
    <>
      <AlertModal message={error} state={error} setState={setError} />
      <NavBar />
      <div className="library-list container-lg">
        <h1>Tools To Try</h1>
        {!user?.toolsToTry?.length ? (
          <div>
            <p>
              You haven’t selected any Tools to Try yet; but you may do so at
              any time by selecting the plus icon{" "}
              <AiOutlinePlusCircle size={24} color="rgba(214, 16, 153, 1)" /> on
              a Tool that you’d like to try out now; or in a future now moment!
            </p>
          </div>
        ) : (
          <div className="library-data">
            {user?.toolsToTry?.map((item, ind) => {
              return (
                <div className="ld-item" key={ind}>
                  <span className="ld-trash">
                    <FaTrash
                      size={24}
                      color="#1C5C2E"
                      onClick={() => removeFromAddToolsToTry(item?._id)}
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

export default ToolsToTry;
