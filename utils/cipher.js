/**
 * @digest 加密算法
 * @author Hilbert Yi
 * @time 2022-01-15
 */

const crypto = require("crypto");

/**
 * @func 文件名加密
 * @param {明文} str 
 * @returns 加密后的字符串
 */
const md5 = function (str) {
  const hash = crypto.createHash("md5");
  hash.update(str);
  return hash.digest("hex");
};

/**
 * @func 加密文件内容
 * @param {明文} data 
 * @returns 加密后的文件内容
 */ 
const aes128 = function (data, key="123456789abcdefg", iv="123456789abcdefg") {
  return encrypt(key, iv, data);
};

/**
 * @func 解密文件内容
 * @param {密钥} key 
 * @param {初始化向量} iv 
 * @param {密文} data 
 * @returns 
 */
const unaes128 = function (data, key="123456789abcdefg", iv="123456789abcdefg") {
  return decrypt(key, iv, data);
};

/**
 * @func aes-128-cbc加密算法封装
 * @param {密钥} key 
 * @param {初始化向量} iv 
 * @param {明文} data 
 * @returns 
 */
function encrypt(key, iv, data) {
  let cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  return cipher.update(data, "utf8", "base64") + cipher.final("base64");
}

/**
 * @func aes-128-cbc解密算法封装
 * @param {密钥} key 
 * @param {初始化向量} iv 
 * @param {密文} data 
 * @returns 
 */
function decrypt(key, iv, encrypted) {
  encrypted = Buffer.from(encrypted, "base64");
  let decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  return decipher.update(encrypted, "utf8") + decipher.final("utf8");
}

module.exports = {
  md5,
  aes128,
  unaes128,
};
