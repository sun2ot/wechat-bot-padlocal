/**
 * @author Hilbert Yi
 * @time 2022-01-12
 * @digest 定时任务 接口封装
 */

const schedule = require('node-schedule')
const moment = require('../utils/moment')

function setSchedule(date, callback) {
  schedule.scheduleJob(date, callback)
}

/**
 * @function 根据文本指令格式化日期字符串
 * @param {时间} timeStr 
 */
 const scheduleMsg = function (timeStr) {
  const timeLen = timeStr.length;

  if (timeLen === 3) {
    const date = new Date(
      moment().year(), // 本年
      parseInt(timeStr[0]) - 1, // 月份(-1)
      parseInt(timeStr[1]), // 日期
      parseInt(timeStr[2]) // 时
    );
    return date;
  } else if (timeLen === 4) {
    const date = new Date(
      moment().year(), // 本年
      parseInt(timeStr[0]) - 1, // 月份(-1)
      parseInt(timeStr[1]), // 日期
      parseInt(timeStr[2]), // 时
      parseInt(timeStr[3]) // 分
    );
    return date;
  } else if (timeLen === 5) {
    const date = new Date(
      moment().year(), // 本年
      parseInt(timeStr[0]) - 1, // 月份(-1)
      parseInt(timeStr[1]), // 日期
      parseInt(timeStr[2]), // 时
      parseInt(timeStr[3]), // 分
      parseInt(timeStr[4]) // 秒
    );
    return date;
  }
};

module.exports = {
  setSchedule,
  scheduleMsg
}
