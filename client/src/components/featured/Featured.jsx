import { SearchContext } from "../../context/SearchContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./featured.css";

const Featured = () => {
  const navigate = useNavigate();
  const [dates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const { dispatch } = useContext(SearchContext);
  useEffect(() => {});
  const handleSearch = (destination) => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="featured">
      <>
        <button
          onClick={() => {
            handleSearch("el-alamein");
          }}
          className="featuredItem"
        >
          <img
            src="https://cityedgedevelopments.com/uploads/destinations/destination_4/projects/project_8/cover_image.3084429b-0556-40b2-b9da-b6c80daa67df.jpg"
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>El alamein</h1>
          </div>
        </button>

        <button
          onClick={() => {
            handleSearch("cairo");
          }}
          className="featuredItem"
        >
          <img
            src="https://egypttimetravel.com/wp-content/uploads/2020/06/Cairo-Egypt.jpg"
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>Cairo</h1>
          </div>
        </button>

        <button
          onClick={() => {
            handleSearch("alex");
          }}
          className="featuredItem"
        >
          <img
            src="https://www.shutterstock.com/image-photo/harbour-boats-alexandria-near-qaitbay-600nw-2334977667.jpg"
            alt=""
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>Alexandria</h1>
          </div>
        </button>
      </>
    </div>
  );
};

export default Featured;
