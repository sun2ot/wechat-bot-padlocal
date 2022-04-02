/*
 * @Author: Yi Zhihang
 * @Create: 2022-04-02 13:26:11
 * @LastEditTime: 2022-04-02 19:36:32
 * @Description: 翻译功能可选语言
 */
const from = {
    /**
     * 源语言支持auto
     */
    Auto: 'auto',
    English: 'en',
    Chinese: 'zh'
}

const to = {
    English: 'en',
    Chinese: 'zh',
    Japanese: 'jp'
}

let supportFrom = [];
let supportTo = [];
for (let key in from) {
    supportFrom.push(from[key]);
}
for (let key in to) {
    supportTo.push(to[key]);
}
// console.log(supportFrom);
// console.log(supportTo);

const analysis = (content) => {
    const command = content.split(' ');
    let fromLan, toLan, query = '';
    let indexFrom, indexTo = -1;
    if ((indexFrom = supportFrom.indexOf(command[1])) != -1 && command.length != 2) {
        // 翻译 en 你好
        if ((indexTo = supportTo.indexOf(command[2])) != -1 && command.length != 3) {
            // 翻译 en zh [你好]
            console.log('pattern 2');
            fromLan = supportFrom[indexFrom];
            toLan = supportTo[indexTo];
            query = content.replace(`翻译 ${fromLan} ${toLan}`, '').trim();
        } else {
            // 翻译 en zh你好
            console.log('pattern 3');
            fromLan = supportFrom[indexFrom];
            toLan = to.Chinese;
            query = content.replace(`翻译 ${fromLan}`, '').trim();
        }
    } else {
        // 翻译 你好 [...]
        console.log('pattern 1');
        fromLan = from.Auto;
        toLan = to.Chinese;
        query = content.replace('翻译', '').trim();
    }
    const result = {
        from: fromLan,
        to: toLan,
        query: query
    }
    return result;
}

module.exports = {
    from, to,
    supportFrom, supportTo,
    analysis
}