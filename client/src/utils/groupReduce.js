import { formatCurrency, fTimeFrame } from 'utils';
import { startOfMonth, startOfWeek, startOfYear, format } from 'date-fns';

export function groupBy(objectArray, property, displayBy) {
  return objectArray.reduce(function (acc, obj) {
    let key;
    if (property === 'id') {
      key = obj[property][displayBy];
    } else {
      const { type, category, amount } = obj;
      let date = getDate(obj.date);

      date = displayBy ? startOf(date, displayBy) : date;
      key = displayBy ? startOf(obj[property], displayBy) : obj[property];
      //* property === 'date' ? ... or displayBy ? ...

      obj = { type, category, amount, date };
    }

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export function createSeries(objectArray, displayBy) {
  // * objectArray from ExpenseLineChartCard & IncomeLineChartCard
  if (!displayBy) {
    let reduceGroupAmountByDate;

    if (objectArray[0]?.hasOwnProperty('amount')) {
      reduceGroupAmountByDate = objectArray?.map((item) => {
        const { year, month } = item.id;
        const date = `${year}-${month}`;
        return {
          x: fTimeFrame(date, 'month-year'),
          y: item.amount,
        };
      });
    } else {
      reduceGroupAmountByDate = Object.keys(objectArray).map((date) => {
        return {
          x: date,
          y: objectArray[date] ? sumReduce(objectArray[date]) : parseFloat(0).toFixed(2),
        };
      });
    }

    return [
      {
        name: 'Expense',
        data: reduceGroupAmountByDate,
      },
    ];
  } else {
    // * objectArray from TransactionBarChart
    const dates = getUniqueDates(objectArray, displayBy);

    return Object.keys(objectArray).map((item) => {
      const groupsTypeByDate = groupBy(objectArray[item], 'date', displayBy);
      const amount = sumReduce(objectArray[item]);
      const reduceGroupAmountByDate = getXY(dates, groupsTypeByDate);

      return {
        name: `${item} ${formatCurrency(amount)}`,
        data: reduceGroupAmountByDate,
      };
    });
  }
}

export function unique(objectArray) {
  return [...new Set(objectArray)];
}

// export function unique(objectArray) {
//   return objectArray.filter(function (item, index) {
//     return objectArray.indexOf(item) === index;
//   });
// }

export function sumReduce(objects) {
  return objects
    .map((transaction) => transaction.amount)
    .reduce((prev, curr) => prev + curr, 0)
    .toFixed(2);
}

export function getAmount(prop) {
  return parseFloat(prop.split('$')[1].replace(/[^0-9.-]+/g, ''));
}

//================================|| HELPER FUNCTIONS ||================================//

function getDate(date) {
  return date.split('T')[0];
}

function startOf(date, displayBy) {
  date = displayBy === 'day' ? date : new Date(date.replace(/-/g, '/'));

  switch (displayBy) {
    case 'year':
      return format(startOfYear(date), 'yyyy-MM-dd');
    case 'month':
      return format(startOfMonth(date), 'yyyy-MM-dd');
    case 'week':
      return format(startOfWeek(date), 'yyyy-MM-dd');
    default:
      return date;
  }
}

function getXY(dates, groupsTypeByDate) {
  return dates.map((date) => {
    //* Object.keys(groupsTypeByDate).map... gives data for only existing dates in the category or type
    //* mapping dates to have equal date&value pair for all legend items
    //* otherwise bars just overlapping intead of stacking
    //* https://github.com/apexcharts/apexcharts.js/issues/860
    return {
      x: date,
      y: groupsTypeByDate[date] ? sumReduce(groupsTypeByDate[date]) : parseFloat(0).toFixed(2),
    };
  });
}

function getUniqueDates(objectArray, displayBy) {
  return unique(
    Object.values(objectArray)
      .map((item) => extractValue(item, 'date'))
      .flat()
      .map((date) => startOf(date, displayBy))
      .sort()
  );
}

function extractValue(arr, key) {
  return arr.filter((object) => key in object).map((object) => object[key]);
}
// console.log(extractValue([{name: 'bob'}, {name: 'jim'}, {name: 'sarah'}, {age: 100}], 'name'));
// ['bob', 'jim', 'sarah'];
