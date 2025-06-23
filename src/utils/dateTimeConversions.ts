export function getJsDate(isoString: string) {
  const [year, month, day] = isoString.split("-");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export default function splitDateTime(dateTimeString: string) {
  const [date, time] = dateTimeString.split("T");
  return { date, time };
}
