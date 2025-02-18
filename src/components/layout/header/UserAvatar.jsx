import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import Button from "../../common/Button";
import "../../common/button.css";

const UserAvatar = ({ onClick }) => {
  const { user, loading, error } = useContext(UserContext);
  if (error) return null;
  return (
    !loading && (
      <Button onClick={onClick} className="avatar-button">
        <div className="avatar-container">
          <img src={user.user.avatar} alt="" className="avatar-image" />
        </div>
        <div className="avatar-menu-icon">☰</div>
      </Button>
    )
  );
};

export default UserAvatar;
