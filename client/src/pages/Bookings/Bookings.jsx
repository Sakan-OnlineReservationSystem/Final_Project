import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
const Bookings = ()=>{

    return(
    <div>
    <Navbar />
      <Header type="list" />
      <div className="ListPropertyContainer">
        <div className="innerContainer">
          <h1>Hello in Bookings</h1>
        </div>
      </div>
      <MailList />
      <Footer />
        </div>
    )
}

export default Bookings ;
