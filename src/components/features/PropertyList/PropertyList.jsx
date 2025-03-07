import { useState, useEffect, useContext } from "react";
import { fetchPropertyList } from "../../../services/api";
import PropertyCard from "./PropertyCard";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import LoadingCircle from "../../common/LoadingCircle";
import Button from "../../common/Button";
import "../../common/button.css";

const PropertyList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const property_typeFromQuery = searchParams.get("property_type");
  const locationFromQuery = searchParams.get("location");
  const min_priceFromQuery = searchParams.get("minprice");
  const max_priceFromQuery = searchParams.get("maxprice");
  const sortFromQuery = searchParams.get("sort");
  const [propertyList, setPropertyList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(8);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
    fetchProperties(1);
  }, [searchParams, user?.user?.user_id]);

  // get api call for Properties
  const fetchProperties = async (page) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await fetchPropertyList(
        property_typeFromQuery,
        locationFromQuery,
        min_priceFromQuery,
        max_priceFromQuery,
        sortFromQuery,
        user?.user?.user_id,
        limit,
        page
      );

      if (response.success) {
        const newProperties = response.data.properties;

        setPropertyList((prevProperties) =>
          page === 1 ? newProperties : [...prevProperties, ...newProperties]
        );
        setHasMore(newProperties.length === limit);
        setError("");
      } else {
        switch (response.status) {
          case 404:
            ShowError("No more properties were found");
            break;
          case 400:
            ShowError("Bad request");
            break;
          case 500:
            ShowError("Server error occurred. Please try again later");
            break;
          default:
            ShowError("An error occurred while fetching properties");
        }
        if (page === 1) {
          setPropertyList([]);
        }
        setHasMore(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(currentPage);
  }, [currentPage]);

  const handleFavoriteChange = (propertyId, isFavorited) => {
    setPropertyList((prevList) =>
      prevList.map((property) =>
        property.property_id === propertyId
          ? { ...property, favourited: isFavorited }
          : property
      )
    );
  };

  const handlePagination = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const ShowError = (err) => {
    setError(err);
    setTimeout(() => {
      setError("");
    }, 5000);
  };
  return (
    <>
      {isLoading && <LoadingCircle />}
      <ul className="property-grid">
        {propertyList.map((prop, i) => {
          return (
            <PropertyCard
              key={i}
              prop={prop}
              userId={user?.user?.user_id}
              onFavoriteChange={handleFavoriteChange}
            />
          );
        })}
      </ul>
      {hasMore && !isLoading && (
        <div className="no-more-property">
          <Button onClick={handlePagination}>load more</Button>
        </div>
      )}
      {!hasMore && error && <p className="no-more-property">{error}</p>}
    </>
  );
};

export default PropertyList;
