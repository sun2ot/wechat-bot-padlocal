/*
 * @author Hilbert Yi
 * @digest 消息监听
 * @time 2022-01-11
 */
const bot = require("../bot.js");
const { UrlLink } = require("wechaty");
const path = require("path");
const { FileBox } = require("file-box");
const request = require("../request");
const config = require("../config");
const reg = require("../config/RegularExpression");
const { colorRGBtoHex, colorHex } = require("../utils");
const moment = require("../utils/moment");
const schedule = require("../schedule");
const fs = require("fs");
const cipher = require("../utils/cipher");
const ImageHosting = require("../utils/Image-Hosting");
const wechatyPuppetPadlocal = require("wechaty-puppet-padlocal");

const allKeywords = config.KEYWORDS();

process.on("unhandledRejection", (error) => {
  console.log("g点重现: ", error.message);
});

/**
 * @function 中间件函数,延迟处理消息
 * @param {延迟时间ms} ms
 */
const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms)).catch((err) => {
    console.log("catch到：" + err.message);
  });

const urlReg =
  /(http(s)?:\/\/)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:[0-9]{1,5})?[-a-zA-Z0-9()@:%_\\\+\.~#?&//=]*$/g;

/**
 * @func 处理消息
 * @time Create 2022-01-09 10:45
 */
async function onMessage(msg) {
  //防止自己和自己对话
  if (msg.self()) return;

  const room = msg.room(); // 是否是群消息

  if (room) {
    const roomName = await room.topic();
    if (config.WEBROOM.includes(roomName)) {
      //属于被监听群聊
      console.log("群消息");
      //处理群消息
      await onWebRoomMessage(msg);
    } else return; 
  } else {
    //处理用户消息
    const isText = msg.type() === bot.Message.Type.Text;
    const isImg = msg.type() === bot.Message.Type.Image;
    if (isText || isImg) {
      await onPeopleMessage(msg);
    } 
  }
}

/**
 * @digest 处理用户消息
 * @time Modified 2022-01-09 18:37
 */
async function onPeopleMessage(msg) {
  const contact = msg.talker();
  console.log(`type: ${contact.type()}`);
  if (!(contact.type() === bot.Contact.Type.Individual))
    return; //! 避免 机器人 与 微信公众号 相爱相杀
  const senderAlias = await contact.alias();
  console.log(`sender alias: ${senderAlias}`);  //debug
  const content = msg.text().trim(); // 消息内容 使用trim()去除前后空格

  //对config配置文件中 ignore的用户消息不必处理
  if (config.IGNORE.includes(senderAlias)) {
    console.log(`ignoring ${senderAlias}`); //debug
    return;
  }
  console.log("not ignore, continue...");   //debug
  /* 特权消息 */
  if (senderAlias === config.MYSELF) {

    if (msg.type() === bot.Message.Type.Image) {
      //todo 图像消息，触发图床功能
      const fileBox = await msg.toFileBox();
      const fileName = `${moment().format("X")}.jpg`; //! unix时间戳做文件名
      const filePath = path.join(__dirname, `../../picture-bed/uploads/${fileName}`); //! 绝对路径,存入图床
      await fileBox.toFile(filePath); //! 不指定，则默认为工作路径下
      //? bug: const url = await ImageHosting.upload(filePath);
      const url = `http://${config.SERVER}:1255/pic/${fileName}`;
      console.log(`url is: ${url}`);//debug
      await delay(200);
      await msg.say(url);
      return true;
    }

    if (content === "刷新") {
      try {
        wechatyPuppetPadlocal.syncContact(); //! 极度慎用！！！
        await bot.Contact.findAll(); 
        await delay(200);
        msg.say('refresh success');
      } catch (err) {
        console.log("fresh err");
        console.log(err);
      }
      return true;
    }

    // 定时消息模块
    if (content.includes("定时")) {
      console.log("定时"); //debug
      const remain = content.replace("定时", "").trim(); // 除开指令文本

      const timeAndStr = remain.split(" "); // 时间和消息内容

      const timeStr = timeAndStr[0].split("."); // 精确时间
      const txt = timeAndStr[1]; // 消息文本
      const target = timeAndStr[2]; // 收信人备注
      const date = schedule.scheduleMsg(timeStr);

      schedule.setSchedule(
        date,
        async function (txt, target) {
          const contact = await bot.Contact.find({ alias: target }); // 收信人
          if (contact === null) msg.say(`没有备注为${target}的联系人`);
          else {
            console.log(`向${contact.name()}发送'${txt}'`);
            contact.say(txt);
          }
        }.bind(this, txt, target)
      );
      return true;
    } 
    
    //密码簿模块
    else if (content.includes("map")) {
      // pattern: map key value
      let command = content.replace("map", "").trim();
      command = command.split(" ");
      let key = command[0];
      key = cipher.md5(key); // 文件名加密
      let value = command[1];
      value = cipher.aes128(value); // 文件加密
      console.log("writefile:  " + value); //debug
      fs.writeFile(path.join(__dirname, "/../password", key), value, (err) => {
        if (err) console.error("writeFileErr: " + err);
        else msg.say('记录成功!');
      });
      return true;
    } else if (content.includes("get")) {
      // pattern: get key
      let key = content.replace("get", "").trim();
      key = cipher.md5(key);
      fs.readFile(path.join(__dirname, "/../password", key), (err, data) => {
        if (err) console.error("readFileErr: " + err);
        const detail = cipher.unaes128(data.toString()); //文件解密
        console.log("readfile:  " + detail); // debug
        msg.say(detail);
      });
      return true;
    }

    //拜年模块
    else if (content.includes("节日")) {
      //pattern: 节日 时间 联系人备注列表 通用祝福语
      //demo: 节日 1.29.12.3.5 父皇，母后 新年快乐
      console.log("节日"); //debug
      const detail = content.replace("节日", "").trim();
      const slice = detail.split(" ");

      const timeStr = slice[0].split(".");
      const contactList = slice[1].split("，"); //备注list
      const greeting = slice[2];
      const date = schedule.scheduleMsg(timeStr); //格式化为date对象

      schedule.setSchedule(
        date,
        async function (contactList, greeting) {
          for (let i = 0; i < contactList.length; i++) {
            const contact = await bot.Contact.find({
              alias: contactList[i]
            });
            if (!contact) {msg.say(`未找到备注为${contactList[i]}的联系人`)}
            else {
              const word = `${contactList[i]},${greeting}`; //xxx,节日祝福语
              contact.say(word);
            }
          }
        }.bind(this, contactList, greeting)
      );
      return true;
    }

    //添加屏蔽用户
    else if (reg.IGNORE.test(content)) {
      console.log('add ignore');
      const targetAlias = content.replace("屏蔽", "").trim();
      // const targetContact = bot.Contact.find({alias: targetAlias});
      config.IGNORE.push(targetAlias);
      console.log('添加成功!');
      return true;
    }

    //解除屏蔽
    else if (reg.UN_IGNORE.test(content)) {
      console.log('delete ignore');
      const targetAlias = content.replace("解除屏蔽", "").trim();
      config.IGNORE.splice(config.IGNORE.indexOf(targetAlias), 1);
      console.log('已解除!');
      return true;
    }
  }

  /* 普通消息 */
  if (content === "菜单") {
    await delay(200);
    await msg.say(allKeywords); // 展示菜单
    return;
  } else if (content === "打赏") {
    // 收款二维码
    const fileBox = FileBox.fromFile(path.join(__dirname, "../imgs/pay.jpg"));
    await msg.say("老板大气!!!老板恭喜发财!!!");
    await delay(200);
    await msg.say(fileBox);
    return;
  } else if (config.WEBROOM.includes(content) || parseInt(content) === 1) {
    if (parseInt(content) === 1) {
      await delay(200);
      await msg.say('请问你具体想要加入哪个群?请回复群名');
      return;
    }
    const webRoom = await bot.Room.find({
      topic: content, // 搜索群名对应的群
    });

    if (webRoom) {
      try {
        await delay(200);
        await webRoom.add(contact);
      } catch (e) {
        console.log("add to room: ", +e);
      }
      return;
    } else {
      await delay(200);
      await msg.say('你发送的群名似乎不存在,请与菜单中群名的核实');
      return;
    }
  } else if (content === "毒鸡汤" || parseInt(content) === 2) {
    let soup = await request.getSoup();
    await delay(200);
    await msg.say(soup);
    return;
  } else if (content === "神回复" || parseInt(content) === 3) {
    const { title, content } = await request.getGodReply();
    await delay(200);
    await msg.say(`标题：${title}\n--------------------\n神回复：${content}`);
    return;
  } else if (content === "每日英语" || parseInt(content) === 4) {
    const { en, zh } = await request.getEnglishOne();
    await delay(200);
    await msg.say(`en：${en}\n--------------------\nzh：${zh}`);
    return;
  } else if (content === "全网热点" || parseInt(content) === 5) {
    const hots = await request.getHot();
    let hotStr = ``;
    for (let i = 0; i < hots.length; i++) {
      hotStr =
        hotStr + `标题：${hots[i].title}\n热搜指数：${hots[i].hotnum}\n摘要：`;
      if (hots[i].digest === null) {
        hotStr = hotStr + `暂无\n------------------------------\n`;
      } else {
        hotStr = hotStr + `${hots[i].digest}\n------------------------------\n`;
      }
    }
    await delay(200);
    await msg.say(hotStr);
    return;
  } else if (content === "对本条消息存在疑惑" || parseInt(content) === 99) {
    await delay(200);
    await msg.say(`当前微信账户正挂载于第三方服务器，目的是测试本人的毕业设计《基于Node.js和Wechaty的个人微信机器人》\n
请不要频繁调用“菜单”列出的功能！！！\n该系统不会影响我即时准确收到您的微信消息，待我看到后会第一时间回复您，请不要着急！！！`);
    return;
  } else if (content === "怎么办" || content === "我有一个问题") {
    //发送链接卡片  web版协议不可用。
    const urlLink = new UrlLink({
      description: "Grass Mud horse, can't you Baidu?！",
      thumbnailUrl: `https://s2.loli.net/2022/01/09/iFqzXfYhSO2vKt3.jpg`,
      title: "What's your problem?",
      url: "https://www.baidu.com",
    });
    await delay(200);
    await msg.say(urlLink);
    return;
  } else if (content === "客服" || parseInt(content) === 6) {
    const contactCard = await bot.Contact.find({ alias: config.MYSELF });
    await msg.say(contactCard);
    return;
  } else {
    // 转入utils/AI消息
    const isUtil = await onUtilsMessage(msg);

    if (!isUtil) {
      // 非utils消息，转由AI回复
      console.log("AI will answer"); // debug
      const signature = await request.getSignature();
      const answer = await request.getAnswer(
        signature,
        contact.id,
        msg.text()
      );
      await delay(200);
      await msg.say(answer);
      return;
    }
  }
}

/**
 * @func 处理群消息
 * @param {消息对象} msg
 * @time Modified 2022-01-09 23:17
 */
async function onWebRoomMessage(msg) {
  const isText = msg.type() === bot.Message.Type.Text;

  if (isText) {
    // 响应文本消息
    const contact = msg.talker();
    const sender = await contact.alias();
    const content = msg.text().trim();

    /* 特权消息 */
    if (sender === config.MYSELF) {
      // 踢人功能  群里发送  踢@某某某  即可
      if (content.includes("踢@")) {
        //如果是机器人好友且备注是自己的大号备注  才执行踢人操作
        // edit at 0109：备注无法获取是因为要等官方后台数据刷新才行。踢人要管理员权限
        if (contact.friend()) {
          const delName = content.replace("踢@", "").trim();
          console.log("踢出" + delName); // debug
          const delContact = await room.member({ name: delName });
          await room.del(delContact);
          await msg.say(`<${delName}>已被移除群聊。且聊且珍惜啊！`);
        }
        return;
      }
    }

    /* 普通群友消息 */
    if (content === `@${config.BOTNAME}\u2005毒鸡汤`) {
      let poison = await request.getSoup();
      await delay(200);
      await msg.say(poison);
      return;
    } else if (content === `@${config.BOTNAME}\u2005每日英语`) {
      const res = await request.getEnglishOne();
      await delay(200);
      await msg.say(
        `en：${res.en}\n---------------------------\nzh：${res.zh}`
      );
      return;
    } else if (content === `@${config.BOTNAME}\u2005怎么办`) {
      //发送链接卡片  web版协议不可用。
      const urlLink = new UrlLink({
        description: "Grass Mud horse, can't you Baidu?！",
        thumbnailUrl: `https://s2.loli.net/2022/01/09/iFqzXfYhSO2vKt3.jpg`,
        title: "What's your problem?",
        url: "https://www.baidu.com",
      });
      await msg.say(urlLink);
      return;
    }

    // 检验链接消息合法性
    else if (urlReg.test(msg.text())) {
      urlReg.lastIndex = 0; // 索引重置

      const testUrl = urlReg.exec(msg.text());

      const valid = await request.checkUrl(testUrl[0]);
      if (!valid) {
        const room = msg.room();
        // const master = await room.member(config.BOTNAME);
        await room.say(
          `@${msg
            .from()
            .name()} 为了群主与众管理员的法律安全，本群禁止发送不明链接!!!`
        );
        console.log("链接不合法");
        return true;
      }
      return;
    }

    // 群消息转向AI/utils消息处理
    else {
      if (content.includes(`@${config.BOTNAME}\u2005`)) {
        console.log("AI will answer"); // debug
        const signature = await request.getSignature();
        const answer = await request.getAnswer(
          signature,
          contact.id,
          msg.text().replace(`@${config.BOTNAME}\u2005`, "")
        );
        await delay(200);
        await msg.say(answer);
        return;
      } else {
        await onUtilsMessage(msg);
      }
    }
  }
}

/**
 * @func utils消息处理
 * @time Modified 2022-01-10 16:12
 */
async function onUtilsMessage(msg) {

  const isText = msg.type() === bot.Message.Type.Text;

  if (isText) {
    let content = msg.text().trim(); // 消息内容

    if (content.indexOf("转大写") === 0) {
      try {
        const str = content.replace("转大写", "").trim().toUpperCase();
        await msg.say(str);
      } catch (error) {
        await msg.say("转换失败，请检查");
      }
      return true;
    } else if (content.indexOf("转小写") === 0) {
      try {
        const str = content.replace("转小写", "").trim().toLowerCase();
        await msg.say(str);
      } catch (error) {
        await msg.say("转换失败，请检查");
      }
      return true;
    }

    // rgb to hex
    else if (content.indexOf("转16进制") === 0) {
      try {
        const color = colorRGBtoHex(content.replace("转16进制", "").trim());
        await msg.say(color);
      } catch (error) {
        console.error(error);
        await msg.say("转换失败，请检查");
      }
      return true;
    }

    // hex to rgb
    else if (content.indexOf("转rgb") === 0) {
      try {
        const color = colorHex(content.replace("转rgb", "").trim());
        await msg.say(color);
      } catch (error) {
        console.error(error);
        await msg.say("转换失败，请检查");
      }
      return true;
    } else if (content.includes("天气")) {
      try {
        let cityName = content.replace("天气", "").trim(); // 城市名
        const { city, realtime, future } = await request.getWeather(
          cityName
        );
        // 当天
        let weatherStr = `城市：${city}\n${moment().format("MM月DD日")}：${
          realtime.temperature
        }度  ${realtime.info}\n`;
        weatherStr += `----------\n未来五天   天气预报\n----------\n`;
        // 预报后面五天
        for (let i = 1; i <= 5; i++) {
          weatherStr =
            weatherStr +
            `${moment().add(i, "d").format("MM月DD日")}：${
              future[i - 1].temperature
            }度  ${future[i - 1].weather}\n`;
        }
        await delay(200);
        await msg.say(weatherStr);
      } catch (error) {
        msg.say("请输入[城市名 天气]");
      }
      return true;
    } else if (content === "全国肺炎") {
      try {
        const res = await request.getChinaFeiyan();
        const chinaTotal = res.data.chinaTotal.total;
        const chinaToday = res.data.chinaTotal.today;
        const str = `全国新冠肺炎实时数据：
确诊：${chinaTotal.confirm}
  较昨日：${
    chinaToday.confirm > 0 ? "+" + chinaToday.confirm : chinaToday.confirm
  }
疑似：${chinaTotal.suspect}
  较昨日：${
    chinaToday.suspect > 0 ? "+" + chinaToday.suspect : chinaToday.suspect
  }
死亡：${chinaTotal.dead}
  较昨日：${chinaToday.dead > 0 ? "+" + chinaToday.dead : chinaToday.dead}
治愈：${chinaTotal.heal}
  较昨日：${chinaToday.heal > 0 ? "+" + chinaToday.heal : chinaToday.heal}
----------------------------
数据采集于网易，如有问题，请及时联系`;
        await delay(200);
        msg.say(str);
      } catch (error) {
        msg.say("接口错误");
      }
      return true;
    }

    // 省/自治区 肺炎数据
    else if (content.includes("肺炎")) {
      let newContent = content.replace("肺炎", "").trim(); // 城市名
      if (config.PROVINCE.includes(newContent)) {
        const data = await request.getProvinceFeiyan(newContent);
        let citystr = `名称  确诊  治愈  死亡\n`;
        data.city.forEach((item) => {
          citystr =
            citystr +
            `${item.name}  ${item.conNum}  ${item.cureNum}  ${item.deathNum}\n`;
        });
        const str = `${newContent}新冠肺炎实时数据：
确诊：${data.value}
  较昨日：${data.adddaily.conadd}
死亡：${data.deathNum}
  较昨日：${data.adddaily.deathadd}
治愈：${data.cureNum}
  较昨日：${data.adddaily.cureadd}
---------------------------------
各地市实时数据：
${citystr}
---------------------------------
数据采集于新浪，如有问题，请及时联系`;
        await delay(200);
        msg.say(str);
      }
      return true;
    } else {
      return false; // 不是utils消息
    }
  } else {
    return false; // 是群消息,不是文本消息
  }
}

module.exports = onMessage;
