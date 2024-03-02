import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

  if (error) {
    console.error(error);
    return <div>Error loading featured properties.</div>;
  }

  return (
    <div className="fp">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {data && data.length !== 663 && data.length !== 0 ? (
            data.map((item) => (
              <button className="fpItem" key={item._id}>
                <Link style={{ textAlign: "start" }} to={`/hotels/${item._id}`}>
                  <img src={item.photos[0]} alt="" className="fpImg" />
                  <span className="fpName">{item.name}</span>
                </Link>
                <span>{item.numberOfStars} stars</span>
                <span className="fpCity">{item.city}</span>

                {item.rating && (
                  <div className="fpRating">
                    <button>{item.rating}</button>
                  </div>
                )}
                <span className="fpPrice">
                  <span style={{ fontSize: "12px", fontWeight: "400" }}>
                    Starting from
                  </span>{" "}
                  ${item.cheapestPrice}
                </span>
              </button>
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
