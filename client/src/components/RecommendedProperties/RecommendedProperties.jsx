import { Link } from "react-router-dom";
import "../../output.css";
import NotFound from "../NotFound/NotFound";
import { useEffect, useState } from "react";

const Suspense = () => {
  return (
    <div style={{ textAlign: "start" }}>
      <div className="fpItem animate-pulse">
        <div className="fpImg bg-slate-200" />
        <div className="FPdetailsContainer">
          <div className="details">
            <span className="fpName bg-slate-200 w-[60%] h-4"></span>
            <span className="fpCity bg-slate-200 w-[50%] h-4"></span>
            <div className="rating h-7">
              <div className="flex items-center gap-2">
                <button className="bg-slate-200 h-7 w-7"></button>
                <div className="bg-slate-200 h-4 w-10"></div>
              </div>
            </div>
          </div>
          <div className="fpPrice flex h-9 items-center">
            <div className="bg-slate-200 w-11 h-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
const apiUrl = process.env.REACT_APP_API_URL;

const RecommendedProperties = ({ hotels }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (hotels && hotels.length > 0) {
        const results = await Promise.all(
          hotels.map(async (id) => {
            const response = await fetch(`${apiUrl}/api/hotels/find/${id}`);
            const hotelData = await response.json();
            return hotelData;
          })
        );
        setData(results);
      } else {
        setData([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [hotels]);

  return (
    <div className="fp">
      {loading ? (
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <Suspense key={i} />
          ))}
        </div>
      ) : (
        <>
          {data && data.length > 0 ? (
            data.map((item) => (
              <>
                {item && (
                  <Link
                    style={{ textAlign: "start" }}
                    to={`/hotels/${item._id}`}
                    key={item._id}
                  >
                    <div className="fpItem">
                      <img src={item.photos[0]} alt="" className="fpImg" />
                      <div className="FPdetailsContainer">
                        <div className="details">
                          <span className="fpName">{item.name}</span>
                          <span className="fpCity">{item.address}</span>
                          <div className="rating">
                            {item.rating && (
                              <div className="fpRating">
                                <button>{item.rating}</button>
                                <span>{item.numberOfReviewers} reviews</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="fpPrice">
                          <span style={{ fontSize: "12px", fontWeight: "400" }}>
                            Starting from
                          </span>{" "}
                          ${item.cheapestPrice}
                        </span>
                      </div>
                    </div>
                  </Link>
                )}
              </>
            ))
          ) : (
            <NotFound />
          )}
        </>
      )}
    </div>
  );
};

export default RecommendedProperties;
