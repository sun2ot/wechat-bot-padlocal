/**
 * @author Hilbert Yi
 * @time 2022-01-11
 * @digest 发送接口请求
 */

const superagent = require("../config/superagent");
const cheerio = require("cheerio");
const request = require("request");
const axios = require("axios");
const FormData = require("form-data");

const config = require("../config");

const ONE = "http://wufazhuce.com/"; // ONE的web版网站
const POISON = "https://8zt.cc/"; //毒鸡汤网站
const TXAPI = "http://api.tianapi.com/"; // 天行数据官网
const JUHEAPI = "http://apis.juhe.cn/"; // 聚合数据官网
const WXAI = "https://openai.weixin.qq.com/openapi/"; // 微信对话开放平台

const imgHosting = `http://${config.SERVER}:1255/upload`; //picture-bed图床

const TXAPI_KEY = config.TXAPI_TOKEN; // 天行key
const JUHEAPI_KEY = config.JUHEAPI_TOKEN; // 聚合key
const WXAI_TOKEN = config.WXAI_TOKEN; // 微信对话开放平台token

/**
 * @func 上传图片
 * @param {string} filePath
 * @returns 上传结果json
 */
async function upload(fileStream) {
  const formData = new FormData(); //! 设置上传格式为file
  formData.append("img", fileStream);
  const result = (
    await axios.post(
      // url
      imgHosting,
      // 参数列表
      formData,
      // 请求头配置
      {
        headers: {
          // 必须修改请求头Content-Type为multipart/form-data才能上传文件
          "Content-Type": "multipart/form-data",
        },
      }
    )
  ).data;
  return result;
}

/**
 * @function 获取API签名，2小时过期
 * @returns 签名
 * @tips 改为轮询
 */
async function getSignature() {
  const { signature } = (
    await axios.post(`${WXAI}sign/${WXAI_TOKEN}`, {
      userid: "anything", // 这里可以是任意值
    })
  ).data;
  return signature;
}

/**
 * @function 调用AI接口，获取答案
 * @param {签名} signature
 * @param {用户id} userid
 * @param {接收到的文本} text
 * @returns AI给出的答案
 */
async function getAnswer(signature, userid, text) {
  const { answer } = (
    await axios.post(`${WXAI}aibot/${WXAI_TOKEN}`, {
      signature: signature,
      userid: userid,
      query: text,
    })
  ).data;
  return answer;
}

/**
 * @function 判断链接是否能够访问
 * @param {要检测的链接} url
 * @returns 是/否 合法
 */
async function checkUrl(url) {
  try {
    let flag = await superagent.testUrl(url);
    return flag;
  } catch (err) {
    console.log("urlErr: " + err);
    return err;
  }
}

/**
 * @function 获取'一言'接口返回数据
 */
async function getOne() {
  try {
    let res = await superagent.req(ONE, "GET");
    let $ = cheerio.load(res.text);
    let todayOneList = $("#carousel-one .carousel-inner .item");
    let todayOne = $(todayOneList[0])
      .find(".fp-one-cita")
      .text()
      .replace(/(^\s*)|(\s*$)/g, "");
    return todayOne;
  } catch (err) {
    console.log("onewordErr:  ", err);
    return err;
  }
}

/**
 * @function 获取每日毒鸡汤
 */
async function getSoup() {
  try {
    let res = await superagent.req(POISON, "GET");
    let $ = cheerio.load(res.text);
    const content = $("#sentence").text();
    return content;
  } catch (err) {
    console.log("poisonErr: " + err);
    return err;
  }
}

/**
 * @function 获取全国肺炎数据
 */
async function getChinaFeiyan() {
  try {
    return await new Promise((resolve, reject) => {
      request.get(
        {
          url: `https://c.m.163.com/ug/api/wuhan/app/data/list-total?t=${new Date().getTime()}`,
        },
        function (err, response) {
          if (err) {
            reject(err);
          }
          const res = JSON.parse(response.body);
          resolve(res);
        }
      );
    });
  } catch (error) {
    return console.log("caught", error.message);
  }
}
/**
 * @function 获取省份/自治区肺炎数据
 */
async function getProvinceFeiyan(name) {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: `https://gwpre.sina.cn/interface/fymap2020_data.json?t=${new Date().getTime()}`,
      },
      function (err, response) {
        if (err) {
          reject(err);
        }
        try {
          const res = JSON.parse(response.body);
          res.data.list.forEach((item) => {
            if (name === item.name) {
              resolve(item);
              return;
            }
          });
        } catch (error) {
          reject(err);
        }
      }
    );
  }).catch((error) => console.log("caught", error.message));
}

/**
 * @function 获取神回复
 */
async function getGodReply() {
  const url = TXAPI + "godreply/index";
  try {
    let res = await superagent.req(url, "GET", {
      key: TXAPI_KEY,
    });
    let content = JSON.parse(res.text);
    if (content.code === 200) {
      return content.newslist[0];
    } else {
      console.log("获取接口失败", content.msg);
    }
  } catch (err) {
    console.log("获取接口失败", err);
  }
}

/**
 * @function 获取每日英语
 */
async function getEnglishOne() {
  const url = TXAPI + "ensentence/index";
  try {
    let res = await superagent.req(url, "GET", {
      key: TXAPI_KEY,
    });
    let content = JSON.parse(res.text);
    if (content.code === 200) {
      return content.newslist[0]; //en英文  zh中文
    } else {
      console.log("获取接口失败", content.msg);
    }
  } catch (err) {
    console.log("获取接口失败", err);
  }
}

/**
 * @function 获取全网热点新闻
 */
async function getHot() {
  const url = TXAPI + "networkhot/index";
  try {
    let res = await superagent.req(url, "GET", {
      key: TXAPI_KEY,
    });
    let content = JSON.parse(res.text);
    if (content.code === 200) {
      // console.log(content.newslist);
      const hots = [];
      for (let i = 0; i < 3; i++) {
        hots[i] = content.newslist[i];
      }
      return hots; // 共计30条,取3条
    } else {
      console.log("获取接口失败", content.msg);
    }
  } catch (err) {
    console.log("获取接口失败", err);
  }
}

/**
 * @function 获取天气预报
 */
async function getWeather(cityName) {
  const url = JUHEAPI + "simpleWeather/query";
  try {
    let res = await superagent.req(url, "GET", {
      city: cityName,
      key: JUHEAPI_KEY,
    });
    const content = JSON.parse(res.text);
    if (content.error_code === 0) {
      // console.log(content.reason); // debug
      return content.result; // 包含city, realtime, future
    } else {
      console.log("不存在的城市：" + content.reason);
    }
  } catch (err) {
    console.log("获取天气接口失败", err);
  }
}

module.exports = {
  getOne,
  getSoup,
  getChinaFeiyan,
  getProvinceFeiyan,
  getGodReply,
  getEnglishOne,
  getHot,
  getWeather,
  checkUrl,
  getSignature,
  getAnswer,
  upload,
};
