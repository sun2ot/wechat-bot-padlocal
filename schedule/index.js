/**
 * @author Hilbert Yi
 * @time 2022-01-12
 * @digest 定时任务 接口封装
 */
const schedule = require("node-schedule");
const moment = require("../utils/moment");
const bot = require("../bot.js");
const config = require("../config");
/**
 * 定时消息类型
 */
const SendMode = {
  SINGLE: 1, // 单发
  MULTIPLE: 2, // 群发
};

/**
 * @func 设置定时任务
 * @param {number} id 任务id
 * @param {Date} date 执行时间
 * @param {*} callback 任务函数
 */
function setSchedule(id, date, callback) {
  schedule.scheduleJob(id, date, callback);
}

/**
 * @function 根据文本指令格式化日期字符串
 * @param {string[]} timeStr 24小时制
 */
const formatDateStr = function (timeStr) {
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

/**
 * @func 设置定时消息
 * @param {number} mode 发送模式
 * @param {string} content 消息内容
 * @returns 定时任务id
 */
function scheduleMsg(mode, content) {
  const remain =
    mode === SendMode.SINGLE
      ? content.replace("定时", "").trim()
      : content.replace("群发", "").trim(); // 除开指令文本

  const detail = remain.split(" "); // 时间和消息内容

  const timeStr = detail[0].split("."); // 精确时间
  const target = 
    mode === SendMode.SINGLE 
      ? detail[1] 
      : detail[1].split("，"); // 联系人备注列表
  const txt = detail[2]; // 消息文本

  const date = formatDateStr(timeStr);
  console.log(`Timing ${date}`); //debug

  const jobId = moment().format("X"); //unin时间戳作为定时消息任务id,用于取消任务

  setSchedule(
    jobId,
    date,
    async function (target, txt, mode) {
      const master = await bot.Contact.find({
        alias: config.MYSELF
      });
      if (mode === SendMode.SINGLE) {
        const contact = await bot.Contact.find({
          alias: target
        });
        if (!contact) {
          console.log(`Timing contact is null, no ${target}`); // debug
          master.say(`定时任务:未找到备注为${target}的联系人`);
        } else 
          contact.say(txt);
      } else {
        for (let i = 0; i < target.length; i++) {
          const contact = await bot.Contact.find({
            alias: target[i]
          });
          if (!contact) {
            console.log(`Timing group contact is null, no ${target[i]}`); // debug
            master.say(`群发消息:未找到备注为${target[i]}的联系人`);
          } else {
            const word = `${target[i]},${txt}`; // xxx,群发消息
            contact.say(word);
          }
        }
      }
    }.bind(this, target, txt, mode)
  );

  return jobId;
}

/**
 * @func 销毁定时任务
 * @param {string} content 销毁指令 
 * @return {boolean} 是否销毁成功
 */
function cancelJob(content) {
  const jobId = content.replace("销毁", "").trim();
  const status = schedule.cancelJob(jobId);
  console.log(status === true ? `销毁 ${jobId}` : `销毁失败`); // debug
  return status;
}

module.exports = {
  SendMode,
  setSchedule,
  scheduleMsg,
  cancelJob,
};
