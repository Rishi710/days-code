function solution(D) {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const daysOfMonth = {
    1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30,
    7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
  };
  const dayToDate = date => {
    const [year, month, day] = date.split('-').map(Number);
    const daysBeforeMonth = Object.values(daysOfMonth).slice(0, month - 1).reduce((sum, days) => sum + days, 0);
    const leapYearsBefore = Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400);
    const daysBeforeYear = (year - 1) * 365 + daysBeforeMonth + leapYearsBefore;
    const daysOfYear = daysOfMonth[month] + (month === 2 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    const daysOfYearBefore = daysBeforeMonth + (month > 1 ? daysOfYear : 0);
    const daysBeforeDay = daysBeforeYear + daysOfYearBefore + day - 1;
    return daysBeforeDay % 7;
  };
  const sortedDates = Object.keys(D).sort();
  const minDate = sortedDates[0], maxDate = sortedDates[sortedDates.length - 1];
  const minDay = dayToDate(minDate), maxDay = dayToDate(maxDate);
  const output = {};
  for (let i = 0; i < 7; i++) {
    const day = daysOfWeek[i];
    const prevDay = daysOfWeek[(i + 6) % 7];
    const nextDay = daysOfWeek[(i + 1) % 7];
    let sum = 0, count = 0;
    if (i === minDay) {
      sum += D[minDate];
      count++;
    }
    if (i === maxDay) {
      sum += D[maxDate];
      count++;
    }
    for (const date of sortedDates) {
      if (dayToDate(date) === i) {
        sum += D[date];
        count++;
      }
    }
    if (count === 0) {
      output[day] = (output[prevDay] + output[nextDay]) / 2;
    } else {
      output[day] = sum;
    }
  }
  return output;
}
