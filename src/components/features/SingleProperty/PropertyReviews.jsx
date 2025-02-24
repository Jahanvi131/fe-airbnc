import StarRating from "../../common/StarRating";
import { deleteReviewById } from "../../../services/api";
import { useState, useEffect } from "react";
import deleteicon from "../../../assets/delete-icon.svg";

const PropertyReviews = ({ propreviews, rating, loggedinuser }) => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [reviews, setReviews] = useState(propreviews);
  console.log(reviews);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    setReviews(propreviews || []);
  }, [propreviews]);
  const handleDelete = async (review_id) => {
    try {
      const originalReviews = [...reviews];
      const removedReview = reviews.filter((r) => r.review_id !== review_id);
      setReviews(removedReview);
      const response = await deleteReviewById(review_id);
      if (response.status === 200) {
        setSuccessMsg("removed");
        setErrorMsg("");
      } else {
        setReviews(originalReviews);
        switch (response.status) {
          case 404:
            setErrorMsg("No reviews were found");
            break;
          case 400:
            setErrorMsg("Bad request");
            break;
          case 500:
            setErrorMsg("Server error occurred. Please try again later");
            break;
          default:
            setErrorMsg("An error occurred while deleteing reviews");
        }
        setSuccessMsg("");
      }
    } finally {
    }
  };
  return (
    <div className="review-container">
      <h3>Reviews</h3>
      {reviews.length === 0 && <div>no reviews yet</div>}
      {reviews.map((review) => {
        return (
          <div className="review-item" key={review.review_id}>
            <img
              src={review.guest_avatar}
              alt="Sam"
              className="reviewer-avatar"
            />
            <div className="review-content">
              <h4 className="reviewer-name">{review.guest}</h4>
              <div className="review-meta">
                <StarRating rating={rating} />
                <span className="review-date">
                  {months[new Date(review.created_at).getMonth()]}{" "}
                  {new Date(review.created_at).getFullYear()}
                </span>
              </div>
              <p className="review-text">{review.comment}</p>
              {loggedinuser &&
                review?.guest_id &&
                parseInt(loggedinuser) === review.guest_id && (
                  <a
                    onClick={() => {
                      handleDelete(review.review_id);
                    }}
                  >
                    <img
                      className="remove-review"
                      src={deleteicon}
                      alt="delete"
                    />
                  </a>
                )}
              {errorMsg && <p className="error">{errorMsg}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropertyReviews;
