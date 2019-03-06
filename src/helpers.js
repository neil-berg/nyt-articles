export function hoursAgo(date) {
  const milliseconds = Date.now() - Date.parse(date);
  const hours = Math.ceil(milliseconds / 3600000);
  return hours;
}

export function formatTitle(title) {
  const formattedTitle = title
    .replace(/the/i, '')
    .replace(/\s/, '')
    .toLowerCase();
  return formattedTitle;
}
