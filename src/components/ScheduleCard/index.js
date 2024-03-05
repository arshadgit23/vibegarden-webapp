import React from "react";
import VidCard from "../VidCard";
import ButtonFilled from "../Button/ButtonFilled";
import { useNavigate, Link } from "react-router-dom";
import images from "../../constants/images";
const ScheduleCard = ({
  name = "Name",
  videoImage,
  videoDuartion,
  isVideo,
  description,
  id,
}) => {
  return (
    <div className="card sc-card border-0">
      <div
        className="sc-card-username-container"
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <div className="sc-card-username-circle bg-gradient-green"></div>
        <p className="sc-card-username-name">{name}</p>
      </div>
      <div className="sc-card-videocard" style={{ textAlign: "center" }}>
        {!isVideo && (
          <img
            style={{
              width: "70%",
              borderRadius: "20px",
              boxShadow: "10px 20px 30px #00000029",
              height: "220px",
            }}
            src={videoImage}
          />
        )}

        {isVideo && <VidCard image={videoImage} time={videoDuartion} />}
      </div>
      <p className="sc-card-para">{description}</p>
      <Link to={`/schedule/${id}`}>
        <div className="sc-card-btn">
          <ButtonFilled
            bgGradient={"yes"}
            text={`Schedule With ${name}`}
            paddingYSmall
          />
        </div>
      </Link>
    </div>
  );
};

export default ScheduleCard;
