import React from "react";
import ScheduleCard from "../ScheduleCard";
import images from "../../constants/images";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loadingSlice";
import { apiRequest } from "../../api/axios";
import classes from "./style.module.css";
import { imageURL } from "../../api/axios";

const ScheduleSection = () => {
  const dispatch = useDispatch();
  const [vibeGuides, setVibeGuides] = useState([]);
  const [error, setError] = useState("");
  console.log(images.placeholder6);
  const getVibeGuides = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiRequest.get("/users?role=vibe-guide");

      setVibeGuides(data?.data);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      setError(err.message);
    }
  };
  useEffect(() => {
    getVibeGuides();
  }, []);
  return (
    <div className={`container ss-container ${classes.vibeGuide}`}>
      <div className={`row ss-row `}>
        {vibeGuides?.map((vibeGuide, _) => (
          <>
            <div key={_} className={`col-md-5 ss-col `}>
              <div className="ss-card-container">
                <ScheduleCard
                  id={vibeGuide?.id}
                  isVideo={false}
                  description={vibeGuide?.description}
                  name={vibeGuide?.vibeGuideName}
                  videoImage={`${imageURL}${vibeGuide?.photo}`}
                  videoDuartion={"3:15"}
                />
              </div>
            </div>
            {_ % 2 === 0 && (
              <div className="col-md-1 line-break-container">
                <div className="line-break-vertical"></div>
              </div>
            )}
          </>
        ))}
        {/* {isLine && (
                
              )} */}

        {/* <div className="col-md-5 ss-col">
          <div className="ss-card-container">
            <ScheduleCard
              name="Kate"
              videoImage={images.placeholder6}
              videoDuartion={"3:15"}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ScheduleSection;
