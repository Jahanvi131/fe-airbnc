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
    return {
      success: true,
      data: data,
      status: 200,
    };
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
  minprice,
  maxprice,
  sort
) => {
  try {
    // Construct query string dynamically
    const queryParams = fetchQueryString(
      property_type,
      minprice,
      maxprice,
      sort
    );
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

export const fetchPropertyById = async (property_id, user_id) => {
  try {
    let api_endpoint = `${API_BASE_URL}/properties/${property_id}`;
    if (user_id) {
      api_endpoint = `${API_BASE_URL}/properties/${property_id}?user_id=${user_id}`;
    }

    const { data } = await axios.get(api_endpoint);
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

export const fetchReviewsByPropertyId = async (property_id) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/properties/${property_id}/reviews`
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

export const deleteReviewById = async (review_id) => {
  try {
    const { data } = await axios.delete(`${API_BASE_URL}/reviews/${review_id}`);
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
const fetchQueryString = (property_type, minprice, maxprice, sort) => {
  // Construct query string dynamically
  const queryParams = new URLSearchParams();
  if (property_type && property_type !== "all") {
    queryParams.append("property_type", property_type);
  }
  if (minprice) {
    queryParams.append("minprice", minprice);
  }
  if (maxprice) {
    queryParams.append("maxprice", maxprice);
  }
  if (sort) {
    if (sort.startsWith("price")) {
      queryParams.append("sort", "price_per_night");
    } else {
      queryParams.append("sort", "popularity");
    }
    const order = fetchOrderFromSortValue(sort);
    queryParams.append("order", order);
  }
  return queryParams;
};
const fetchOrderFromSortValue = (sortValue) => {
  let order = "";
  if (sortValue === "price_low_high") {
    order = "asc";
  } else {
    order = "desc";
  }
  return order;
};
