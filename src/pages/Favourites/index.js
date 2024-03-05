import React from "react";
import VidCard from "../../components/VidCard";
import { Link } from "react-router-dom";
import PinkIcon from "../../assets/images/pink-icon.svg";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Loader from "../../components/Modal/loader";
import AlertModal from "../../components/Modal/AlertModal";
import { apiRequest } from "../../api/axios";
import { setUser } from "../../redux/slices/userSlice";
import { BsHeart } from "react-icons/bs";

const Favorites = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  const removeFromFavourities = async (id) => {
    try {
      setLoading(true);
      const response = await apiRequest.patch(
        `videos/add-to-favaourite/${id}`,
        {
          status: "remove",
        }
      );
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
        <h1>Favourites</h1>
        {!user?.favourites?.length ? (
          <div>
            <p>
              You haven’t selected any favorites yet; but you may do so at any
              time by selecting the heart icon{" "}
              <BsHeart size={20} color="rgba(214, 16, 153, 1)" /> on a piece of
              content you’ve found wonderfully supportive and might like to
              revisit!
            </p>
          </div>
        ) : (
          <div className="library-data">
            {user?.favourites?.map((item, ind) => {
              return (
                <div className="ld-item" key={ind}>
                  <span className="ld-trash">
                    <FaTrash
                      size={24}
                      color="#1C5C2E"
                      onClick={() => removeFromFavourities(item._id)}
                    />
                  </span>
                  <div className="ld-item-video">
                    <VidCard
                      groundwork
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

export default Favorites;
