import React from "react";
import "./ListProperty.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
const ListProperty = () => {
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="ListPropertyContainer">
        <div className="innerContainer">
          <h1>Hello in ListProperty</h1>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default ListProperty;
