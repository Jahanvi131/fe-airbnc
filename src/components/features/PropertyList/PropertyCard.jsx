import { Link } from "react-router-dom";

const PropertyCard = ({ prop }) => {
  return (
    <li>
      <div className="image-container">
        <Link
          to={{
            pathname: `/property/${prop.property_id}`,
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
