import { Link } from "react-router-dom";
import AirbnbLogo from "../../../assets/airbnc.svg";

const Logo = () => {
  return (
    <Link to="/" className="logo-link">
      <img src={AirbnbLogo} alt="Logo" className="logo-image" />
    </Link>
  );
};
export default Logo;
