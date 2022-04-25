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
const util = require('../utils');
const fs = require("fs");
const path = require("path");

/**
 * @digest 登录事件监听
 * @param {登录的微信用户} user
 */
async function onLogin(user) {
  console.log(`比庆元哥哥差一点点的${user}登录了`);
  //创建定时发送群消息任务
  await rolling();
  await rest();
  await backup();
}

/**
 * @func 定时群消息
 * @time 9:00
 */
async function rolling() {
  schedule.setSchedule(
    "group",
    {
      hour: 9,
      minute: 00,
    },

    async () => {
      const today = moment().format("MM月DD日"); //日期
      const poison = await request.getSoup(); //毒鸡汤
      const {realtime} = await request.getWeather('武汉');
      const str =
        `\n---------------\n` +
        `今天是${today},你毕业设计做完了吗?\n` +
        `---------------\n` +
        `${poison}\n` +
        `---------------\n` +
        `武汉天气：${realtime.temperature}℃ ${realtime.info}`;
      for (let i = 0; i < config.WEBROOM.length; i++) {
        const room = await bot.Room.find({
          topic: config.WEBROOM[i],
        });
        const contactList = await room.memberAll();
        await room.say(str, ...contactList);
      }
    }
  );
}

/**
 * @func 久坐提醒(30min/次)
 * @time 8:30-18:30
 */
async function rest() {
  schedule.setSchedule("rest1", { hour: 8, minute: 30 }, () => {

    util.log("久坐提醒已上线");

    schedule.setSchedule("start", "*/30 * * * *", async () => {
      util.log("time for rest");
      const master = await bot.Contact.find({ alias: config.MYSELF });
      master.say(`工作30min了，让眼睛休息下吧！`);
    });

    schedule.setSchedule(
      "rest2",
      { hour: 18, minute: 30 }, //晚上7点之后就没太阳了
      () => {
        const success = schedule.cancelJobName("start");
        console.log(success);
        util.log(success === true ? "久坐提醒已关闭" : "久坐提醒已失败");
      }
    );
  });
}

/**
 * @func 微信容灾备份措施
 * @time 每天24:10
 */
async function backup() {
  schedule.setSchedule("backup", {hour: 0, minute: 10}, async () => {
    util.log("backup file is being generated");
    const fileName = moment().format("YYYY-MM-DD") + ".txt";
    let writeStream = fs.createWriteStream(path.join(__dirname,'../backup',fileName)); //创建可写流
    writeStream.once("open", function() {
      util.log("stream open");
    });
    writeStream.once("close", function() {
      util.log("stream close");
    });
    const allContactList = await bot.Contact.findAll();
    for (let i=0; i<allContactList.length; i++) {
      if (allContactList[i].friend()) { //todo 朴素好友获取
        const contactData = `\nname: ${allContactList[i].name()}\n` + 
                            `alias: ${await allContactList[i].alias()}\n` + 
                            `number: ${allContactList[i].weixin()}\n`;
        writeStream.write(contactData);
      }
    }
    writeStream.close();
  });
}

module.exports = onLogin;
