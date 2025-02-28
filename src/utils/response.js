export const fetchQueryString = (property_type, minprice, maxprice, sort) => {
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
export const fetchOrderFromSortValue = (sortValue) => {
  let order = "";
  if (sortValue === "price_low_high") {
    order = "asc";
  } else {
    order = "desc";
  }
  return order;
};

export const getSuccessResponse = (data) => {
  return {
    success: true,
    data,
    status: 200,
  };
};

export const getErrorResponse = (err) => {
  return {
    success: false,
    status: err.response?.status || 500,
    error: err.response?.data || "",
  };
};
