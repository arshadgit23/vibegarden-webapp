import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar";
import GreenLineBreak from "../../components/GreenLineBreak";
import VideoCardSlider from "../../components/VideoCardSlider";
import images from "../../constants/images";
import BrowseByTags from "../../components/BrowseByTags";
import Footer from "../../components/Footer";
import { apiRequest } from "../../api/axios";
import AlertModal from "../../components/Modal/AlertModal";
import { setLoading } from "../../redux/slices/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const desc = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
rebum. Stet clita kasLorem ipsum dolor sit amet, consetetur sadipscing
elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
magna aliquyam erat, sed diam voluptua. At vero eos et accusam et jus`;
const teacherDesc = ` Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
diam nonumy eirmod tempor invidunt ut labore et dolore magna
aliquyam erat, sed diam voluptua. At vero eos et accusam et
justo duo dolores et ea rebum. Stet clita kasLorem ipsum dolor
sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
tempor I Lorem ipsum dolor sit amet, consetetur sadipscing
elitr, sed diam nonumy eirmod tempor invidunt ut.`;

const Topic = () => {
  const [error, setError] = useState(false);
  const [topic, setTopic] = useState({});
  const [relatedGW, setRelatedGW] = useState([]);
  const [relatedTools, setRelatedTools] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const findTopic = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiRequest.get(`/getTag/${id}`);
      console.log("data", data.data);
      setTopic(data.data);
      dispatch(setLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  };
  const divideArray = (inputArray, perChunk) => {
    const result = inputArray.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);
    return result;
  };
  const findRelatedGW = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiRequest.get(
        `/getAllGroundWorkVideos?tag=${id}`
      );
      const divide1 = divideArray(data.data, 8);
      const divide2 = divide1?.map((vid) => divideArray(vid, 4));
      setRelatedGW(divide2);
      dispatch(setLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  };
  const findRelatedTools = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiRequest.get(`/getAllToolVideos?tag=${id}`);
      // setRelatedTools(divideArray(data.data));
      const divide1 = divideArray(data.data, 8);
      const divide2 = divide1?.map((vid) => divideArray(vid, 4));
      setRelatedTools(divide2);
      dispatch(setLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    findTopic();
    findRelatedGW();
    findRelatedTools();
  }, [id]);

  return (
    <div>
      <NavBar />
      <AlertModal state={error} message={error} setState={setError} />
      <div className="topic-headingAndDesc">
        <h2>{topic.name || "Topic Name"}</h2>
        <p>{topic.description || desc}</p>
      </div>
      <GreenLineBreak />
      <div className="topic-slider container-xxl">
        <VideoCardSlider
          heading="Related GroundWork"
          twoRowsFour
          recentVibes
          groundwork
          data={relatedGW}
        />
      </div>
      <div className="topic-slider container-xxl">
        <VideoCardSlider
          heading="Related Tools"
          twoRowsFour
          recentVibes
          tools
          data={relatedTools}
        />
      </div>
      <div className="topic-slider container-xl">
        <VideoCardSlider
          heading="Related GroundWork"
          twoRowsThree
          recentVibes
          groundwork
        />
      </div>
      <div className="topic-slider container-xl">
        <VideoCardSlider
          heading="Related Tools"
          twoRowsThree
          recentVibes
          tools
        />
      </div>
      <div className="topic-slider-single container-xl">
        <VideoCardSlider heading="Related GroundWork" recentVibes tools />
      </div>
      <div className="topic-slider-single container-xl">
        <VideoCardSlider heading="Related Tools" recentVibes tools />
      </div>
      <section className="idgw-5 container">
        <h2>Related Teachers</h2>
        {topic?.teachers?.map((teacher) => {
          return (
            <div className="idgw-5-row">
              <div className="idgw-5-col-1">
                <img src={teacher?.profileImage || images.teacher1} />
              </div>
              <div className="idgw-5-col-2">
                <p>
                  {teacher?.description || teacherDesc}
                  <span>Link</span>
                </p>
              </div>
            </div>
          );
        })}
      </section>
      <BrowseByTags />
      <Footer />
    </div>
  );
};

export default Topic;
