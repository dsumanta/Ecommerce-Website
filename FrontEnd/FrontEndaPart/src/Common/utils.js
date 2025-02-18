export const forMatDate = (date) => {
  const day = date.getDate();
  const dayWithSuffix = addDateSuffix(day); // See function below
  const month = date.toLocaleString("default", { month: "short" }); // Short month name
  const year = date.getFullYear();

  const formattedDate = `${dayWithSuffix} ${month} ${year}`;
  return formattedDate;
};
function addDateSuffix(day) {
  if (day >= 11 && day <= 13) {
    return day + "th";
  }
  switch (day % 10) {
    case 1:
      return day + "st";
    case 2:
      return day + "nd";
    case 3:
      return day + "rd";
    default:
      return day + "th";
  }
}
