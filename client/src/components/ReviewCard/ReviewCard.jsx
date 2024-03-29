import { Rating } from "react-simple-star-rating";
import "./ReviewCard.css";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";

const Review_URL = "https://sakan-api.onrender.com/api/reviews/";

const Review = ({
  deleteCard,
  review,
  hotelId,
  user,
  reviewee,
  _id,
  newReview,
  rating,
  edit,
}) => {
  const [editNewReview, setEditNewReview] = useState(newReview);
  const [editRequest, setEditRequest] = useState(editNewReview);
  const [editReview, setEditReview] = useState(review);
  const [editRating, setEditRating] = useState(rating);

  const HandelEdit = () => {
    setEditRequest(!editRequest);
  };
  // Catch Rating value
  const handleRating = (rate) => {
    setEditRating(rate);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      editNewReview ? handleReviewSubmit() : SubmitEdit();
    }
  };

  const handleReviewSubmit = async () => {
    let review_data = {
      rating: editRating,
      review: editReview,
      reviewee: user._id,
      hotelId: hotelId,
    };
    try {
      const response = await axios.post(Review_URL, review_data);
      setEditRequest(false);
      setEditNewReview(false);
      console.log(JSON.stringify(response?.data));
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else {
        toast.error(err.response.data.message);
      }
    }
  };

  const SubmitEdit = async () => {
    setEditRequest(false);
    axios({
      method: "patch",
      url: "https://sakan-api.onrender.com/api/reviews/" + _id,
      data: {
        rating: editRating,
        review: editReview,
        reviewee: user._id,
        hotelId: hotelId,
      },
    })
      .then((response) => {
        setEditRequest(false);
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
      url: "https://sakan-api.onrender.com/api/reviews/" + _id,
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
            placeholder="Write your review ... !"
            onKeyDown={handleKeyDown}
            minRows={2}
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
        <h1 className="reviewee">{reviewee.username || user.username}</h1>
        {editRequest && (
          <button
            onClick={editNewReview ? handleReviewSubmit : SubmitEdit}
            style={{ width: "70%" }}
          >
            <span>submit</span>
          </button>
        )}
      </div>

      <div className="user-edit">
        {edit && <FaRegEdit onClick={HandelEdit} className="edit" />}
        {deleteCard && <MdDelete onClick={HandelDelete} className="delete" />}
      </div>
    </div>
  );
};

export default Review;
