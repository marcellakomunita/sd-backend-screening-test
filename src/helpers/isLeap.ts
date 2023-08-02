export function isLeapYear(date: Date): boolean {
  const year = Number(date.getFullYear);
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}
