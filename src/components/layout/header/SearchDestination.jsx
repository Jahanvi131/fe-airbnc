import Button from "../../common/Button";
import "../../common/button.css";

const SearchDestination = () => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="search destinations"
        className="search-input"
      />
      <Button>Search</Button>
    </div>
  );
};

export default SearchDestination;
