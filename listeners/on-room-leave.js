/**
 * @digest 退群
 * @author Hilbert Yi
 * @time 2022-01-10
 */
const bot = require("../bot.js");
const config = require("../config");

async function onRoomLeave(room, leaverList) {
  const nameList = leaverList.map((c) => c.name()).join(",");
  console.log(`Room ${await room.topic()} lost member ${nameList}`);
  const master = await bot.Contact.find({
    alias: config.MYSELF,
  });
  const owner = room.owner();
  if (!owner) {console.log("room-join-err: get null room owner");}
  else {
    const ownerAlias = await owner.alias();
    // console.log(`ownerAlias: ${ownerAlias}\n${bot.userSelf() === owner}`); //debug
    if (ownerAlias === config.MYSELF || config.BOTNAME === owner.name()) {
      master.say(`[${nameList}] 退出了群聊 [${await room.topic()}]`);
    }
  }
  
}

module.exports = onRoomLeave;
