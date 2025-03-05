import { useState, useEffect, useContext } from "react";
import { fetchPropertyList } from "../../../services/api";
import PropertyCard from "./PropertyCard";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import LoadingCircle from "../../common/LoadingCircle";

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
  }, [searchParams]);

  // get api call for Properties
  const fetchProperties = async (page) => {
    if (!hasMore || isLoading) return;
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
            setError("No more properties found");
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

  // Scroll event handler
  const handleScroll = () => {
    // Check if user has scrolled to bottom and there are more properties
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
      hasMore &&
      !isLoading
    ) {
      // Increment page to load more properties
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, isLoading]);

  const handleFavoriteChange = (propertyId, isFavorited) => {
    setPropertyList((prevList) =>
      prevList.map((property) =>
        property.property_id === propertyId
          ? { ...property, favourited: isFavorited }
          : property
      )
    );
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
      {!hasMore && error && <p className="no-more-property">{error}</p>}
    </>
  );
};

export default PropertyList;
