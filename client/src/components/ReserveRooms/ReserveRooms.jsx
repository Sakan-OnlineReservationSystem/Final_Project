import "./ReserveRooms.css";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { format } from "date-fns";

const ReserveRooms = ({ setOpen, hotelId }) => {
  const { dates } = useContext(SearchContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const range = {
        from: format(dates[0].startDate, "MM-dd-yyyy"),
        to: format(dates[0].endDate, "MM-dd-yyyy"),
      };
      console.log(range);
      // Convert the range object to query parameters
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
  }, [hotelId, dates]); // Removed `data` from the dependency array

  return (
    <div className="reserve">
      <p>Hello in reserve</p>
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
