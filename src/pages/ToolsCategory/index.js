import { useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/Navbar";
import FourColumnVideoLayout from "../../components/FourColumnVideoLayout.js";
import Footer from "../../components/Footer";
import { dummyVideodata } from "../../constants/dummyVideoData";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ToolsCategory = () => {
  const categories = useSelector((state) => state.toolCategories.categories);
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const filteredCat = categories.find((cat) => cat?.categoryName === id);

  const searchResultVideos = filteredCat?.videos?.filter((video) => {
    let searchVideo;
    if (search === "") {
      searchVideo = video;
    } else if (
      video?.description?.toLowerCase()?.includes(search?.toLowerCase())
    ) {
      searchVideo = video;
    } else if (video?.title?.includes(search)) {
      searchVideo = video;
    }

    return searchVideo;
  });

  return (
    <div className="fcvl-caller">
      <NavBar />
      <FourColumnVideoLayout
        searchInput
        heading={filteredCat?.categoryName}
        dataArray={searchResultVideos}
        desc={filteredCat?.description}
        backLink
        linkDestination="/tools"
        backText="Tools"
        tools
        searchState={(search) => setSearch(search)}
        searchCatState={[
          filteredCat?.categoryName?.split(" ").join("").toLowerCase(),
        ]}
      />
      <Footer />
    </div>
  );
};

export default ToolsCategory;
