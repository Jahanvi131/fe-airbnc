import { useState, useEffect, useContext } from "react";
import { fetchPropertyList } from "../../../services/api";
import PropertyCard from "./PropertyCard";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

const PropertyList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const property_typeFromQuery = searchParams.get("property_type");
  const min_priceFromQuery = searchParams.get("minprice");
  const max_priceFromQuery = searchParams.get("maxprice");
  const sortFromQuery = searchParams.get("sort");
  const [propertyList, setpropertyList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  // get api call for Properties
  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const response = await fetchPropertyList(
        property_typeFromQuery,
        min_priceFromQuery,
        max_priceFromQuery,
        sortFromQuery,
        user?.user?.user_id
      );
      if (response.success) {
        setpropertyList(response.data.properties);
        setError("");
      } else {
        switch (response.status) {
          case 404:
            setError("No properties were found");
            break;
          case 400:
            setError("Bad request");
            break;
          case 500:
            setError("Server error occurred. Please try again later");
            break;
          default:
            setError("An error occurred while fetching properties");
        }
        setpropertyList([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Callback function for when a property is favorited
  const handleFavoriteChange = (propertyId, isFavorited) => {
    // Update the property list with the new favorite status
    setpropertyList((prevList) =>
      prevList.map((property) =>
        property.property_id === propertyId
          ? { ...property, favourited: isFavorited }
          : property
      )
    );
  };

  return (
    <>
      {error && <p className="error">{error}</p>}
      {isLoading && <p>loading...</p>}
      <ul className="property-grid">
        {propertyList.map((prop) => {
          return (
            <PropertyCard
              key={prop.property_id}
              prop={prop}
              userId={user?.user?.user_id}
              onFavoriteChange={handleFavoriteChange}
            />
          );
        })}
      </ul>
    </>
  );
};

export default PropertyList;
