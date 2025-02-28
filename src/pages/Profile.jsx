import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "../../src/components/common/Button";
import "../../src/components/common/button.css";
import { updateUser } from "../services/api";
import {
  validateEmail,
  validatePhone,
  validateRequired,
} from "../utils/validation";

const Profile = () => {
  const { user, loading, updateUserData } = useContext(UserContext);
  const navigate = useNavigate();

  // Initialize formData with the user details
  const [formData, setFormData] = useState({
    first_name: "",
    surname: "",
    email: "",
    phone: "",
    avatar: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    first_name: "",
    surname: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // Set initial values once user data is available
  useEffect(() => {
    if (user?.user) {
      setFormData({
        first_name: user.user.first_name || "",
        surname: user.user.surname || "",
        email: user.user.email || "",
        phone: user.user.phone_number || "",
        avatar: user.user.avatar || "",
      });
    }
  }, [user?.user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsDisabled(false);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {
      first_name: validateRequired(formData.first_name, "First name"),
      surname: validateRequired(formData.surname, "Surname"),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
    };

    setErrors(newErrors);

    // Return true if no errors
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      setIsDisabled(true);
      const response = await updateUser(formData, user?.user?.user_id);
      if (response.success) {
        setFormData({
          first_name: response.data.user.first_name || user.user.first_name,
          surname: response.data.user.surname || user.user.surname,
          email: response.data.user.email || user.user.email,
          phone: response.data.user.phone_number || user.user.phone_number,
          avatar: response.data.user.avatar || user.user.avatar,
        });

        updateUserData(response.data.user);
      }

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
            className={errors.first_name ? "input-error" : ""}
          />
          {errors.first_name && (
            <p className="error-text">{errors.first_name}</p>
          )}
        </div>
        <div>
          <label htmlFor="surname">SurName</label>
          <input
            type="text"
            name="surname"
            id="surname"
            value={formData.surname}
            onChange={handleChange}
            className={errors.surname ? "input-error" : ""}
          />
          {errors.surname && <p className="error-text">{errors.surname}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "input-error" : ""}
          />
        </div>
        {errors.phone && <p className="error-text">{errors.phone}</p>}
        <div>
          <label htmlFor="avatar">Avatar</label>
          <input
            type="text"
            name="avatar"
            id="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button disabled={isDisabled}>
            {isloading ? "Saving..." : "Save"}
          </Button>
          <Button type="button" className="buttonCancel" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    )
  );
};

export default Profile;
