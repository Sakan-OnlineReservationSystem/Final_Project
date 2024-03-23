import { Rating } from "react-simple-star-rating";
import "./ReviewCard.css";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import axios from "axios";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
const Review = ({ deleteCard, review, hotelId, reviewee, rating, edit }) => {
  const [editRequest, setEditRequest] = useState(false);
  const [editReview, setEditReview] = useState(review);
  const [editRating, setEditRating] = useState(rating);

  const HandelEdit = () => {
    setEditRequest(!editRequest);
    console.log("edit");
  };
  // Catch Rating value
  const handleRating = (rate) => {
    setEditRating(rate);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      SubmitEdit();
    }
  };

  const SubmitEdit = async () => {
    setEditRequest(false);
    axios({
      method: "patch",
      url: "https://sakan-api.onrender.com/api/reviews/" + hotelId,
      data: {
        key: "value",
      },
      headers: {
        Authorization: "Bearer token",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error posting data: ", error);
      });
  };
  const HandelDelete = async () => {
    console.log("delete");
    axios({
      method: "delete",
      url: "https://sakan-api.onrender.com/api/reviews/" + hotelId,
      headers: {
        Authorization: "Bearer token",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error posting data: ", error);
      });
  };
  return (
    <div className="review-card-container">
      <div className="review-card-details">
        {editRequest ? (
          <TextareaAutosize
            onKeyDown={handleKeyDown}
            minRows={1}
            value={editReview}
            onChange={(e) => {
              console.log(editReview);
              setEditReview(e.target.value);
            }}
          />
        ) : (
          <p>{editReview}</p>
        )}

        <div className="rating-container">
          <Rating
            onKeyDown={handleKeyDown}
            onClick={handleRating}
            className="rating"
            style={!editRequest && { pointerEvents: "none" }}
            initialValue={editRating}
            allowFraction
            readOnly
            size={20}
          />
        </div>
        <h1 className="reviewee">{reviewee.username}</h1>
      </div>

      <div className="user-edit">
        {edit && <FaRegEdit onClick={HandelEdit} className="edit" />}
        {deleteCard && <MdDelete onClick={HandelDelete} className="delete" />}
        {editRequest && <GiCheckMark onClick={SubmitEdit} className="check" />}
      </div>
    </div>
  );
};

export default Review;
