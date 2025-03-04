import { Link } from "react-router-dom";
import { createFavourites } from "../../../services/api";
import { useEffect, useState } from "react";

const PropertyCard = ({ prop, userId, onFavoriteChange }) => {
  const [isFavorited, setIsFavorited] = useState(prop.favourited);

  useEffect(() => {
    setIsFavorited(prop.favourited);
  }, [prop.favourited]);
  const addToFavourites = async (property_id) => {
    // Optimistically update UI
    const newFavoriteStatus = true;
    setIsFavorited(newFavoriteStatus);

    // Notify parent component about the change
    onFavoriteChange(property_id, newFavoriteStatus);
    try {
      await createFavourites(property_id, userId);
    } catch {
      const originalStatus = prop.favourited;
      setIsFavorited(originalStatus);

      // Notify parent about the reversion
      onFavoriteChange(property_id, originalStatus);
    }
  };
  return (
    <li>
      <div className="image-container">
        <Link
          to={{
            pathname: `/property/${prop.property_id}`,
            search: `?user_id=${userId}`,
          }}
        >
          <img src={prop.image} alt={prop.property_name} />
        </Link>
        <button
          className="favorite-button"
          onClick={() => {
            addToFavourites(prop.property_id);
          }}
          style={{
            color: isFavorited ? "var(--color-primary)" : "",
            transition: "color 0.2s ease",
            cursor: isFavorited ? "none" : "pointer",
            opacity: isFavorited ? 1.7 : 2,
          }}
        >
          {isFavorited ? "♥" : "♡"}
        </button>
      </div>
      <div className="property-info">
        <p className="location">{prop.location}</p>
        <p className="propName">{prop.property_name}</p>
        <p className="host">hosted by {prop.host}</p>
        <p className="price">£{prop.price_per_night}</p>
      </div>
    </li>
  );
};

export default PropertyCard;
