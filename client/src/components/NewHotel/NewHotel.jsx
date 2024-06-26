import React from "react";
import { Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import "./NewHotel.css";
import { toast } from "react-toastify";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const NewHotel = ({ hotel }) => {
  const stars = (stars) => {
    let componentsArr = [];
    for (let i = 0; i < stars; i++) {
      componentsArr.push(<IoIosStar key={i} style={{ color: "gold" }} />);
    }
    return <div style={{ display: "flex" }}>{componentsArr}</div>;
  };
  const deleteHotel = async (hotelId) => {
    try {
      await axios.delete(`${apiUrl}/api/hotels/${hotelId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });
      toast.success("Hotel deleted successfully");
      window.location.reload();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to Delete Hotel";
      toast.error(errorMessage);
    }
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
          <button className="siCheckButton ApproveBtn RemoveHotel">
            Add Rooms
          </button>
        </Link>
        <button
          onClick={() => deleteHotel(hotel._id)}
          className="siCheckButton CancelBtn RemoveHotel"
        >
          Remove Hotel
        </button>
      </div>
    </div>
  );
};

export default NewHotel;
