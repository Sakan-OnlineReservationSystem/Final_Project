import "./ReserveRooms.css";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { format } from "date-fns";

const ReserveRooms = ({ setOpen, hotelId }) => {
  const { dates } = useContext(SearchContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(""); // Reset error state
      const range = {
        from: format(dates[0].startDate, "MM-dd-yyyy"),
        to: format(dates[0].endDate, "MM-dd-yyyy"),
      };
      console.log(range);
      const params = new URLSearchParams(range).toString();

      try {
        const response = await axios.get(
          `/api/hotels/available/${hotelId}?${params}`
        );
        setData(response.data);
        console.log(response.data);
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

  return (
    <div className="reserve">
      <p>Hello in reserve</p>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {/* Render the data here */}
          {data.length > 0 ? (
            data.map((room, index) => (
              <div key={index}>
                <p>{room.name}</p>
                {/* Add more room details as needed */}
              </div>
            ))
          ) : (
            <p>No rooms available</p>
          )}
        </div>
      )}
      <button
        onClick={() => {
          setOpen(false);
        }}
      >
        Click
      </button>
    </div>
  );
};

export default ReserveRooms;
