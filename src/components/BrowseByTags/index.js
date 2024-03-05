import React, { useEffect, useState } from "react";
import ContainerSection from "../Container";
import SearchInput from "../SearchInput";
import { apiRequest } from "../../api/axios";

const BrowseByTags = () => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const getTags = async () => {
      try {
        // setLoading(true);
        const response = await apiRequest.get("/tags");
        if (response.status === 200) {
          setTags(response.data.data);
          // setLoading(false);
        }
      } catch (err) {
        console.log(err);
        // setLoading(false);
      }
    };
    getTags();
  }, []);

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  console.log("tag", selectedTag);
  return (
    <section className="bbt bg-gradient-pink">
      <ContainerSection isFluid={"yes"}>
        <div className="container bbt-container d-flex flex-column ">
          <h2 className="bbt-heading text-center">Browse By Tags</h2>
          <SearchInput
            value={inputValue}
            onChange={handleInputChange}
            selectedTag={selectedTag}
          />
          <div className="bbt-subTextContainer">
            <h5 className="bbt-subtext">Recent Search Tags</h5>
            <div />
          </div>
          <div className="row bbt-tags-row" style={{ cursor: "pointer" }}>
            {filteredTags?.map((tag, index) => (
              <React.Fragment key={index}>
                <div
                  className="col-3 bbt-tag"
                  onClick={() => setSelectedTag(tag)}
                >
                  #{tag.name}
                </div>
                {index % 3 === 2 && <div className="w-100"></div>}
              </React.Fragment>
            ))}
          </div>
          {/* <div className="row bbt-tags-row">
            <div className="col-3 bbt-tag">#Lorem_Ispum</div>
            <div className="col-3 bbt-tag">#Lorem_Ispum</div>
            <div className="col-3 bbt-tag">#Lorem_Ispum</div>
            <div className="w-100"></div>
            <div className="col-3 bbt-tag">#Lorem_Ispum</div>
            <div className="col-3 bbt-tag">#Lorem_Ispum</div>
            <div className="col-3 bbt-tag">#Lorem_Ispum</div>
            <div className="w-100"></div>
            <div className="col-3 bbt-tag">#Lorem_Ispum</div>
            <div className="col-3 bbt-tag">#Lorem_Ispum</div>
            <div className="col-3 bbt-tag">#Lorem_Ispum</div>
          </div> */}
        </div>
      </ContainerSection>
    </section>
  );
};

export default BrowseByTags;
