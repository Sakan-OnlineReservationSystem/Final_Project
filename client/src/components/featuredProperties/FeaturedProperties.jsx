import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("https://sakan-api.onrender.com/api/hotels?featured=true&limit=4");

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
              <div className="fpItem" key={item._id}>
                <img src={item.photos[0]} alt="" className="fpImg" />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">
                  Starting from ${item.cheapestPrice}
                </span>
                {item.rating && (
                  <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>{item.numberOfStars}</span>
                  </div>
                )}
              </div>
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
