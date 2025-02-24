import PropertyAmenities from "./PropertyAmenities";

const PropertySummary = ({ propdetails, avg_rating, prop_review_counts }) => {
  return (
    <div className="property-info-container">
      <div className="property-summary">
        <h2 className="PropertyLocation">{propdetails.location}</h2>
        <div className="rating-summary">
          <span className="star-icon">★ {avg_rating}</span>
          <button className="btnReview">
            {prop_review_counts}
            {prop_review_counts === 1 ? " Review" : " Reviews"}
          </button>
        </div>
      </div>
      <p className="desc">{propdetails.description}</p>
      <div className="PropertyHost">
        <img className="host-image" src={propdetails.host_avatar} />
        <div className="host-name">Hosted by {propdetails.host}</div>
      </div>
      <PropertyAmenities />
    </div>
  );
};
export default PropertySummary;
