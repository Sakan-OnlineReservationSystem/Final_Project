import React from "react";
import "./NewRoom.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
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
  const location = useLocation();
  const navigate = useNavigate();
  const HotelId = location.pathname.split("/")[4];
  const handleChecked = (event) => {
    if (event.target.checked)
      setChosenRoomFacilities([...chosenRoomFacilities, event.target.id]);
    else
      setChosenRoomFacilities(
        chosenRoomFacilities.filter((obj) => obj !== event.target.id)
      );
  };

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      RoomNumber: [{ Number: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "RoomNumber",
    control,
  });

  const Rooms = useWatch({
    control,
    name: "RoomNumber",
  });
  const onSubmit = async () => {
    const roomData = {
      room: {
        title: title,
        price: Number(price),
        maxPeople: Number(adult + child),
        desc: description,
        adults: Number(adult),
        children: Number(child),
        roomFacilities: chosenRoomFacilities,
      },
      roomNumbers: Rooms.map((room) => Number(room.Number)),
    };
    let id = toast.loading("Validating your Rooms details...");
    try {
      await axios.post(`${apiUrl}/api/rooms/${HotelId}`, roomData, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });
      // handle successful reservation
      toast.update(id, {
        render: "Rooms created successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate(`/ListProperty`);
    } catch (err) {
      toast.update(id, {
        render: err.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

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
                placeholder="Twin Deluxe Room with View"
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
          <div className="RoomInputHolders">
            <p>Rooms Numbers</p>
          </div>
          <div className="NewRoomNumbersHolder">
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <input
                    className="NewRoomNumberInput"
                    type="number"
                    {...register(`RoomNumber.${index}.Number`)}
                  />
                  <button
                    className="RemoveBtn"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    x
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              className="NewRoomNumberInput NewRoomNumberAppend"
              onClick={() => {
                append({
                  Number: 0,
                });
              }}
            >
              +
            </button>
          </div>
          <div className="LineBreak"></div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className="NewRoomSubmit RouterBtn"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
