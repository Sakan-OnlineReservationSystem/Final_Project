import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import "../../output.css";
import "./featuredProperties.css";
import NotFound from "../NotFound/NotFound";
import { toast } from "react-toastify";

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

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "/api/hotels?featured=true&limit=10"
  );

  if (error) {
    toast.error(error.message);
  }

  const isArray = Array.isArray(data);

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
          {isArray && data.length !== 0 ? (
            data.map((item) => (
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
            ))
          ) : (
            <NotFound />
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
