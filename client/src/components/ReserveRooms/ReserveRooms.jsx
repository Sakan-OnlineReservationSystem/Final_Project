import "./ReserveRooms.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import AppLoader from "../Loading/AppLoader";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import NotFound from "../NotFound/NotFound";
const apiUrl = process.env.REACT_APP_API_URL;
const ReserveRooms = ({ setOpen, hotelId }) => {
  const { dates } = useContext(SearchContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const user = useContext(AuthContext);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
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
          `${apiUrl}/api/hotels/available/${hotelId}?${params}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (err) {
        toast.error(err.response.data.message);
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

  const handleReserve = async () => {
    const body = {
      roomNumber: selectedRooms[0],
      user: user.user.user._id,
      hotel: hotelId,
      from: range.from,
      to: range.to,
    };
    let ReserveId = toast.loading("Validating Reservation details...");
    try {
      await axios.post(`${apiUrl}/api/booking`, body, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });
      // handle successful reservation

      toast.update(ReserveId, {
        render: "Room Reservation was successful",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setOpen(false);
    } catch (err) {
      toast.update(ReserveId, {
        render: err.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="reserve z-50 ">
      {loading ? (
        <AppLoader />
      ) : (
        <div className="rContainer content-center">
          <div className=" sticky top-1 flex justify-end">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="rClose"
              onClick={() => setOpen(false)}
            />
          </div>
          {data && data.length !== 0 ? (
            <>
              {" "}
              <div className=" p-8">
                <span>Select your rooms:</span>
                {data.map((item) => (
                  <div className="rItem h-fit tooltip" key={item.room._id}>
                    <span className="tooltiptext">
                      Room Facilities
                      <div className=" grid   grid-cols-4 ">
                        {item.room.roomFacilities.map((item, index) => {
                          return <div key={index}>{item}</div>;
                        })}
                      </div>
                    </span>
                    <div className="rItemInfo">
                      <div className="rTitle">
                        {item.room.type || item.room.title}
                      </div>
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
                            value={roomNumber._id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  className="rButton ActionBtn h-fit"
                  onClick={handleReserve}
                >
                  Reserve Now!
                </button>
              </div>
            </>
          ) : (
            <NotFound />
          )}
        </div>
      )}
    </div>
  );
};

export default ReserveRooms;
