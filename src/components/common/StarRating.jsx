const StarRating = ({ rating }) => {
  const percentage = (rating / 5) * 100;
  return (
    <div className="star-rating">
      <div>★★★★★</div>
      <div className="filled-stars" style={{ width: `${percentage}%` }}>
        ★★★★★
      </div>
    </div>
  );
};

export default StarRating;
