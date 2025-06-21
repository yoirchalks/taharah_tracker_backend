export default function getJsDate(isoString: string) {
  const [year, month, day] = isoString.split("-");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}
