import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import "../components/common/button.css";

const NotFound = () => {
  const navigate = useNavigate();
  const goBackToHome = () => {
    navigate("/");
  };
  return (
    <div class="container">
      <div class="spaceship">
        <div class="spaceship-body"></div>
        <div class="spaceship-window"></div>
        <div class="spaceship-base"></div>
        <div class="beam"></div>
      </div>
      <div class="error-code">404</div>
      <h1 class="error-title">Page Not Found</h1>
      <p class="error-message">
        Oops! The page you're looking for seems to have been abducted by aliens
        or never existed in the first place.
      </p>
      <Button onClick={goBackToHome} class="back-button">
        Back to Home
      </Button>
    </div>
  );
};

export default NotFound;
