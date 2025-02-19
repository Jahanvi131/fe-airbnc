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
