/**
 * @digest 处理好友关系模块
 * @author Hilbert Yi
 * @time 2022-01-10
 */

const { Friendship } = require("wechaty");

/**
 * 自动同意好友请求
 */
async function onFriendship(friendship) {
  if (friendship.type() === Friendship.Type.Receive) {
    await friendship.accept();
  }
}

module.exports = onFriendship
