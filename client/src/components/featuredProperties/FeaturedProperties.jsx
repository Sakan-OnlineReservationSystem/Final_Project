import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import "./featuredProperties.css";
import AppLoader from "../Loading/AppLoader";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
  console.log(data);

  if (error) {
    console.error(error);
    return <div>Error loading featured properties.</div>;
  }

  return (
    <div className="fp">
      {loading ? (
        <AppLoader />
      ) : (
        <>
          {data && data.length !== 663 && data.length !== 0 ? (
            data.map((item) => (
              <Link style={{ textAlign: "start" }} to={`/hotels/${item._id}`}>
                <div className="fpItem" key={item._id}>
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
            <div>No featured properties found.</div>
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
