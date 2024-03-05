// Library Imports
import React from "react";
import { useSelector } from "react-redux";
// Custom Imports
import ContainerSection from "../Container";
import WhiteInfoCard from "../WhiteInfoCard.js";
import sampleImageOne from "../../assets/images/placeholder-3@2x.png";
import sampleImageTwo from "../../assets/images/placeholder-4@2x.png";
import sampleImageThree from "../../assets/images/placeholder-5@2x.png";

const MoreVG = () => {
  // Redux State Read
  const homepage = useSelector((state) => state.homepage);
  return (
    <section className="mvg py-5 gx-xl-0 gx-lg-1">
      <ContainerSection isFluid={"yes"}>
        <h2 className="mvg-heading mb-5">
          {homepage?.moreVGHeading || "More About VibeGarden"}
        </h2>
        <div className="container-lg mvg-container">
          <div className="row mvg-row ">
            <div className="col-md-4 mvg-item ">
              <WhiteInfoCard
                heading={homepage?.creationStory?.heading || "A Creation Story"}
                para={
                  homepage?.creationStory?.text ||
                  "Body copy style for white text on dark or gradient backgrounds (Medium Weight) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat euismod porttitor."
                }
                btnText={homepage?.creationStory?.buttonText || "More About"}
                videoLink={
                  homepage?.creationStory?.video ||
                  "//vjs.zencdn.net/v/oceans.mp4"
                }
                videoDuration={homepage?.creationStory?.videoDuration || "3:15"}
                image={homepage?.creationStory?.thumbnail || sampleImageOne}
                linkText="/about-us"
              />
            </div>
            <div className="col-md-4 mvg-item ">
              <WhiteInfoCard
                heading={
                  homepage?.vibeBloomApp?.heading || "The Vibe Bloom App"
                }
                para={
                  homepage?.vibeBloomApp?.text ||
                  "Body copy style for white text on dark or gradient backgrounds (Medium Weight) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat euismod porttitor."
                }
                btnText={
                  homepage?.vibeBloomApp?.buttonText || "Begin Your Quest"
                }
                videoLink={
                  homepage?.vibeBloomApp?.video ||
                  "//vjs.zencdn.net/v/oceans.mp4"
                }
                videoDuration={homepage?.vibeBloomApp?.videoDuration || "3:15"}
                image={homepage?.vibeBloomApp?.thumbnail || sampleImageTwo}
                linkText="/appdownload"
              />
            </div>
            <div className="col-md-4 mvg-item ">
              <WhiteInfoCard
                heading={homepage?.teacher?.heading || "Teachers"}
                para={
                  homepage?.teacher?.text ||
                  "Body copy style for white text on dark or gradient backgrounds (Medium Weight) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat euismod porttitor."
                }
                btnText={homepage?.teacher?.buttonText || "Visit Teacher"}
                videoLink={
                  homepage?.teacher?.video || "//vjs.zencdn.net/v/oceans.mp4"
                }
                videoDuration={homepage?.teacher?.videoDuration || "3:15"}
                image={homepage?.teacher?.thumbnail || sampleImageThree}
                linkText="/teachers"
              />
            </div>
          </div>
        </div>
      </ContainerSection>
    </section>
  );
};

export default MoreVG;
