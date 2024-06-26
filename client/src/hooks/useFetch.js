import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const useFetch = (rec) => {
  let url = rec;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token =
        localStorage.getItem("user-token") != null
          ? localStorage.getItem("user-token")
          : null;
      setLoading(true);
      try {
        const res = await axios.get(`${apiUrl}` + url, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const token =
        localStorage.getItem("user-token") != null
          ? localStorage.getItem("user-token")
          : null;
      const res = await axios.get(`${apiUrl}` + url, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
