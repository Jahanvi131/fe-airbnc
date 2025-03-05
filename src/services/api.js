import axios from "axios";
import {
  fetchQueryString,
  getSuccessResponse,
  getErrorResponse,
} from "../utils/response";
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
    return getSuccessResponse(data);
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

export const fetchPropertyList = async (
  property_type,
  location,
  minprice,
  maxprice,
  sort,
  userId,
  limit,
  page
) => {
  try {
    // Construct query string dynamically
    const queryParams = fetchQueryString(
      property_type,
      location,
      minprice,
      maxprice,
      sort,
      limit,
      page
    );
    const { data } = await axios.get(
      `${API_BASE_URL}/properties?${queryParams.toString()}`,
      {
        headers: {
          "X-User-ID": userId,
        },
      }
    );
    return getSuccessResponse(data);
  } catch (err) {
    return getErrorResponse(err);
  }
};

export const fetchPropertyById = async (property_id, user_id) => {
  try {
    let api_endpoint = `${API_BASE_URL}/properties/${property_id}`;
    if (user_id) {
      api_endpoint = `${API_BASE_URL}/properties/${property_id}?user_id=${user_id}`;
    }

    const { data } = await axios.get(api_endpoint);
    return getSuccessResponse(data);
  } catch (err) {
    return getErrorResponse(err);
  }
};

export const fetchReviewsByPropertyId = async (property_id) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/properties/${property_id}/reviews`
    );
    return getSuccessResponse(data);
  } catch (err) {
    return getErrorResponse(err);
  }
};

export const deleteReviewById = async (review_id) => {
  try {
    const { data } = await axios.delete(`${API_BASE_URL}/reviews/${review_id}`);
    return getSuccessResponse(data);
  } catch (err) {
    return getErrorResponse(err);
  }
};

export const createFavourites = async (property_id, guest_id) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/properties/${property_id}/favourite`,
      { guest_id }
    );
    return getSuccessResponse(data);
  } catch (err) {
    return getErrorResponse(err);
  }
};

export const fetchFavouritesByUserId = async (guest_id) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/users/${guest_id}/favourites`
    );
    return getSuccessResponse(data);
  } catch (err) {
    return getErrorResponse(err);
  }
};

export const deleteFavouriteById = async (favourite_id) => {
  try {
    const { data } = await axios.delete(
      `${API_BASE_URL}/favourites/${favourite_id}`
    );
    return getSuccessResponse(data);
  } catch (err) {
    return getErrorResponse(err);
  }
};

export const createReviews = async (property_id, reviewData) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/properties/${property_id}/reviews`,
      reviewData
    );
    return getSuccessResponse(data);
  } catch (err) {
    return getErrorResponse(err);
  }
};

export const fetchBookingByUserId = async (guest_id) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/users/${guest_id}/bookings`
    );
    return getSuccessResponse(data);
  } catch (err) {
    return getErrorResponse(err);
  }
};

export const deleteBookingById = async (booking_id) => {
  try {
    const { data } = await axios.delete(
      `${API_BASE_URL}/bookings/${booking_id}`
    );
    return getSuccessResponse(data);
  } catch (err) {
    return getErrorResponse(err);
  }
};

export const createBookings = async (property_id, bookingData) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/properties/${property_id}/bookings`,
      bookingData
    );
    return getSuccessResponse(data);
  } catch (err) {
    return getErrorResponse(err);
  }
};

export const fetchBookingByPropertyId = async (property_id) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/properties/${property_id}/bookings`
    );
    return getSuccessResponse(data);
  } catch (err) {
    return getErrorResponse(err);
  }
};
