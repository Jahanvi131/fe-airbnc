import { useRef } from "react";
import { Link } from "react-router-dom";
import useOutsideClick from "../../../hooks/useOutsideClick";

const ProfileDropDown = ({ onClose }) => {
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, onClose);

  return (
    <div ref={dropdownRef} className="profile-dropdown">
      <div className="dropdown-content">
        <Link to="/profile" className="dropdown-item">
          Profile
        </Link>
        <Link to="/wishlist" className="dropdown-item">
          Wishlist
        </Link>
        <Link to="/trips" className="dropdown-item">
          Trips
        </Link>
      </div>
    </div>
  );
};

export default ProfileDropDown;
