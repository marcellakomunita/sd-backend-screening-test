export function getHoroscope(date: Date): string {
  let result = '';
  const day = Number(date.getDay());
  const month = Number(date.getMonth());
  if (month == 12) {
    if (day < 22) result = 'Sagittarius';
    else result = 'capricorn';
  } else if (month == 1) {
    if (day < 20) result = 'Capricorn';
    else result = 'aquarius';
  } else if (month == 2) {
    if (day < 19) result = 'Aquarius';
    else result = 'pisces';
  } else if (month == 3) {
    if (day < 21) result = 'Pisces';
    else result = 'aries';
  } else if (month == 4) {
    if (day < 20) result = 'Aries';
    else result = 'taurus';
  } else if (month == 5) {
    if (day < 21) result = 'Taurus';
    else result = 'gemini';
  } else if (month == 6) {
    if (day < 21) result = 'Gemini';
    else result = 'cancer';
  } else if (month == 7) {
    if (day < 23) result = 'Cancer';
    else result = 'leo';
  } else if (month == 8) {
    if (day < 23) result = 'Leo';
    else result = 'virgo';
  } else if (month == 9) {
    if (day < 23) result = 'Virgo';
    else result = 'libra';
  } else if (month == 10) {
    if (day < 23) result = 'Libra';
    else result = 'scorpio';
  } else if (month == 11) {
    if (day < 22) result = 'scorpio';
    else result = 'sagittarius';
  }
  return result;
}
