// Validation functions
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? "" : "Please enter a valid email address";
};

export const validatePhone = (phone) => {
  // Basic phone validation - can be customized based on your requirements
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone)
    ? ""
    : "Please enter a valid phone number (10-15 digits)";
};

export const validateRequired = (value, fieldName) => {
  return value.trim() ? "" : `${fieldName} is required`;
};
