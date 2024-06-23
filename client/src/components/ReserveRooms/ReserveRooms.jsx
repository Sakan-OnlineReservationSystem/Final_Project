import "./ReserveRooms.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import AppLoader from "../Loading/AppLoader";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { format } from "date-fns";

const ReserveRooms = ({ setOpen, hotelId }) => {
  const { dates } = useContext(SearchContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const user = useContext(AuthContext);

  // Default dates if not provided
  const defaultStartDate = new Date();
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 1); // default to next day

  const startDate = dates[0]?.startDate || defaultStartDate;
  const endDate = dates[0]?.endDate || defaultEndDate;
  const range = {
    from: format(startDate, "MM-dd-yyyy"),
    to: format(endDate, "MM-dd-yyyy"),
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(""); // Reset error state
      // Default dates if not provided
      const defaultStartDate = new Date();
      const defaultEndDate = new Date();
      defaultEndDate.setDate(defaultEndDate.getDate() + 1); // default to next day

      const startDate = dates[0]?.startDate || defaultStartDate;
      const endDate = dates[0]?.endDate || defaultEndDate;
      const range = {
        from: format(startDate, "MM-dd-yyyy"),
        to: format(endDate, "MM-dd-yyyy"),
      };

      const params = new URLSearchParams(range).toString();
      const token = localStorage.getItem("user-token");

      try {
        const response = await axios.get(
          `/api/hotels/available/${hotelId}?${params}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (err) {
        if (!err?.response) {
          setError("No Server Response");
        } else {
          setError(err.response.data.message);
        }
      }
      setLoading(false);
    }
    if (hotelId) fetchData();
  }, [hotelId, dates]);

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleReserve = async () => {
    const body = {
      room: selectedRooms[0],
      user: user.user.user._id,
      hotel: hotelId,
      from: range.from,
      to: range.to,
    };
    console.log(body);
    try {
      const response = await axios.post("/api/booking", body, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });
      console.log("Reservation successful:", response.data);
      // handle successful reservation
    } catch (err) {
      setError("Error making reservation");
    }
  };

  if (error) console.log(error);

  return (
    <div className="reserve">
      {loading ? (
        <AppLoader />
      ) : (
        <div className="rContainer">
          <FontAwesomeIcon
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              height: "30px",
              color: "darkgrey",
            }}
            icon={faCircleXmark}
            className="rClose"
            onClick={() => setOpen(false)}
          />
          <span>Select your rooms:</span>
          {data.map((item) => (
            <div className="rItem tooltip" key={item.room._id}>
              <span className="tooltiptext">
                Room Facilities
                <div className=" grid  grid-cols-2 ">
                  {item.room.roomFacilities.map((item, index) => {
                    return <div key={index}>{item}</div>;
                  })}
                </div>
              </span>
              <div className="rItemInfo">
                <div className="rTitle">{item.room.type}</div>
                <div className="rDesc">Best room for 2 people</div>
                <div className="rPrice">
                  Max people: <b>{item.room.maxPeople}</b>
                </div>
                <div className="rPrice">
                  Price: <b>{item.room.price}</b>
                </div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room" key={roomNumber._id}>
                    <label>{roomNumber.roomNumber}</label>
                    <input
                      onChange={handleSelect}
                      type="checkbox"
                      value={roomNumber.roomId}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className="rButton ActionBtn" onClick={handleReserve}>
            Reserve Now!
          </button>
        </div>
      )}
    </div>
  );
};

export default ReserveRooms;
