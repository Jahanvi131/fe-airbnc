import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import "../../components/common/button.css";

const NoPropertyFound = ({ pageName }) => {
  const navigate = useNavigate();
  const goBackToHome = () => {
    navigate("/");
  };
  return (
    <div className="no-item-container">
      <p class="no-item-message">
        Oops!{" "}
        {pageName === "wishlist"
          ? "No property found in your wishlist. Add now."
          : "No booking yet. Explore the properties now."}
      </p>
      <Button onClick={goBackToHome} class="back-button">
        Back to Home
      </Button>
    </div>
  );
};
export default NoPropertyFound;
