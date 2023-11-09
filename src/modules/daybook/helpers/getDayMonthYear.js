const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augost",
  "Septiember",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getDayMonthYear = (dateString) => {
  const date = new Date(dateString);
  return {
    day: date.getDate(),
    months: months[date.getMonth()],
    yearDay: `${date.getFullYear()}, ${days[date.getDay()]}`,
  };
};

export default getDayMonthYear;
