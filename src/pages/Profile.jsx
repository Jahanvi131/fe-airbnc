import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "../../src/components/common/Button";
import "../../src/components/common/button.css";
import { updateUser } from "../services/api";

const Profile = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize useNavigate
  // Initialize formData with the user details
  const [formData, setFormData] = useState({
    first_name: "",
    surname: "",
    email: "",
    phone_number: "",
    avatar: "",
  });
  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);
  // Set initial values once user data is available
  useEffect(() => {
    if (user?.user) {
      setFormData({
        first_name: user.user.first_name || "",
        surname: user.user.surname || "",
        email: user.user.email || "",
        phone_number: user.user.phone_number || "",
        avatar: user.user.avatar || "",
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const userData = await updateUser(formData, 2);
      setFormData(userData);
      setError(null);
    } catch (err) {
      setError("failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };
  return (
    !loading && (
      <form className="editProfileForm" onSubmit={handleSubmit}>
        <h3>Edit Profile</h3>
        <div>
          <label htmlFor="first_name">FirstName</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="surname">SurName</label>
          <input
            type="text"
            name="surname"
            id="surname"
            value={formData.surname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone_number">Phone</label>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="avatar">Avatar</label>
          {/* <img src={formData.avatar || null} className="profile-image" /> */}
          <input
            type="text"
            name="avatar"
            id="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button> {isloading ? "Saving..." : "Save"}</Button>
          <Button className="buttonCancel" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    )
  );
};

export default Profile;
