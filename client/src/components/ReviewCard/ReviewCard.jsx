import { Rating } from "react-simple-star-rating";
import "./ReviewCard.css";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
const Review = ({ deleteCard, review, reviewee, rating, edit }) => {
  return (
    <div className="review-card-container">
      <div className="review-card-details">
        <p>{review}</p>
        <div className="rating-container">
          <Rating
            className="rating"
            style={{ pointerEvents: "none" }}
            initialValue={rating}
            allowFraction
            readOnly
            size={20}
          />
        </div>
        <h1 className="reviewee">{reviewee.username}</h1>
      </div>

      <div className="user-edit">
        {edit && <FaRegEdit className="edit" />}
        {deleteCard && <MdDelete className="delete" />}
      </div>
    </div>
  );
};

export default Review;
