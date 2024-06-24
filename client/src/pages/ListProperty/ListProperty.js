import React from "react";
import "./ListProperty.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import NotFound from "../../components/NotFound/NotFound.jsx";
import { Link } from "react-router-dom";
import NewHotel from "../../components/NewHotel/NewHotel";

const ListProperty = () => {
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="ListPropertyPageContainer">
        <div className="ListPropertyContainer">
          <div className="innerContainer">
            <NewHotel />
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
