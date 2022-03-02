/**
 * @digest 登录模块
 * @author Hilbert Yi
 * @time 2022-01-10
 */
const schedule = require("../schedule");
const config = require("../config");
const moment = require("../utils/moment");
const request = require("../request");
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
 * @func 10:25定时给指定群发送消息
 */
async function rolling() {
  schedule.setSchedule(
    moment().format("X"),
    {
      hour: 9,
      minute: 00,
    },

    async () => {
      const today = moment().format("MM月DD日"); //日期
      const poison = await request.getSoup(); //毒鸡汤
      const str = `今天是${today},你毕业设计做完了吗?\n${poison}`;
      for (let i=0; i<config.WEBROOM.length; i++) {
        const room = await bot.Room.find({
          topic: config.WEBROOM[i],
        });
        const contactList = await room.memberAll()
        await room.say(str, ...contactList);
      }
    }
  );
}

module.exports = onLogin;
