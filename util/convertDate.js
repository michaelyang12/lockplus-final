function convertTime(predate) {
  const isoDate = predate.split(' ');
  const tempDate = isoDate[0].split('-');
  // fetch
  var year = String(tempDate[0]);
  var month = Number(tempDate[1]);
  var day = String(tempDate[2]);
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let retStr = months[month - 1] + ' ' + day + ', ' + year;
  return retStr;
}

export default convertTime;
