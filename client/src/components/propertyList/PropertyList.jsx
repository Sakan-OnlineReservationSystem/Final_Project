import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../output.css";
import "./propertyList.css";
const Suspense = () => {
  return (
    <div className="pListItem w-48 animate-pulse ">
      <div className="pListImg bg-slate-200 mb-2" />
      <div className="pListTitles flex flex-col justify-between gap-y-1 ">
        <div className="bg-slate-200 h-4 w-20 "></div>
        <div className="bg-slate-200 h-4 w-24"></div>
      </div>
    </div>
  );
};

const PropertyList = () => {
  const { data, loading, error } = useFetch("/hotels/countByType");

  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];

  const navigate = useNavigate();
  const [dates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options] = useState({
    adult: 2,
    children: 0,
    room: 1,
  });

  const { dispatch } = useContext(SearchContext);
  useEffect(() => {});
  const handleSearch = (destination) => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  if (error) {
    return <div>Error loading property list.</div>;
  }
  return (
    <div className="pList">
      {loading ? (
        <div className="flex gap-4">
          {[...Array(5)].map((_, i) => (
            <Suspense key={i} />
          ))}
        </div>
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <button
                onClick={() => {
                  handleSearch("alex");
                }}
                className="pListItem"
                key={i}
              >
                <img src={img} alt="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>
                    {data[i]?.count} {data[i]?.type}
                  </h2>
                </div>
              </button>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
