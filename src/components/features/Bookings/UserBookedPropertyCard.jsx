import { useState } from "react";
import { Link } from "react-router-dom";
import { checkDateStatus } from "../../../utils/datehelper";
import { deleteBookingById, createReviews } from "../../../services/api";
import ReviewDialog from "../Reviews/ReviewDialog";

const UserBookedPropertyCard = ({ booking, userId, onDelete }) => {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
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
  const handleCancelBooking = async (booking_id) => {
    try {
      setLoading(true);
      const response = await deleteBookingById(booking_id);
      if (response.status === 200) {
        setErrorMsg("");
        onDelete(booking_id);
      } else {
        switch (response.status) {
          case 404:
            setErrorMsg("No booking found");
            break;
          case 400:
            setErrorMsg("Bad request");
            break;
          case 500:
            setErrorMsg("Server error occurred. Please try again later");
            break;
          default:
            setErrorMsg("An error occurred while deleting booking");
        }
      }
    } finally {
      setLoading(false);
    }
  };
  const showSuccessMsg = (message) => {
    setSuccessMsg(message);

    setTimeout(() => {
      setSuccessMsg("");
    }, 5000); //5 sec
  };
  const handleReviewSubmit = async (reviewData) => {
    try {
      setIsLoading(true);
      const response = await createReviews(booking.property_id, {
        ...reviewData,
        guest_id: userId,
      });
      if (response.status === 200) {
        setError("");
        showSuccessMsg("review posted successfully");
      } else {
        switch (response.status) {
          case 400:
            setError("Bad request");
            break;
          case 500:
            setError("Server error occurred. Please try again later");
            break;
          default:
            setError("An error occurred while posting reviews");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <li>
        <div className="image-container">
          <Link
            to={{
              pathname: `/property/${booking.property_id}`,
              search: `?user_id=${userId}`,
            }}
          >
            <img src={booking.image} alt={booking.property_name} />
          </Link>
        </div>
        <div className="property-info">
          <p className="bookedProp">{booking.property_name}</p>
          <p className="bookingDate">
            {new Date(booking.check_in_date).getDate()} -{" "}
            {new Date(booking.check_out_date).getDate()}{" "}
            {months[new Date(booking.check_in_date).getMonth()]}
          </p>
          <p className="host">hosted by {booking.host}</p>
          {errorMsg && <p className="error">{errorMsg}</p>}
          {loading && <span>Removing...</span>}
          {checkDateStatus(booking.check_out_date) !== "past" && (
            <Link
              onClick={() => {
                handleCancelBooking(booking.booking_id);
              }}
              className="linkCancel"
            >
              cancel booking
            </Link>
          )}
          {checkDateStatus(booking.check_out_date) === "past" && (
            <p className="reviewlinktext">
              Haven't posted a review?{" "}
              <Link
                className="linkReview"
                onClick={() => setIsReviewDialogOpen(true)}
              >
                post review
              </Link>
              {error && <p className="error">{error}</p>}
              {isLoading && <span>Posting...</span>}
              {successMsg && <p className="success">{successMsg}</p>}
            </p>
          )}

          <ReviewDialog
            isOpen={isReviewDialogOpen}
            onClose={() => setIsReviewDialogOpen(false)}
            onSubmit={handleReviewSubmit}
            propertyName={booking.property_name}
          />
        </div>
      </li>
    </>
  );
};

export default UserBookedPropertyCard;
