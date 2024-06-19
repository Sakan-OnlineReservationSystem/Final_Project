import React, { useEffect } from "react";
import "./NewRoom.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const NewRoom = () => {
  const [chosenRoomFacilities, setChosenRoomFacilities] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [adult, setAdult] = useState("");
  const [child, setChild] = useState("");
  const [description, setDescription] = useState("");

  const RoomFacilities = [
    "Private pool",
    "Private bathroom",
    "Air conditioning",
    "Balcony",
    "Kitchen/Kitchenette",
    "Shower",
    "Terrace",
    "Refrigerator",
    "Hot tub",
    "TV",
    "Toilet",
    "Pool with a view",
    "Board games/puzzles",
    "Towels",
    "View",
    "Toilet paper",
    "Entire unit located on ground floor",
    "Infinity Pool",
    "Garden view",
    "Pool cover",
    "Heating",
    "Patio",
    "Coffee/Tea maker",
    "High chair",
    "Fax",
  ];

  const handleChecked = (event) => {
    if (event.target.checked)
      setChosenRoomFacilities([...chosenRoomFacilities, event.target.id]);
    else
      setChosenRoomFacilities(
        chosenRoomFacilities.filter((obj) => obj !== event.target.id)
      );
  };

  useEffect(() => {
    console.log("title: ", title);
    console.log("price: ", price);
    console.log("adult: ", adult);
    console.log("child: ", child);
    console.log("Desc: ", description);
    console.log(chosenRoomFacilities);
  }, [title, adult, child, price, description, chosenRoomFacilities]);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="NewRoomMainContainer">
        <div className="NewRoomInputContainer">
          <h2>Add Room Details</h2>
          <div className="LineBreak"></div>
          <div className="RoomInputHoldersHolder">
            <div className="RoomInputHolders">
              <p>Type</p>
              <input
                placeholder="Name"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="RoomInputHolders">
              <p>Price</p>
              <input
                placeholder="5000"
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="RoomInputHoldersHolder">
            <div className="RoomInputHolders">
              <p>Adults</p>
              <input
                placeholder="2"
                type="number"
                value={adult}
                onChange={(e) => {
                  setAdult(e.target.value);
                }}
              />
            </div>
            <div className="RoomInputHolders">
              <p>Children</p>
              <input
                placeholder="2"
                type="number"
                value={child}
                onChange={(e) => {
                  setChild(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="RoomInputHolders">
            <p>Description</p>
            <TextareaAutosize
              minRows={1}
              placeholder="Great room"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <div className="roomFacilities">
            <p>roomFacilities</p>
            <div className="LineBreak"></div>
            <div className="RoomFacilitiesContainer">
              {RoomFacilities.map((facility, index) => {
                return (
                  <div key={index} className="RoomFacilityItem">
                    <input
                      id={facility}
                      type="checkbox"
                      className="RoomFacilityCheckbox"
                      onChange={handleChecked}
                    ></input>
                    <p className="RoomFacilityLabel">{facility}</p>
                  </div>
                );
              })}
            </div>
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

export default NewRoom;
