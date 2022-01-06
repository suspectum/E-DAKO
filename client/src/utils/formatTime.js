import { format, endOfWeek } from 'date-fns';

export function fDate(date) {
  return format(new Date(date), 'dd/MM/yyyy');
}

export function fDateM(date) {
  return format(new Date(date), 'dd MMM');
}

export function fTimeFrame(date, displayBy) {
  const dt = new Date(date);
  const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);

  switch (displayBy) {
    case 'year':
      return format(dtDateOnly, 'yyyy');
    case 'month':
      return format(dtDateOnly, 'MMM');
    case 'month-year':
      return format(dtDateOnly, 'MMM/yy');
    case 'week':
      let start = format(dtDateOnly, 'dd MMM');
      let end = format(endOfWeek(dtDateOnly), 'dd MMM');
      return `${start} - ${end}`;
    default:
      return format(dtDateOnly, 'dd MMM');
  }
}
