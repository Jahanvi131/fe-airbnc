import { fetchUser } from "../services/api";
import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = await fetchUser(2);
      setUser(userData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = (newUserData) => {
    setUser((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        ...newUserData,
      },
    }));
  };

  const value = {
    user,
    loading,
    error,
    updateUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
