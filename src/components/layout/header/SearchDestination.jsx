import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import "../../common/button.css";
import { useState } from "react";

const SearchDestination = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const searchByLocatoin = () => {
    updateURL(location);
    setLocation("");
  };
  const updateURL = (value) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("location", value);
    navigate(`/properties?${searchParams.toString()}`);
  };
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="search destinations"
        className="search-input"
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
      <Button onClick={searchByLocatoin}>Search</Button>
    </div>
  );
};

export default SearchDestination;
