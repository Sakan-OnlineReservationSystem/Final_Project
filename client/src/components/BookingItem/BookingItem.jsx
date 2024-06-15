import { IoIosStar } from "react-icons/io";
import "./BookingItem.css";

const BookingItem = ({ item }) => {
  const stars = (stars) => {
    let componentsArr = [];
    for (let i = 0; i < stars; i++) {
      componentsArr.push(<IoIosStar key={i} style={{ color: "gold" }} />);
    }
    return <div style={{ display: "flex" }}>{componentsArr}</div>;
  };

  return (
    <div className="searchItem ">
      <img alt="" className="siImg" />
      <div className="siDesc">
        <div className="siTitle">
          <h2>{item.name} </h2>
        </div>
        {stars(item.numberOfStars)}
        <div style={{ display: "flex" }}>
          <span className="siSubtitle">
            {item.city}, {item.country}
          </span>
          <span className="siDistance">{item.distance}m from center</span>
        </div>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>{item.numberOfReviewers} reviews</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">{item.cheapestPrice} $</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="BookingItemCheckButton">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BookingItem;
