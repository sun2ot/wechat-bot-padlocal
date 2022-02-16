/*
 * @Author: Yi Zhihang
 * @Create: 2022-02-08 14:09:06
 * @LastEditTime: 2022-02-09 11:47:33
 * @Description: 图床
 */
const request = require("../request");
const fs = require("fs");
const path = require("path");

//todo
/**
 * @func 上传图片
 * @param {string} filePath
 * @returns 图床url
 */
// async function upload(filePath, fileName) {
//   try {
//     const fileStream = fs.createReadStream(filePath);
//     const result = await request.upload(fileStream);
//     console.log(result);//debug
//     const { code, status, imgUrl } = result;
//     if (code === 404) {
//       console.log(status); //? debug
//       return imgUrl;
//     } else if (code === 200) {
//       console.log(status); //? debug
//       return imgUrl;
//     } else {
//       console.log("unknown upload error!");
//       return "ggg";
//     }
//   } catch (err) {
//     console.log(`bot upload error: ${err}`);
//   }
// }

// module.exports = {
//   upload,
// };
