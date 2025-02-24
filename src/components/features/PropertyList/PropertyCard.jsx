import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

const PropertyCard = ({ prop }) => {
  const { user } = useContext(UserContext);
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    if (user?.user) {
      setUserId(user.user.user_id);
    }
  }, [user]);
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
        <button className="favorite-button">♡</button>
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
