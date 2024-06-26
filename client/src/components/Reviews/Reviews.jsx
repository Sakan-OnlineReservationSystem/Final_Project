import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import Review from "./ReviewCard/ReviewCard";
import { toast } from "react-toastify";
import "./Reviews.css";
const apiUrl = process.env.REACT_APP_API_URL;
const Reviews = ({ _id, setReload, reload }) => {
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    if (_id) {
      const fetchData = async () => {
        const token = localStorage.getItem("user-token");
        try {
          const response = await axios.get(`${apiUrl}/api/reviews/` + _id, {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          });
          setReviewsData(response.data);
        } catch (err) {
          if (!err?.response) {
            toast.error("No Server Response");
          } else {
            toast.error(err.response.data.message);
          }
        }
      };

      fetchData();
      setReload(false);
    }
  }, [_id, reload, setReload]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(reviewsData.reviews);
  }, [reviewsData]);

  return (
    <div className="reviews-container">
      <br />
      <div className="break"></div>
      <br />
      <h1 className="reviews-header">Customer reviews </h1>
      <div className="total-rating">
        <Rating
          className="rating"
          style={{ pointerEvents: "none" }}
          initialValue={reviewsData.hotelRating}
          allowFraction
          readOnly
          size={50}
        />
        <p>{reviewsData.hotelRating} out of 5</p>
      </div>
      <p className="customers-number">
        {reviewsData.numberOfReviewers} Customer ratings
      </p>
      <br />

      {reviews &&
        reviews.map((review_data) => {
          return (
            <Review key={review_data._id} {...review_data} newReview={false} />
          );
        })}
    </div>
  );
};

export default Reviews;
