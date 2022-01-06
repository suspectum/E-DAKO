import subDays from 'date-fns/subDays';
import startOfToday from 'date-fns/startOfToday';
import endOfToday from 'date-fns/endOfToday';
import startOfYesterday from 'date-fns/startOfYesterday';
import endOfYesterday from 'date-fns/endOfYesterday';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import startOfYear from 'date-fns/startOfYear';
import endOfMonth from 'date-fns/endOfMonth';

function daysFromToday(days) {
  return subDays(startOfToday(), days);
}

function firstDayOfThisMonth() {
  return startOfMonth(new Date());
}

function firstDayOfThisYear() {
  return startOfYear(new Date());
}

export function _startOfDay(day) {
  return startOfDay(day);
}
export function _endOfDay(day) {
  return endOfDay(day);
}

export const today = { start: startOfToday(), end: endOfToday() };
export const yesterday = { start: startOfYesterday(), end: endOfYesterday() };
export const lastWeek = { start: daysFromToday(7), end: endOfToday() };
export const lastMonth = { start: daysFromToday(30), end: endOfToday() };
export const thisMonth = { start: firstDayOfThisMonth(), end: endOfToday() };
export const thisYear = { start: firstDayOfThisYear(), end: endOfToday() };
export const lastYear = { start: endOfMonth(daysFromToday(365)), end: endOfToday() };
