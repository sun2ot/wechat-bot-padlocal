/**
 * @digest 登录模块
 * @author Hilbert Yi
 * @time 2022-01-10
 */
const schedule = require("../schedule");
const config = require("../config");
const moment = require("../utils/moment");
const superagent = require("../superagent");
const bot = require("../bot");

/**
 * @digest 登录事件监听
 * @param {登录的微信用户} user
 */
async function onLogin(user) {
  console.log(`比庆元哥哥差一点点的${user}登录了`);
  //创建定时发送群消息任务
  await rolling();
}

/**
 * @func 8点半定时给指定群发送消息
 */
async function rolling() {
  schedule.setSchedule(
    {
      hour: 8,
      minute: 30,
    },

    async () => {
      const room = await bot.Room.find({
        topic: config.WEBROOM,
      });
      const today = moment().format("MM月DD日");
      let poison = await superagent.getSoup(); //毒鸡汤
      const str = `今天是${today},你学废了吗?${poison}`;
      await room.say(str);
    }
  );
}

module.exports = onLogin;
