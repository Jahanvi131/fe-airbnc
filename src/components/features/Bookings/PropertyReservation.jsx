import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Button from "../../../components/common/Button";
import "../../../components/common/button.css";
import {
  fetchBookingByPropertyId,
  createBookings,
} from "../../../services/api";
import { useNavigate } from "react-router-dom";

const PropertyReservation = ({ property_id, user_id }) => {
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectingCheckIn, setSelectingCheckIn] = useState(true);
  const [bookedDates, setBookedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // fetch booked dates from api
  useEffect(() => {
    fetchBookedDates();
  }, [property_id]);

  const fetchBookedDates = async () => {
    try {
      setIsLoading(true);
      const response = await fetchBookingByPropertyId(property_id);
      if (response.success) {
        setBookedDates(response.data.bookings);
        setError("");
      } else {
        setBookedDates([]);
        switch (response.status) {
          case 404:
            setError("No property booking details were found");
            break;
          case 400:
            setError("Bad request");
            break;
          case 500:
            setError("Server error occurred. Please try again later");
            break;
          default:
            setError("An error occurred while fetching property's booking");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isDateBooked = (date) => {
    return bookedDates.some((booking) => {
      const bookingStart = new Date(booking.check_in_date);
      const bookingEnd = new Date(booking.check_out_date);
      return date >= bookingStart && date <= bookingEnd;
    });
  };

  // disable dates that are booked or in the past
  const tileDisabled = ({ date, view }) => {
    if (view !== "month") return false;

    // disable past dates
    if (date < new Date(new Date().setHours(0, 0, 0, 0))) {
      return true;
    }

    // disable booked dates
    if (isDateBooked(date)) {
      return true;
    }

    //once we select check-in date, disable dates before check-in
    if (!selectingCheckIn && checkInDate && date < checkInDate) {
      return true;
    }

    return false;
  };

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return "";

    let classes = [];

    if (checkInDate && date.toDateString() === checkInDate.toDateString()) {
      classes.push("text-[var(--color-primary)] rounded-l");
    }

    if (checkOutDate && date.toDateString() === checkOutDate.toDateString()) {
      classes.push("text-[var(--color-primary)] rounded-r");
    }

    // Highlight the range between check-in and check-out
    if (
      checkInDate &&
      checkOutDate &&
      date > checkInDate &&
      date < checkOutDate
    ) {
      classes.push("text-yellow");
    }

    return classes.join(" ");
  };

  const handleDateClick = (date) => {
    if (selectingCheckIn) {
      setCheckInDate(date);
      setCheckOutDate(null);
      setSelectingCheckIn(false);
    } else {
      setCheckOutDate(date);
      setShowCalendar(false);
      setSelectingCheckIn(true);
    }
  };

  const handleCalendarOpen = (isCheckIn) => {
    setSelectingCheckIn(isCheckIn);
    setShowCalendar(true);
  };

  const showSuccessMsg = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg("");
    }, 5000); //5 sec
  };
  const handleCheckAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates");
      return;
    }
    try {
      const response = await createBookings(property_id, {
        guest_id: user_id,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
      });
      if (response.status === 200) {
        setErrorMsg("");
        showSuccessMsg("property reserved successfully");
      } else {
        switch (response.status) {
          case 400:
            setErrorMsg("Bad request");
            break;
          case 500:
            setErrorMsg("Server error occurred. Please try again later");
            break;
          default:
            setErrorMsg("An error occurred while reserving property");
        }
      }
    } finally {
      clearDates();
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const clearDates = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  const goToTrips = () => {
    navigate("/trips");
  };
  return (
    <>
      {error && <p className="error">{error}</p>}
      <div className="w-full max-w-md mx-auto bg-white rounded-lg p-6 h-70 relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Reserve Now</h2>
        <div className="flex border rounded-lg overflow-hidden mb-4">
          <div
            className="w-1/2 p-4 border-r cursor-pointer"
            onClick={() => handleCalendarOpen(true)}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CHECK-IN
            </label>
            <div className="text-gray-700">
              {checkInDate ? (
                formatDate(checkInDate)
              ) : (
                <span className="text-gray-500">Add date</span>
              )}
            </div>
          </div>
          <div
            className="w-1/2 p-4 cursor-pointer"
            onClick={() => handleCalendarOpen(false)}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CHECKOUT
            </label>
            <div className="text-gray-700">
              {checkOutDate ? (
                formatDate(checkOutDate)
              ) : (
                <span className="text-gray-500">Add date</span>
              )}
            </div>
          </div>
        </div>

        {showCalendar && (
          <div className="absolute left-0 right-0 z-10 bg-white border rounded-lg shadow-lg p-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">
                {selectingCheckIn
                  ? "Select check-in date"
                  : "Select check-out date"}
              </h3>
              <button
                onClick={() => setShowCalendar(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                X
              </button>
            </div>

            {checkInDate && checkOutDate && (
              <div className="mb-2 text-sm flex justify-between">
                <span>
                  {formatDate(checkInDate)} - {formatDate(checkOutDate)}
                </span>
                <button
                  onClick={clearDates}
                  className="text-[var(--color-primary)] underline"
                >
                  clear dates
                </button>
              </div>
            )}

            {isLoading ? (
              <div className="py-4 text-center">Loading available dates...</div>
            ) : (
              <Calendar
                onChange={handleDateClick}
                value={selectingCheckIn ? checkInDate : checkOutDate}
                tileDisabled={tileDisabled}
                tileClassName={tileClassName}
                minDate={new Date()}
                selectRange={false}
                showNeighboringMonth={false}
                className="border-0"
              />
            )}

            <div className="mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-gray-200 mr-2"></div>
                <span>Unavailable dates</span>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={handleCheckAvailability}
          disabled={!checkInDate || !checkOutDate}
          className="w-full text-white font-medium py-3 px-4 rounded-lg transition duration-200"
        >
          Reserve
        </Button>
        {successMsg && <p className="success">{successMsg}</p>}
        {errorMsg && <p className="error">{errorMsg}</p>}
        <button className="btntrip" onClick={goToTrips}>
          find your booked property here
        </button>
      </div>
    </>
  );
};

export default PropertyReservation;
