/**
 * @digest 加入群聊模块
 * @author Hilbert Yi
 * @time 2022-01-10
 */
const config = require("../config");

async function onRoomJoin(room, inviteeList, inviter) {
  const nameList = inviteeList.map(c => c.name()).join(",");
  console.log(
    `Room ${await room.topic()} got new member ${nameList}, invited by ${inviter}`
  );
  const owner = room.owner();
  if (!owner) {console.log("room-join-err: get null room owner");}
  else {
    const ownerAlias = await owner.alias();
    // console.log(`ownerAlias: ${ownerAlias}\n${bot.userSelf() === owner}`); //debug
    if (ownerAlias === config.MYSELF || config.BOTNAME === owner.name()) {
      room.say(`恭迎[${nameList}] 莅临本界,有劳引渡使 [${inviter.name()}]`);
    }
  }
}

module.exports = onRoomJoin;
