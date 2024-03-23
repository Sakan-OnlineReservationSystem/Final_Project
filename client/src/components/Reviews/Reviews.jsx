import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import Review from "../ReviewCard/ReviewCard";
import "./Reviews.css";

const Reviews = (props) => {
  const [totalReviews, setTotalReviews] = useState(4);
  const [customersNumber, setCustomersNumber] = useState(40);
  const [reviewsData, setReviewsData] = useState([
    {
      _id: "65febb21874307509f9eeeaa",
      review:
        "it is one of the best hotel i have visited it is one of the best hotel i have visited it is one of the best hotel i have visited ",
      rating: 5,
      reviewee: {
        _id: "65d158d2638f8b6a9aaa2e94",
        username: "Hassan Ali",
      },
      hotelId: "65df9e90d1edf62697139baf",
      crearedAt: "2024-03-23T11:21:05.298Z",
      __v: 0,
    },
    {
      _id: "65febbx21874307509f9eeeaa",
      review: "it is one of the best hotel i have visited ",
      rating: 5,
      reviewee: {
        _id: "65d158d263x8f8b6a9aaa2e94",
        username: "Hassan Ali",
      },
      hotelId: "65df9e9x0d1edf62697139baf",
      crearedAt: "2024-03-23T11:21:05.298Z",
      __v: 0,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sakan-api.onrender.com/api/reviews/65df9e90d1edf62697139baf"
        );
        setReviewsData(response);
        console(response);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="reviews-container">
      <div className="break"></div>
      <br />
      <h1 className="reviews-header">Customer reviews </h1>
      <div className="total-rating">
        <Rating
          className="rating"
          style={{ pointerEvents: "none" }}
          initialValue={4}
          allowFraction
          readOnly
          size={50}
        />
        <p>{totalReviews} out of 5</p>
      </div>
      <p className="customers-number">{customersNumber} Customer ratings</p>
      <br />
      {reviewsData.map((review_data) => {
        return (
          <Review
            key={review_data._id}
            {...review_data}
            deleteCard={false}
            edit={false}
          />
        );
      })}
    </div>
  );
};

export default Reviews;
