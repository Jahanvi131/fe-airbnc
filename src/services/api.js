import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchUser = async (userId) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export const updateUser = async (user, userId) => {
  try {
    const { data } = await axios.patch(`${API_BASE_URL}/users/${userId}`, user);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};

export const fetchPropertyTypeList = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/property_types`);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch property_types");
  }
};

export const fetchPropertyList = async (property_type) => {
  try {
    // Construct query string dynamically
    const queryParams = new URLSearchParams();
    if (property_type && property_type !== "all") {
      queryParams.append("property_type", property_type);
    }
    const { data } = await axios.get(
      `${API_BASE_URL}/properties?${queryParams.toString()}`
    );
    return {
      success: true,
      data: data,
      status: 200,
    };
  } catch (err) {
    return {
      success: false,
      status: err.response?.status || 500,
      error: err.response?.data || "",
    };
  }
};
