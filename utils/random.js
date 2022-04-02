/*
 * @Author: Yi Zhihang
 * @Create: 2022-04-02 14:00:13
 * @LastEditTime: 2022-04-02 14:59:37
 * @Description: 生成随机字符
 */

/**
 * @func 随机0-max
 * @param {num} max 随机到的最大值
 * @returns
 */
const num = (max) => {
  return Math.floor(Math.random() * (max + 1));
};

const num3 = () => {
  const temp = Math.floor((Math.random() + 0.1) * 1000);
  return temp>1000?Math.floor(temp/10):temp;
}; //随机三位数

setInterval(() => {
  console.log(num3());
}, 1000);

const words = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

/**
 * @returns 随机字母
 */
const letter = () => {
  return words[num(26)];
};

module.exports = {
  num3,
  letter,
};
