import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import Review from "./ReviewCard/ReviewCard";
import { toast } from "react-toastify";
import "./Reviews.css";
const apiUrl = process.env.REACT_APP_API_URL;
const Reviews = ({ _id, rating, numberOfReviewers }) => {
  const [reviewsData, setReviewsData] = useState([]);
  const [localStorageValue, setLocalStorageValue] = useState(
    localStorage.getItem("ReReview")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setLocalStorageValue(localStorage.getItem("ReReview"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (_id && localStorageValue) {
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
    }
  }, [_id, localStorageValue]);

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
          initialValue={rating}
          allowFraction
          readOnly
          size={50}
        />
        <p>{rating} out of 5</p>
      </div>
      <p className="customers-number">{numberOfReviewers} Customer ratings</p>
      <br />

      {reviewsData.map((review_data) => {
        return (
          <Review key={review_data._id} {...review_data} newReview={false} />
        );
      })}
    </div>
  );
};

export default Reviews;
