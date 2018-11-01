

// 获取某年某个月的天数
function getMondays (year, month) {
  let mday = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) mday[1] = 29;
  return mday[month - 1];
}

/**
 * 获取某一天是星期几
 * @param {int} y 年
 * @param {int} m 月
 * @param {int} d 第几天
 */
function weekNumber(y, m, d) {
  let wk = null;
  if (m <= 12 && m >= 1) {
    for (let i = 1; i < m; ++i) {
      d += getMondays(y, i);
    }
  }
  /*根据日期计算星期的公式*/
  wk = (y - 1 + (y - 1) / 4 - (y - 1) / 100 + (y - 1) / 400 + d) % 7;
  //0对应星期天，1对应星期一
  return parseInt(wk);
}

// 一个小时多少秒
function hourSecond () {
  return 3600
}

// 一天多少秒
function daySecond () {
  return 86400
}

// 上一个月的年份
function getLastMonthYear (y, m) {
  if (m === 1) {
    return y - 1
  } else {
    return y
  }
}
// 上一个月属于哪一月
function getLastMonth (m) {
  if (m === 1) {
    return 12
  } else {
    return m - 1
  }
}
// 下一个月份
function getNextMonth (m) {
  if (m === 12) {
    return 1
  } else {
    return m + 1
  }
}
// 下个月的年份
function getNextMonth (y, m) {
  if (m === 12) {
    return y + 1
  } else {
    return y
  }
}

function SetCalendar(year, month) {
  let daynumber = getMondays(year, month); //当月天数
  let firstnumber = weekNumber(year, month, 1); //当月第一天星期
  let lastnumber = weekNumber(year, month, daynumber); //当月最后一天星期
  /** 填空白格用 */
  // let lastMonth = getLastMonth(month); // 上一个月份
  // let lastMonYear = getLastMonthYear(year, month); // 上个月年份
  // let lastMonDay = getMondays(lastMonth); // 上个月有多少天
  // let nextMonth = getNextMonth(month);
  // let nextMonthYear = getLastMonthYear(year, month);
  /** */
  let weeknumber = (daynumber - (7 - firstnumber) - (lastnumber + 1)) / 7; //除去第一个星期和最后一个星期的周数
  let day = 1;
  let name;
  let calendar = '';
  calendar += '<table>';
  calendar += '<tr>';
  calendar += '<td>周日</td>';
  calendar += '<td>周一</td>';
  calendar += '<td>周二</td>';
  calendar += '<td>周三</td>';
  calendar += '<td>周四</td>';
  calendar += '<td>周五</td>';
  calendar += '<td>周六</td>';
  calendar += '</tr>';
  calendar += '<tr>';
  let i = 0;
  // 第一个星期(不补前面空格)
  for (i = 0; i < firstnumber; i++) {
    calendar += '<td></td>';
  }
  for (i = firstnumber; i < 7; i++) {
    name = year + '-' + month + '-' + day;
    calendar += '<td id="' + name + '">' + day + '</td>';
    day++;
  }
  calendar += '</tr>';
  let number = 0; //星期数，末尾添加空行用，统一样式。
   //其他星期
  for (i = 0; i < weeknumber; i++){
    calendar += '<tr>';
    for (let k = daynumber - (7 - firstnumber) - (weeknumber - 1) * 7; k < daynumber - (7 - firstnumber) - (weeknumber - 1) * 7 + 7; k++) {
      name = year + '-' + month + '-' + day;
      calendar += '<td id="' + name + '">' + day + '</td>';
      day++;
    }
    calendar += '</tr>';
    number++;
  }
  calendar += '<tr>';
  //最后一个星期
  for (i = 0; i < lastnumber + 1; i++){
    name = year + '-' + month + '-' + day;
    calendar += '<td id="' + name + '">' + day + '</td>';
    day++;
  }
  // 不补后面空格
  for (i = lastnumber + 1; i < 7; i++) {
    calendar += '<td>';
    calendar += '</td>';
  }
  calendar += '</tr>';
  if (number == 3) {
    calendar += '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
  }
  calendar += '</table>';
  return calendar;
}

// console.log(weekNumber(2018, 11, 1))
// console.log(SetCalendar(2018, 11))