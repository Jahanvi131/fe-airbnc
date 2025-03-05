import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../src/contexts/UserContext";
import NoPropertyFound from "../components/features/NoPropertyFound";
import { fetchBookingByUserId } from "../services/api";
import UserBookedPropertyCard from "../components/features/Bookings/UserBookedPropertyCard";
import LoadingCircle from "../components/common/LoadingCircle";
const Trips = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    if (user?.user) {
      setUserId(user.user.user_id);
      getuserBookings();
    }
  }, []);

  const removeBookings = (booking_id) => {
    setBookings((prevbookings) =>
      prevbookings.filter((b) => b.booking_id !== booking_id)
    );
  };
  const getuserBookings = async () => {
    try {
      setIsLoading(true);
      const response = await fetchBookingByUserId(user?.user.user_id);
      if (response.success) {
        setBookings(response.data.bookings);
        setError("");
      } else {
        switch (response.status) {
          case 404:
            setError("No bookings were found");
            break;
          case 400:
            setError("Bad request");
            break;
          case 500:
            setError("Server error occurred. Please try again later");
            break;
          default:
            setError("An error occurred while fetching bookings");
        }
        setBookings([]);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {error && <p className="error">{error}</p>}
      {isLoading && <LoadingCircle />}
      <h1 className="title">Trips</h1>
      {bookings.length === 0 && <NoPropertyFound pageName={"trips"} />}
      <ul className="property-grid">
        {bookings.map((booking) => {
          return (
            <UserBookedPropertyCard
              key={booking.booking_id}
              booking={booking}
              userId={userId}
              onDelete={removeBookings}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Trips;
