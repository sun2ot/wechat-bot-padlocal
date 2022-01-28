/**
 * @author Hilbert Yi
 * @time 2022-01-11
 * @digest 接口请求封装
 */

const superagent = require("superagent");

/**
 * @function API请求封装
 * @param {官网} url 
 * @param {请求类型} method 
 * @param {参数} params 
 */
function req(url, method, params) {
  return new Promise(function (resolve, reject) {
    superagent(method, url)
      .query(params)
      .set("Content-Type", "application/x-www-form-urlencoded")
      .end(function (err, response) {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
  });
}

/**
 * @function 链接测试请求封装
 * @param {待测试链接} url 
 */
function testUrl(url) {
  return new Promise(function (resolve) {
    superagent
      .get(url)
      .timeout({
        response: 5000, // Wait 5 seconds for the server to start sending
      })
      .end((err, res) => {
        if (err) {
          if (err.timeout) {
            console.log("timeout: " + err.timeout);  //debug
            resolve(false);
          } else {
            console.log("meaningless url"); //debug
            resolve(false);
          }
        } else {
          console.log("statusCode: " + res.statusCode); //debug
          resolve(true);
        }
      });
  });
}

module.exports = {
  req,
  testUrl
};
