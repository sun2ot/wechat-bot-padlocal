/**
 * @digest 退群
 * @author Hilbert Yi
 * @time 2022-01-10
 */
async function onRoomLeave(room, leaverList) {
  const nameList = leaverList.map(c => c.name()).join(",");
  console.log(`Room ${room.topic()} lost member ${nameList}`);
}

module.exports = onRoomLeave;
