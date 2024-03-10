import { Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  const stars = (stars) => {
    let componentsArr = [];
    for (let i = 0; i < stars; i++) {
      componentsArr.push(<IoIosStar key={i} style={{ color: "gold" }} />);
    }
    return <div style={{ display: "flex" }}>{componentsArr}</div>;
  };
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <Link to={`/hotels/${item._id}`}>
          <div className="siTitle">
            <h2>{item.name} </h2>
          </div>
        </Link>
        {stars(item.numberOfStars)}

        <span className="siDistance">{item.distance}m from center</span>

        <span className="siSubtitle">{item.type}</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">{item.cheapestPrice} $</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
