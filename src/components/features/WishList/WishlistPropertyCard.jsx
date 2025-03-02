import { useState } from "react";
import { Link } from "react-router-dom";
import deleteicon from "../../../assets/delete-icon.svg";
import { deleteFavouriteById } from "../../../services/api";

const WishlistPropertyCard = ({ prop, userId, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleDelete = async (fav_id) => {
    try {
      setLoading(true);
      const response = await deleteFavouriteById(fav_id);
      if (response.status === 200) {
        setErrorMsg("");
        onDelete(fav_id);
      } else {
        switch (response.status) {
          case 404:
            setErrorMsg("No property found");
            break;
          case 400:
            setErrorMsg("Bad request");
            break;
          case 500:
            setErrorMsg("Server error occurred. Please try again later");
            break;
          default:
            setErrorMsg("An error occurred while deleting favorite");
        }
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
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
        </div>
        <div className="property-info">
          <p className="location">{prop.location}</p>
          <p className="propName">{prop.property_name}</p>
          <div className="priceDelete">
            <p className="price">£{prop.price_per_night}</p>
            {errorMsg && <p className="error">{errorMsg}</p>}
            {loading && <span>Removing...</span>}
            <p className="deleteWishlist">
              <button
                onClick={() => {
                  handleDelete(prop.favourite_id);
                }}
              >
                <img className="remove-review" src={deleteicon} alt="delete" />
              </button>
            </p>
          </div>
        </div>
      </li>
    </>
  );
};

export default WishlistPropertyCard;
