import { IoIosStar } from "react-icons/io";
import "./BookingItem.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Payment from "../Payment/Payment";
const BookingItem = ({ item }) => {
  const stars = (stars) => {
    let componentsArr = [];
    for (let i = 0; i < stars; i++) {
      componentsArr.push(<IoIosStar key={i} style={{ color: "gold" }} />);
    }
    return <div style={{ display: "flex" }}>{componentsArr}</div>;
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`/api/booking/${itemId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });
      if (response.status === 204) {
        toast.success("Reservation cancelled successfully");
        window.location.reload();
      } else {
        toast.warn("Unexpected response from the server");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to cancel booking";
      toast.error(errorMessage);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="searchItem flex flex-col">
      <div className="flex">
        <div className="siDesc gap-0">
          <div className="siTitle">
            <h2>{item.hotel.name} </h2>
          </div>
          {stars(item.hotel.numberOfStars)}
          <div style={{ display: "flex" }}>
            <span className="siSubtitle">
              {item.hotel.city}, {item.hotel.country}
            </span>
          </div>
          <span className="siFeatures">{item.hotel.desc}</span>
          <span className="siCancelOp">Free cancellation </span>
        </div>
        <div className="siDetails">
          {item.hotel.rating && (
            <div className="siRating">
              <span>{item.hotel.numberOfReviewers} reviews</span>
              <button>{item.hotel.rating}</button>
            </div>
          )}
          <div className="siDetailTexts">
            <span className="siPrice">{item.hotel.cheapestPrice} $</span>
            <span className="siTaxOp">Includes taxes and fees</span>
          </div>
        </div>
      </div>
      <div className="flex gap-3 flex-col">
        <div className="flex justify-between">
          <div>
            <span className=" font-semibold">Room Number: </span>{" "}
            {item.roomNumber.roomNumber}
          </div>
          <div>
            <span className=" font-semibold">Amount Paid:</span>{" "}
            {item.amountPaid} $
          </div>
        </div>
        <div className="flex justify-between">
          <h2 className=" font-bold text-lg text-[var(--button-color)]">
            Reservation Period
          </h2>
          <div className="flex gap-10">
            <p>
              <span className=" font-semibold">From:</span>{" "}
              {new Date(item.from).toISOString().slice(0, 10)}
            </p>
            <p>
              <span className="font-semibold">To:</span>{" "}
              {new Date(item.to).toISOString().slice(0, 10)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={toggleModal}
          className=" BookingItemButton ApproveBtn  w-72"
        >
          Confirm
        </button>
        <button
          onClick={() => deleteItem(item._id)}
          className=" BookingItemButton CancelBtn w-72"
        >
          Cancel
        </button>
      </div>
      <Modal show={showModal} onClose={toggleModal}>
        <Payment bookingId={item._id} />
      </Modal>
    </div>
  );
};

export default BookingItem;
