export function hoursAgo(date) {
  const milliseconds = Date.now() - Date.parse(date);
  const hours = Math.ceil(milliseconds / 3600000);
  return hours;
}
