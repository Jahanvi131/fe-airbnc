export const checkDateStatus = (dateToCheck) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateObj =
    typeof dateToCheck === "string" ? new Date(dateToCheck) : dateToCheck;

  const checkDate = new Date(dateObj);
  checkDate.setHours(0, 0, 0, 0);

  if (checkDate > today) {
    return "upcoming";
  } else if (checkDate < today) {
    return "past";
  } else {
    return "today";
  }
};
