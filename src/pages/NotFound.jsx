import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import "../components/common/button.css";

const NotFound = () => {
  const navigate = useNavigate();
  const goBackToHome = () => {
    navigate("/");
  };
  return (
    <div className="container">
      <div className="spaceship">
        <div className="spaceship-body"></div>
        <div className="spaceship-window"></div>
        <div className="spaceship-base"></div>
        <div className="beam"></div>
      </div>
      <div className="error-code">404</div>
      <h1 className="error-title">Page Not Found</h1>
      <p className="error-message">
        Oops! The page you're looking for seems to have been abducted by aliens
        or never existed in the first place.
      </p>
      <Button onClick={goBackToHome} className="back-button">
        Back to Home
      </Button>
    </div>
  );
};

export default NotFound;
