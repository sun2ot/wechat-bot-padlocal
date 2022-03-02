/**
 * @digest 加密算法
 * @author Hilbert Yi
 * @time 2022-01-15
 */

const crypto = require("crypto");

/**
 * @func 文件名加密
 * @param {string} str 文件名
 * @returns md5密文
 */
const md5 = function (str) {
  const hash = crypto.createHash("md5");
  hash.update(str);
  return hash.digest("hex");
};

const aes128 = function (data, key, iv) {
  return encrypt(key, iv, data);
};

const unaes128 = function (encrypted, key, iv) {
  return decrypt(key, iv, encrypted);
};

/**
 * @func aes-128-cbc加密算法封装
 * @param {string} key 密钥
 * @param {string} iv 初始化向量
 * @param {string} data 明文
 * @returns 密文
 */
function encrypt(key, iv, data) {
  let cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  let encrypted =
    cipher.update(data, "utf8", "binary") + cipher.final("binary");
  encrypted = Buffer.from(encrypted, "binary").toString("base64");
  return encrypted;
}

/**
 * @func aes-128-cbc解密算法封装
 * @param {string} key 密钥
 * @param {string} iv 初始化向量
 * @param {string} encrypted 密文
 * @returns 明文
 */
function decrypt(key, iv, encrypted) {
  encrypted = Buffer.from(encrypted, "base64").toString("binary");
  let decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  let decrypted =
    decipher.update(encrypted, "binary", "utf8") + decipher.final("utf8");
  return decrypted;
}

// map test 123456[ xxxx xxxx]
async function InCodebook(
  content,
  key = "123456789abcdefg",
  iv = "123456789abcdefg"
) {
  let command = content.replace("map ", ""); //* 注意空格
  command = command.split(" ");
  let name = command[0];
  name = md5(name); // 文件名加密
  let detail = command[1];
  command.length === 4 ? ((key = command[2]), (iv = command[3])) : null; //* 长度为4: 携带密钥与初始化向量
  detail = aes128(detail, key, iv); // 文件内容加密
  console.log(`writefile`); //debug
  return { filename: name, filecontent: detail };
}

// get test [xxxx xxxx]
async function OutCodebook(
  content,
  key = "123456789abcdefg",
  iv = "123456789abcdefg"
) {
  let command = content.replace("get ", ""); //* 注意空格
  command = command.split(" ");
  let name = md5(command[0]);
  command.length === 3 ? ((key = command[1]), (iv = command[2])) : null;
  console.log(`readfile`);
  return {filename: name, key: key, iv: iv};
}

module.exports = {
  aes128,
  unaes128,
  InCodebook,
  OutCodebook
};
