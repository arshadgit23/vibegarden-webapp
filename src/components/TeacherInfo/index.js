import React from "react";
import images from "../../constants/images";
import VidCard from "../VidCard";
import PinkIcon from "../../assets/images/pink-icon.svg";
import VideoCardSlider from "../VideoCardSlider";

const description = `Body copy style for white text on dark or gradient backgrounds
(Medium Weight).`;

const TeacherInfo = ({
  tools,
  groundwork,
  profile = images.teacher1,
  name = "Emily Jordan",
  desc = description,
  videoLink = "//vjs.zencdn.net/v/oceans.mp4",
  videoDuration = "3:10",
  thumbnail = images.placeholder3,
  reels,
  data,
}) => {
  return (
    <div className="teacher-info ">
      <div className="row teacher-info-row container-lg">
        <div className="col-md-7 teacher-info-leftcol">
          <div className="teacher-info-imgHeading">
            <div className="teacher-info-img-container">
              <img src={profile} />
            </div>
            <h2 className="teacher-info-heading">{name}</h2>
          </div>
          <div className="teacher-info-iconPara">
            <img src={PinkIcon} />
            <p>{desc}</p>
          </div>
        </div>
        <div className="col-md-5 teacher-info-rightcol">
          <VidCard
            noTitle
            videoSrc={videoLink}
            time={videoDuration}
            image={thumbnail}
          />
        </div>
      </div>
      <div className="teacher-content-slider container">
        <VideoCardSlider
          heading="Related Content"
          recentVibes
          tools={tools ? true : false}
          groundwork={groundwork ? true : false}
          data={data ? data : false}
        />
      </div>
      {/* <div className="teacher-info-reels container">
        <h2>Nightlight Reels</h2>
        {!reels && (
          <div className="row">
            <div className="col-md-6">
              <div className="link-display">
                <div className="link-display-heading">
                  <span>•</span>
                  <h4>Link Display Name</h4>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="link-display">
                <div className="link-display-heading">
                  <span>•</span>
                  <h4>Link Display Name</h4>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="link-display">
                <div className="link-display-heading">
                  <span>•</span>
                  <h4>Link Display Name</h4>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="link-display">
                <div className="link-display-heading">
                  <span>•</span>
                  <h4>Link Display Name</h4>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua.
                </p>
              </div>
            </div>
          </div>
        )}
        {reels && (
          <div className="row">
            {reels?.map((reel) => {
              return (
                <div className="col-md-6" key={reel?._id}>
                  <div className="link-display">
                    <div className="link-display-heading">
                      <span>•</span>
                      <h4>{reel?.linkName || "link display name"}</h4>
                    </div>
                    <p>{reel?.linkDescription || "link description"}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default TeacherInfo;
