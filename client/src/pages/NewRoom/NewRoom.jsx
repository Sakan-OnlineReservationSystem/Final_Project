import React from "react";
import "./NewRoom.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
const NewProperty = () => {
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="NewPropertyMainContainer">
        <div className="NewPropertyInputContainer">
          <h2>Add Room</h2>
          <div className="LineBreak"></div>
          <div className="InputHolders">
            <p>Title</p>
            <input placeholder="Name" type="text" />
          </div>
          <div className="InputHolders">
            <p>Price</p>
            <input placeholder="5000" type="number" />
          </div>
          <div className="InputHolders">
            <p># People</p>
            <input placeholder="3" type="number" />
          </div>
          <div className="InputHolders">
            <p>Description</p>
            <textarea rows={2} placeholder="Great room" />
          </div>
          <div className="InputHolders">
            <p>Adults</p>
            <input placeholder="2" type="number" />
          </div>
          <div className="InputHolders">
            <p>Children</p>
            <input placeholder="2" type="number" />
          </div>
          <div className="roomFacilities">
            <p>roomFacilities</p>
            <label>Wifi</label>
            <input id="WiFi" type="checkbox" name="WiFi" />
          </div>

          <div className="LineBreak"></div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProperty;
