import React from "react";
import "./ListProperty.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import NotFound from "../../components/NotFound/NotFound.jsx";
import { Link } from "react-router-dom";
const ListProperty = () => {
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="ListPropertyPageContainer">
        <div className="ListPropertyContainer">
          <div className="innerContainer">
            <NotFound />
            <Link
              to="/ListProperty/NewProperty/NewRoom"
              className="ListPropertyButtonContainer RouterBtn"
            >
              <button>Add your first Property</button>
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
