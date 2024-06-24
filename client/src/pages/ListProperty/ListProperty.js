import React, { useContext, useEffect, useState } from "react";
import "./ListProperty.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import NotFound from "../../components/NotFound/NotFound.jsx";
import { Link } from "react-router-dom";
import NewHotel from "../../components/NewHotel/NewHotel";
import { AuthContext } from "../../context/AuthContext.js";
import axios from "axios";
import { toast } from "react-toastify";

const ListProperty = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (user) {
      axios
        .get(`/api/hotels/ownerHotels/${user.user._id}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="ListPropertyPageContainer">
        <div className="ListPropertyContainer">
          <div className="innerContainer">
            {data && data.length !== 0 ? <NewHotel /> : <NotFound />}
            <Link
              to="/ListProperty/NewProperty"
              className="ListPropertyButtonContainer RouterBtn"
            >
              <button>Add New Property</button>
            </Link>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default ListProperty;
