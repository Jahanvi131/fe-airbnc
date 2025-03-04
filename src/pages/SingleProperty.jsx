import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchPropertyById, fetchReviewsByPropertyId } from "../services/api";
import Image_Gallery from "../components/features/SingleProperty/PropertyImages";
import PropertySummary from "../components/features/SingleProperty/PropertySummary";
import PropertyReviews from "../components/features/SingleProperty/PropertyReviews";
import PropertyReservation from "../components/features/Bookings/PropertyReservation";

const SingleProperty = () => {
  const { id: property_id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const userIdFromQuery = searchParams.get("user_id");
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [propReviews, setPropReviews] = useState([]);
  const [avg_rating, setAvg_rating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchPropertyDetailsById(property_id, userIdFromQuery);
  }, [property_id]);

  useEffect(() => {
    fetchPropertyReviews(property_id);
  }, [property_id]);

  const fetchPropertyReviews = async (property_id) => {
    try {
      const response = await fetchReviewsByPropertyId(property_id);
      if (response.success) {
        setIsLoading(true);
        setPropReviews(response.data?.reviews);
        setAvg_rating(response?.data?.average_rating);
        setErrorMsg("");
      } else {
        switch (response.status) {
          case 404:
            setErrorMsg("No property details were found");
            break;
          case 400:
            setErrorMsg("Bad request");
            break;
          case 500:
            setErrorMsg("Server error occurred. Please try again later");
            break;
          default:
            setErrorMsg("An error occurred while fetching property");
        }
        setPropReviews([]);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const fetchPropertyDetailsById = async (property_id, userIdFromQuery) => {
    try {
      setLoading(true);
      const response = await fetchPropertyById(property_id, userIdFromQuery);
      if (response.success) {
        setPropertyDetails(response.data?.property);
        setError("");
      } else {
        switch (response.status) {
          case 404:
            setError("No property details were found");
            break;
          case 400:
            setError("Bad request");
            break;
          case 500:
            setError("Server error occurred. Please try again later");
            break;
          default:
            setError("An error occurred while fetching property");
        }
        setPropertyDetails(null);
      }
    } finally {
      setLoading(false);
    }
  };
  if (!propertyDetails) return <p>loading...</p>;
  return (
    <>
      {error && <p className="error">{error}</p>}
      <div className="PropertyTitle">
        <h1 className="title">{propertyDetails?.property_name || ""}</h1>
        <div className="action-buttons">
          <span>{propertyDetails.favourited ? "♥" : "♡"}</span>
        </div>
      </div>
      <Image_Gallery images={propertyDetails?.images || []} />
      <div className="inline-block md:flex">
        <PropertySummary
          propdetails={propertyDetails}
          avg_rating={avg_rating}
          prop_review_counts={propReviews.length}
        />
        <PropertyReservation
          property_id={propertyDetails.property_id}
          user_id={userIdFromQuery}
        />
      </div>
      <PropertyReviews
        propreviews={propReviews}
        rating={avg_rating}
        loggedinuser={userIdFromQuery}
        isLoading={isLoading}
        error={errorMsg}
      />
    </>
  );
};

export default SingleProperty;
