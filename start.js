const login = require("./listeners/on-login");
const message = require("./listeners/on-message");
const scan = require("./listeners/on-scan");
const friendship = require("./listeners/on-friendship");
const roomJoin = require("./listeners/on-room-join");
const roomLeave = require("./listeners/on-room-leave");

const bot = require("./bot");

bot.on("login", login);

bot.on("message", message);

bot.on("scan", scan);

bot.on("friendship", friendship);

bot.on("room-join", roomJoin);

bot.on("room-leave", roomLeave);

bot
  .start()
  .then(() => console.log("开始登陆微信"))
  .catch(e => console.error(e));
