export default function formatDate(date) {
  const newDate = new Date(date);

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };

  const formattedDate = newDate.toLocaleDateString("en-US", options);

  return formattedDate;
}
