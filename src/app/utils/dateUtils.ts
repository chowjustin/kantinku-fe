function formatISOToDayMonthYear(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-Es", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default formatISOToDayMonthYear;
