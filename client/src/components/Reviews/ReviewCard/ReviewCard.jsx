import { Rating } from "react-simple-star-rating";
import "./ReviewCard.css";
import axios from "axios";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_URL;
const Review_URL = `${apiUrl}/api/reviews/`;

const Review = ({
  setReload,
  review,
  hotelId,
  user,
  reviewee,
  _id,
  newReview,
  rating,
}) => {
  const [editNewReview, setEditNewReview] = useState(newReview);
  const [editRequest, setEditRequest] = useState(editNewReview);
  const [editReview, setEditReview] = useState(review);
  const [editRating, setEditRating] = useState(rating);
  const [ReReview, setReReview] = useState(false);

  // Catch Rating value
  const handleRating = (rate) => {
    setEditRating(rate);
  };
  localStorage.setItem("ReReview", JSON.stringify(ReReview));
  useEffect(() => {
    localStorage.setItem("ReReview", JSON.stringify(ReReview));
    setReReview(false);
  }, [ReReview]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleReviewSubmit();
    }
  };

  const handleReviewSubmit = async () => {
    let review_data = {
      rating: editRating,
      review: editReview,
      reviewee: user._id,
      hotelId: hotelId,
    };
    const token = localStorage.getItem("user-token");

    try {
      await axios.post(Review_URL, review_data, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      setEditRequest(false);
      setEditNewReview(false);
      setReload(true);
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <div className="review-card-container">
      <div className="review-card-details">
        {editRequest && !review ? (
          <TextareaAutosize
            placeholder="Write your review ... !"
            onKeyDown={handleKeyDown}
            minRows={2}
            value={editReview}
            onChange={(e) => {
              setEditReview(e.target.value);
            }}
          />
        ) : (
          <div className="flex">
            <span className="  text-6xl">‟</span>
            <p>{editReview}</p>
            <span className=" text-6xl">„</span>
          </div>
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
        {reviewee ? (
          <h1 className="reviewee">{reviewee.username || user.username}</h1>
        ) : (
          <h1 className="reviewee">Guest</h1>
        )}

        {editRequest && (
          <button
            className="ActionBtn p-3 w-64 rounded-lg font-bold"
            onClick={handleReviewSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Review;
