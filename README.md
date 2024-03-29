[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg)](https://wechaty.js.org)　[![Wechaty Contributor Program](https://img.shields.io/badge/Wechaty-Contributor%20Program-green.svg)](https://wechaty.js.org/docs/contributor-program)

> 如果您是在gitee看到这个repo，README.md中的图片看不了是因为甜蜜的gitee不支持外链图片。可前往[github仓库](https://github.com/yzh1255245824/wechat-bot-padlocal)查看。

# Please note that

有问题请提交`issue`，我会及时回复的。

如果有使用上的问题，见[wiki](https://github.com/yzh1255245824/wechat-bot-padlocal/wiki)

--- 

## 一、关于iPad协议token的问题

1. :rotating_light:目前web协议的wechaty通常情况下已经无法使用（可自行百度网页版微信登陆尝试，能登上就可以用）
2. 基于UOS操作系统修改请求头的方式登录网页微信[https://wx.qq.com/](https://wx.qq.com/)的手段已经失效（腾讯已经给UOS上架全新的微信桌面端。。。）
3. 可通过[http://pad-local.com/](http://pad-local.com/)获取pad-local协议。新人可免费使用7天，之后是200元一个月。。。
4. 可通过成为Wechaty Contributor的方式，获取长达>=1年的免费token，见[《如何向wechaty投稿blog获取免费token【保姆级教程】》](https://www.yuque.com/docs/share/a652d172-420b-441a-8819-986ac0d20fc7?# )。
> 教程撰写不易，如果对您有帮助还请动动小手点个赞:bulb:

## 二、功能包括：

### 2.1 私聊消息处理：关键词回复，包括

![image.png](https://cdn.nlark.com/yuque/0/2022/png/10374984/1642080881372-700d60f3-706e-470a-841e-b290ac2a892a.png#clientId=ub9bf4024-6ca9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=351&id=ub6d550f2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=490&originWidth=1029&originalType=binary&ratio=1&rotation=0&showTitle=false&size=51620&status=done&style=none&taskId=ub0b58d9b-863f-41ff-9cdd-70227a121ff&title=&width=736.5)

- 在线实时数据获取服务由API服务商提供
  
  - 毒鸡汤
  
    ![IMG_20220115_210015.jpg](https://cdn.nlark.com/yuque/0/2022/jpeg/10374984/1642251790983-1f8ba6c7-9dfa-4303-a975-d4a4166cebf4.jpeg#clientId=uade48328-94f0-4&crop=0&crop=0&crop=1&crop=1&from=drop&height=98&id=u54d5bbf0&margin=%5Bobject%20Object%5D&name=IMG_20220115_210015.jpg&originHeight=390&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=62527&status=done&style=none&taskId=ud5d33a59-0b48-40ac-b12c-5b4c85b0903&title=&width=270.3999938964844)

  - 神回复
  
    ![image.png](https://cdn.nlark.com/yuque/0/2022/png/10374984/1642251891940-efb62c6d-872e-44be-bf67-6f1d546a1c19.png#clientId=uade48328-94f0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=97&id=uef8a95e6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=193&originWidth=1000&originalType=binary&ratio=1&rotation=0&showTitle=false&size=28530&status=done&style=none&taskId=u601f621f-73e7-42c7-a95e-1883548604a&title=&width=500)

  - 每日英语

    ![IMG_20220115_205958.jpg](https://cdn.nlark.com/yuque/0/2022/jpeg/10374984/1642251852399-ad4a37d8-dd79-423a-938a-c28d2f812c4e.jpeg#clientId=uade48328-94f0-4&crop=0&crop=0&crop=1&crop=1&from=drop&height=178&id=ue127576f&margin=%5Bobject%20Object%5D&name=IMG_20220115_205958.jpg&originHeight=788&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=170063&status=done&style=none&taskId=u0f8795f7-5065-4228-98fe-75d2e20fdcd&title=&width=243.39999389648438)

  - 全网热点

    ![image.png](https://cdn.nlark.com/yuque/0/2022/png/10374984/1642251912239-a0c0a2e7-41f9-410c-a795-87d535a0037f.png#clientId=uade48328-94f0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=262&id=u20b471ef&margin=%5Bobject%20Object%5D&name=image.png&originHeight=523&originWidth=1007&originalType=binary&ratio=1&rotation=0&showTitle=false&size=70178&status=done&style=none&taskId=uced61b64-ffeb-4c84-90d8-9bd7bbdd4c6&title=&width=503.5)

  - 城市天气

    ![IMG_20220115_210107.jpg](https://cdn.nlark.com/yuque/0/2022/jpeg/10374984/1642251746603-3d9e917b-c58d-41cb-9534-90403fa64d2c.jpeg#clientId=uade48328-94f0-4&crop=0&crop=0&crop=1&crop=1&from=drop&height=246&id=u259edc87&margin=%5Bobject%20Object%5D&name=IMG_20220115_210107.jpg&originHeight=991&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=156035&status=done&style=none&taskId=u85219df2-8a2d-4942-952f-8139ae1f0da&title=&width=268.3999938964844)

  - 客服
  
    ![image.png](https://cdn.nlark.com/yuque/0/2022/png/10374984/1642251938181-445a9ebc-0c56-4a5e-8c25-f15565ca7d4a.png#clientId=uade48328-94f0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=108&id=u8b0e0f95&margin=%5Bobject%20Object%5D&name=image.png&originHeight=215&originWidth=1040&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32890&status=done&style=none&taskId=u9cdde491-d654-4403-9ead-f7892e59a7f&title=&width=520)

- 文本处理功能由本地编写算法处理
  
  - 英文字符串转大/小写
  
    ![image.png](https://cdn.nlark.com/yuque/0/2022/png/10374984/1642251979526-8b4330b8-8c19-49cb-bf3e-3eab05cfe3ed.png#clientId=uade48328-94f0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=73&id=ueda379bb&margin=%5Bobject%20Object%5D&name=image.png&originHeight=145&originWidth=568&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17275&status=done&style=none&taskId=ua555ea14-7817-40d7-ac48-07ef89aee69&title=&width=284)

    ![image.png](https://cdn.nlark.com/yuque/0/2022/png/10374984/1642251999046-aa779af5-c111-4020-9601-8f1d7f70e9cd.png#clientId=uade48328-94f0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=66&id=u8cce8f06&margin=%5Bobject%20Object%5D&name=image.png&originHeight=127&originWidth=546&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16842&status=done&style=none&taskId=u7753cb2c-deb8-4b07-993c-42b018f9a04&title=&width=282)

  - rgb`<=>`hex

    ![image.png](https://cdn.nlark.com/yuque/0/2022/png/10374984/1642252053243-6a213ea2-9f36-4100-a02d-c7d02aa3ca66.png#clientId=uade48328-94f0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=63&id=u5355e26b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=125&originWidth=551&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17651&status=done&style=none&taskId=u95cf2447-2367-4e5e-9f0a-e55971597a6&title=&width=275.5)
    
    ![image.png](https://cdn.nlark.com/yuque/0/2022/png/10374984/1642252152039-68354e67-65cd-4c0b-9f6e-2914cc3f85c7.png#clientId=uade48328-94f0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=61&id=ufc69b0c7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=121&originWidth=544&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17431&status=done&style=none&taskId=u3dcafa3f-3598-410b-bdc9-c466c43da91&title=&width=272)

### 2.2 群管理

- 自动拉人入群
   - 通过私聊的快捷指令
- 快捷指令踢人
  `踢@用户名`可快速踢出群聊  
  ![image.png](https://cdn.nlark.com/yuque/0/2022/png/10374984/1642251396829-ce6fc1a3-e9b0-4db2-aae5-cf7bbf6ec043.png#clientId=uade48328-94f0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=168&id=j1jUV&margin=%5Bobject%20Object%5D&name=image.png&originHeight=610&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=266429&status=done&style=none&taskId=u4b74542c-592b-4384-be10-f9483a138f1&title=&width=298)
- 检测群内非法`url`并`@`提醒对方
  ![image.png](https://cdn.nlark.com/yuque/0/2022/png/10374984/1642251494789-d8cd7641-37f2-4785-a2d0-62ff491328f7.png#clientId=uade48328-94f0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=109&id=u2fc99faf&margin=%5Bobject%20Object%5D&name=image.png&originHeight=402&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=277595&status=done&style=none&taskId=u51312995-6e88-4cdd-a2c5-917d7aaec21&title=&width=293)

### 2.3 自动处理好友请求

- 自动通过好友请求
- 可限制通过填写指定验证消息的好友
  - 避免陌生人添加好友

### 2.4 智能对话（接入微信对话开放平台）

- 未被关键词捕获的消息将由**训练好的 AI **智能回复

### 2.5 设置定时任务(可循环、可单次）

- 定时发送群消息
  - 登录时创建任务
  - 暂不支持指令设置任务，只可通过修改源码

- 定时给个人发送消息  

  ![image.png](https://cdn.nlark.com/yuque/0/2022/png/10374984/1642080927687-f6ae10c7-5417-4b02-bb18-d09eab295415.png#clientId=ub9bf4024-6ca9-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=48&id=ue458a79d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=95&originWidth=405&originalType=binary&ratio=1&rotation=0&showTitle=false&size=9590&status=done&style=none&taskId=u07b63e4b-16e3-4c75-bad8-87bf04a0144&title=&width=202.5)  

  2022年1月14日4点0分0秒向备注为樊庆元的联系人发送“我刚学完，早安”

- 群发功能（可适用于多种节日）

  ![greeting.png](https://cdn.nlark.com/yuque/0/2022/jpeg/10374984/1643434323885-4ca3d81d-a9bd-42d4-a7f1-bdfdd1f4e88c.jpeg)

  加上备注作为称谓，就不会被看出是群发的啦~:sparkles:诚意MAX:sparkles:

- 定时消息销毁

  ![cancel](https://cdn.nlark.com/yuque/0/2022/png/10374984/1646113411665-1d874528-19ba-4ce6-bfb1-1a6bc45832e9.png)

  定时任务设置成功后会返回任务id，凭此可销毁任务

- :sparkles:休息提醒

  ![rest](https://cdn.nlark.com/yuque/0/2022/png/10374984/1646381288784-71256d95-6f22-4a5c-b7f7-4532c0689b04.png)

  在机器人正常运行时，每天上午9点启动，晚上7关闭（自动）。每隔半小时会提醒master休息一下，近视眼福音有木有:tada:
### 2.6 密码簿

该功能可用于记录常用的冗长文本，例如身份证号、银行卡号、购物时的好评模板等等。

- 通过指令`map key value`可记录标签为`key`，内容为`value`的密码（在`password`目录下生成文件）
  
  ![image.png](https://cdn.nlark.com/yuque/0/2022/png/10374984/1642252343505-1207f731-b5b1-4b7a-ace5-a8d05141dad7.png#clientId=uade48328-94f0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=47&id=uf8fab954&margin=%5Bobject%20Object%5D&name=image.png&originHeight=72&originWidth=251&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7637&status=done&style=none&taskId=u4914fd4b-aa4b-4585-83a6-220f2eec4c3&title=&width=162.5)

- 通过指令get key可以获取标签为key的密码
  
  ![image.png](https://cdn.nlark.com/yuque/0/2022/png/10374984/1642252356719-4d01df56-bf3a-4097-989f-2b8d799e2bb2.png#clientId=uade48328-94f0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=62&id=uef08770e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=123&originWidth=552&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16043&status=done&style=none&taskId=ucceff7d4-5b17-4026-952c-ccc55222170&title=&width=276)

- 文件加密
  
  - 文件名通过`md5`算法比对
  
  - 文件内容通过`aes-128-cbc`算法加密
    
    ![image.png](https://cdn.nlark.com/yuque/0/2022/png/10374984/1642250978600-073ca47a-d457-4871-9654-ceab710ac33e.png#clientId=uade48328-94f0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=65&id=u15ecefd6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=63&originWidth=320&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3442&status=done&style=none&taskId=ua5f42482-6211-48b6-bfa3-7154ed26a18&title=&width=332)

    ![image.png](https://cdn.nlark.com/yuque/0/2022/png/10374984/1642250992705-6ab643fb-8c03-4d23-b900-568cb0fad1cd.png#clientId=uade48328-94f0-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=106&id=ud60f823b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=121&originWidth=431&originalType=binary&ratio=1&rotation=0&showTitle=false&size=9476&status=done&style=none&taskId=u7811640f-a0cc-4979-b4de-139e317e33f&title=&width=377.5)

### 2.7 屏蔽指定联系人

- 可通过`屏蔽/解除屏蔽 联系人备注`的方式，在加载于内存中的屏蔽列表中进行增加/删除联系人【机器人重启后失效】

  ![屏蔽](https://cdn.nlark.com/yuque/0/2022/png/10374984/1645691431433-e7054944-9a5f-43e7-bedd-20fd0cdb4c73.png?x-oss-process=image%2Fresize%2Cw_220%2Climit_0)

### 2.8 监听群成员加入/退出

- 加入群聊，机器人会在群聊内公布加入者和邀请人的名称
  ![入群](https://cdn.nlark.com/yuque/0/2022/png/10374984/1645693130350-86b72a2c-d032-4ce2-8f08-c44b10dd52ac.png)

- 退出群聊，机器人会向机器人master发送消息，说明何人退出了何群
  ![退群](https://cdn.nlark.com/yuque/0/2022/png/10374984/1645693438916-3dcb9434-5296-4e9f-9abd-a8134fab700b.png)

### 2.9 图床

- 向机器人发送图片时，将触发图床功能，由机器人接收图片后将其上传至图床服务器
  ![图床](https://cdn.nlark.com/yuque/0/2022/png/10374984/1646729685695-e3b22456-5c94-4634-821a-f518bd22e02d.png)
  图片可在浏览器进行访问，也可以插入`markdown`文档

### 2.10 :sparkles::sparkles::sparkles:翻译

- 机器人已介入百度翻译平台，自行注册开发者并认证，可以获得每月200万字符量翻译，QPS能达到10。
  ![翻译](https://cdn.nlark.com/yuque/0/2022/png/10374984/1648901839728-a04023f7-4097-4df5-a64b-97c6d9494e16.png)

## 三、目录结构

- `config/`文件夹存放公共配置
- `imgs/`存放相关图片
- `password/` 存放密码簿生成文件
- `listeners/`存放机器人初始化后一系列事件处理(分模块) 
  - `on-friendship.js` 处理好友请求
  - `on-login.js` 处理登录
  - `on-message.js` 处理用户消息、群消息
  - `on-scan.js` 处理登录二维码
  - `on-room-join/leave` 处理用户加入/退出群聊
- `schedule/` 对定时任务`node-schedule`库进行了封装
- `superagent/` 存放所有的数据请求、接口封装都在此
- `utils/` 公用方法的封装
- `bot.js` 机器人实例文件
- `start.js` 入口文件

## 四、clone后请按照如下操作修改
需修改`config`配置，将里面的配置改为自己的。打开`config/`目录并新建`index.js` 文件， 文件内容如下：
```javascript
/*
 * @author Hilbert Yi
 * @digst:  全局配置config
 * @time: 2022-01-03 12:36
 */
const ignoreFile = require('./ignore.json');
module.exports = {
  SERVER: "", //服务器IP/域名

  PUPPET_TOKEN: "", // pad-local

  TXAPI_TOKEN: "", // 天行数据

  JUHEAPI_TOKEN: "", // 聚合数据

  WXAI_TOKEN: "", // 微信对话开放平台

  BAIDU_APPID: "",

  BAIDU_KEY: "",

  IGNORE: ignoreFile, //json文件:不需机器人回复的用户，填写用户备注，非昵称

  WEBROOM: ["test", "test2"], //要管理的群名称

  MYSELF: "mnb", //大号的备注，防止其他人冒充

  BOTNAME: "gjb", // 机器人的昵称

  PROVINCE: [
    "北京",
    "湖北",
    "广东",
    "浙江",
    "河南",
    "湖南",
    "重庆",
    "安徽",
    "四川",
    "山东",
    "吉林",
    "福建",
    "江西",
    "江苏",
    "上海",
    "广西",
    "海南",
    "陕西",
    "河北",
    "黑龙江",
    "辽宁",
    "云南",
    "天津",
    "山西",
    "甘肃",
    "内蒙古",
    "台湾",
    "澳门",
    "香港",
    "贵州",
    "西藏",
    "青海",
    "新疆",
    "宁夏",
  ],

  KEYWORDS: function () {
    return `回复序号或关键字获取对应服务
1.回复群名进入群聊：${this.WEBROOM}
2.毒鸡汤
3.神回复
4.每日英语
5.全网热点
6.全国肺炎
7.客服
------------------
翻译(例：翻译 [en] [zh] text)
转小写(例：转小写 YZHYYDS)
转大写(例：转大写 yzhyyds)
转rgb(例：转rgb #cccccc)
转16进制(例：转16进制 rgb(255,255,255))
城市名 天气(例：武汉 天气)
省份/自治区 肺炎(例：湖北 肺炎)
------------------\n`;
  },

  VIP: function() {
    return `密码簿\n(例：map test 123456\nget test)\n` + 
           `定时消息\n(例：定时 M.D.H.m.s 目标 信息)\n` +
           `群发消息\n(例：群发 M.D.H.m.s 目标1[，目标2] 信息)\n` +
           `销毁定时\n(例:销毁 id)\n` +
           `刷新联系人数据(!WARNING!)\n` +
           `[解除]屏蔽\n(例：屏蔽 张三(->备注))` +
           `持久化屏蔽\n(更新本地屏蔽联系人列表)`
  }
};
```

`token/key`获取操作如下：

- 官网注册账号
   - wechaty-puppet-padlocal 供应商：[http://pad-local.com/](http://pad-local.com/)
   - 天行数据官网 ：[https://www.tianapi.com/](https://tianapi.com/)  		
   - 聚合数据官网：[https://www.juhe.cn/](https://www.juhe.cn/) 
   - 微信对话开放平台：[https://openai.weixin.qq.com/](https://openai.weixin.qq.com/)
   - 百度翻译开放平台：[https://api.fanyi.baidu.com/](https://api.fanyi.baidu.com/)

- 注册成功后，申请以下接口： 
   - 天行数据 
      - [每日英语一句话](https://www.tianapi.com/apiview/62)
      - [神回复](https://www.tianapi.com/apiview/39)
      - [全网热搜榜](https://www.tianapi.com/apiview/223)
   - 聚合数据 
      -  [天气预报](https://www.juhe.cn/docs/api/id/73)


接口申请之后请打开`config/index.js`，将顶部`PUPPET_TOKEN`、`TXAPI_TOKEN`、`JUHEAPI_TOKEN`、`WXAI_TOKEN`改为自己的即可。 

其他免费接口可随意申请，也可以自行更换API服务商。

## 五、运行

**记得安装依赖**

```bash
npm install
```

```bash
npm start start.js
```

> 非常不建议使用`cnpm`，请自行百度`nrm`使用方法或者手动修改国内镜像。当然，执意要用的话请务必这么使用：
`cnpm i --by=npm`

如果部署于服务器，可使用PM2进行管理
```shell
[root@xx ~]# pm2 start start.js
```

---

启动后，终端会出现一个二维码，扫码登录即可。

> 控制台也许会打印多个二维码，扫一个耐心等待即可。如果确实没登上去再后面出来的。

> 退出登录后再重新登录时，你的手机会自动弹出iPad的登录请求，点击后耐心等待即可。如果确实没登上去再扫控制台的二维码登录。

若控制台打印的二维码是支离破碎的，无法扫描，请更换终端。
> 我在本机用的是`Windows Terminal`，ECS服务器用`tabby`连接。

---


## 六、更新日志

2022-04-02

- 上线翻译功能:globe_with_meridians:

2022-03-31

- 优化AI签名的获取，加入轮询机制
- 域名备案完成:ok_hand:

2022-03-29

- 支持将内存中修改过后的屏蔽联系人列表持久化到本地json文件

2022-03-08

- :art:优化控制台日志打印格式，带时间戳
- 修复了离线消息的处理问题（从离线状态恢复登录时，仅响应1分钟内收到的消息事件）

2022-03-04

- :sparkles:休息提醒功能上线

2022-03-01

- :sparkles:定时消息v2.1上线，支持创建/销毁定时任务
- :tada:密码簿现支持自定义密钥与初始化向量(16位utf8字符。需自行保存，丢失后文件将无法解密。)!

2022-02-24

- :bulb:现支持在线添加/删除屏蔽联系人列表（加载于内存，机器人重启后失效！如需持久化，请手动修改`config.js`）

2022-02-07

- :tada::tada::tada:图床功能上线

2022-02-05

- 联系人刷新（:rotating_light:极度慎用！！！有可能触发微信安全警告）

2022-01-29

- 添加节日祝福功能

2022-01-28

- bot实例重构，解决循环依赖的问题
- 可直接`npn i`安装依赖，彻底解决依赖版本的困扰

2022-01-25

- 接入网易疫情数据接口

2022-01-23

- 接入新浪疫情数据接口

2022-01-20

- 接入聚合数据API
- 天气信息

2022-01-18

- 部署于阿里云ECS服务器环境

2022-01-17

- 投稿blog，成为**Wechaty Contributors**

2022-01-15

- 每日英语

2022-01-12

- 毒鸡汤

2022-01-11

- 接入天行数据API
- 神回复

2022-01-03

- 更改`puppet`供应商，由`wechaty`（web协议）切换为`padlocal`（iPad协议）

2022-01-02

- hex转rgb
- rgb转hex

2022-01-01

- 英文字符串转大写
- 英文字符串转小写

2022-12-28

- 扫码登录

2021-11-23

- 代码热更新部署
