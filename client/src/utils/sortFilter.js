export function filter(arr, query, order = '', orderBy = '') {
  const { type, category } = query;
 
  return arr
    ?.filter(function (el) {
      if (el.firstName) {
        // * filters userlist by firstName
        return el.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      }
      if (el.type) {
        // * filters transaction type
        return el.type.toLowerCase().indexOf(type.toLowerCase()) !== -1;
      }
      // * dashboard items filters type before use this function
      return el;
    })
    .filter(function (el) {
      if (el.firstName) {
        // * no additional filter for userlist
        return el;
      } else {
        // * filters transaction category
        return category.length ? category.includes(el.category) : el;
      }
    })
    .slice()
    .sort(getComparator(order, orderBy));
}

// * isVerified from userlist returns boolean
// * amounts from transactions returns number
function lower(prop) {
  return ['boolean', 'number'].includes(typeof prop) ? prop : prop.toLowerCase();
}

function descendingComparator(a, b, orderBy) {
  // * names from userlist might start with lower case or upper case,
  // * lower() is for that
  if (lower(b[orderBy]) < lower(a[orderBy])) {
    return -1;
  }
  if (lower(b[orderBy]) > lower(a[orderBy])) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  if (order.length) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
  }
  return;
}
