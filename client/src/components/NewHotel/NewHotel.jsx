import React from "react";
import { Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import "./NewHotel.css";
const NewHotel = ({ hotel }) => {
  const stars = (stars) => {
    let componentsArr = [];
    for (let i = 0; i < stars; i++) {
      componentsArr.push(<IoIosStar key={i} style={{ color: "gold" }} />);
    }
    return <div style={{ display: "flex" }}>{componentsArr}</div>;
  };
  return (
    <div className="searchItem">
      <img src={hotel.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <Link to={`/hotels/${hotel._id}`}>
          <div className="siTitle">
            <h2>{hotel.name} </h2>
          </div>
        </Link>
        {stars(hotel.numberOfStars)}
        <div style={{ display: "flex" }}>
          <span className="siSubtitle">
            {hotel.city}, {hotel.country}
          </span>
        </div>
        <span className="siFeatures">{hotel.address}</span>
        <span className="siFeatures">{hotel.desc}</span>
      </div>
      <div className="siDetails NewHotelDetails">
        <span className="NewHotelType ">{hotel.type} </span>

        <Link to={`/ListProperty/NewProperty/NewRoom/${hotel._id}`}>
          <button className="siCheckButton AddHotelRoom">Add Rooms</button>
        </Link>
        <button className="siCheckButton RemoveHotel">Remove Hotel</button>
      </div>
    </div>
  );
};

export default NewHotel;