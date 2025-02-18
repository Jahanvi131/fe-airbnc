import { useState } from "react";
import "./header.css";
import Logo from "../header/Logo";
import SearchDestination from "../header/SearchDestination";
import UserAvatar from "../header/UserAvatar";
import ProfileDropDown from "../header/ProfileDropDown";

const Header = ({ user }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <header className="header">
      <div className="header-container">
        <nav className="header-nav">
          <div className="header-left">
            <Logo />
          </div>

          <div className="header-middle">
            <SearchDestination />
          </div>

          <div className="header-right">
            <UserAvatar onClick={() => setIsProfileOpen(!isProfileOpen)} />
            {isProfileOpen && (
              <ProfileDropDown onClose={() => setIsProfileOpen(false)} />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
