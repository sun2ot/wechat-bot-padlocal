/*
 * @Author: Yi Zhihang
 * @Create: 2022-03-31 20:32:44
 * @LastEditTime: 2022-03-31 20:42:21
 * @Description: 轮询获取微信对话开放平台签名
 */
const request = require("./index");

module.exports = {
  wx: "initial",
  getWX: async () => {
    this.wx = await request.getSignature();
    return this.wx;
  },
};
