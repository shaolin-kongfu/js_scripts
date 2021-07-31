/*
shaolin-kongfu

软件名称：晶彩看点
赞赏:邀请码54870223 

万分感谢！！

[rewrite_local]

#看看赚
https://ant.xunsl.com/v5/nameless/adlickstart.json 重写目标 https://raw.githubusercontent.com/shaolin-kongfu/js_scripts/main/jckkz.js
https://ant.xunsl.com/v5/nameless/bannerstatus.json 重写目标 https://raw.githubusercontent.com/shaolin-kongfu/js_scripts/main/jckkz.js
https://ant.xunsl.com/v5/nameless/adlickend.json 重写目标 https://raw.githubusercontent.com/shaolin-kongfu/js_scripts/main/jckkz.js

[MITM]
hostname = ant.xunsl.com
*/
const $ = new Env("晶彩看点看看赚");
const notify = $.isNode() ? require('./sendNotify') : '';
message = ""
let remove = $.isNode() ? (process.env.remove ? process.env.remove : false) : ($.getdata("remove") ? $.getdata("remove") : false);

let lookbody= $.isNode() ? (process.env.lookbody ? process.env.lookbody : "") : ($.getdata('lookbody') ? $.getdata('lookbody') : "")
let lookbodyArr = []
let lookbodys = ""

let rewardbody= $.isNode() ? (process.env.rewardbody ? process.env.rewardbody : "") : ($.getdata('rewardbody') ? $.getdata('rewardbody') : "")
let rewardbodyArr = []
let rewardbodys = ""

let lookStartbody= $.isNode() ? (process.env.lookStartbody ? process.env.lookStartbody : "") : ($.getdata('lookStartbody') ? $.getdata('lookStartbody') : "")
let lookStartbodyArr = []
let lookStartbodys = ""

const lookheader = {
    'device-platform': 'android',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': '1183',
    'Host': 'ant.xunsl.com'
}

const rewardheader={
    'device-platform': 'android',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': '1199',
    'Host': 'ant.xunsl.com'
}

const lookStartheader={
    'device-platform': 'android',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': '1197',
    'Host': 'ant.xunsl.com'
}

 if (typeof $request !== "undefined") {
     getlookStartbody()
     getlookbody()
     getrewardbody()
     $.done()
 }

if (!lookStartbody) {
     $.msg($.name, '【提示】请点击看看赚某一任务并随便点击一篇文章，滑到底部，提示已看1篇，则获取body成功', '不知道说啥好', {
         "open-url": "给您劈个叉吧"
     });
     $.done()
 }
 else if (lookStartbody.indexOf("&") == -1) {
            lookStartbodyArr.push(lookStartbody)
 }
 else if (lookStartbody.indexOf("&") > -1) {
            lookStartbodys = lookStartbody.split("&")
 }
 else if (process.env.lookStartbody && process.env.lookStartbody.indexOf('&') > -1) {
            lookStartbodyArr = process.env.lookStartbody.split('&');
            console.log(`您选择的是用"&"隔开\n`)
 }
 else {
            lookStartbodys = [process.env.lookStartbody]
 };
    Object.keys(lookStartbodys).forEach((item) => {
        if (lookStartbodys[item]) {
            lookStartbodyArr.push(lookStartbodys[item])
        }
    })

 if (!lookbody) {
     $.msg($.name, '【提示】请点击看看赚某一任务并随便点击一篇文章，滑到底部，提示已看1篇，则获取body成功', '不知道说啥好', {
         "open-url": "给您劈个叉吧"
     });
     $.done()
 }
 else if (lookbody.indexOf("&") == -1) {
            lookbodyArr.push(lookbody)
 }
 else if (lookbody.indexOf("&") > -1) {
            lookbodys = lookbody.split("&")
 }
 else if (process.env.lookbody && process.env.lookbody.indexOf('&') > -1) {
            lookbodyArr = process.env.lookbody.split('&');
            console.log(`您选择的是用"&"隔开\n`)
 }
 else {
            lookbodys = [process.env.lookbody]
 };
    Object.keys(lookbodys).forEach((item) => {
        if (lookbodys[item]) {
            lookbodyArr.push(lookbodys[item])
        }
    })




 if (!rewardbody) {
     $.msg($.name, '【提示】请在看看赚下方提示完成6篇文章后，再次随便点击一篇文章，滑到底部，出现金币图标，则获取奖励body成功', '不知道说啥好', {
         "open-url": "给您劈个叉吧"
     });
     $.done()
 }
 else if (rewardbody.indexOf("&") == -1) {
            rewardbodyArr.push(rewardbody)
 }
 else if (rewardbody.indexOf("&") > -1) {
            rewardbodys = rewardbody.split("&")
 }
 else if (process.env.rewardbody && process.env.rewardbody.indexOf('&') > -1) {
            rewardbodyArr = process.env.rewardbody.split('&');
            console.log(`您选择的是用"&"隔开\n`)
 }
 else {
            rewardbodys = [process.env.rewardbody]
 };
    Object.keys(rewardbodys).forEach((item) => {
        if (rewardbodys[item]) {
            rewardbodyArr.push(rewardbodys[item])
        }
    })

!(async () => {
    console.log(`共${lookStartbodyArr.length}个看看赚激活body`)
	        for (let k = 0; k < lookStartbodyArr.length; k++) {
                $.message = ""
                lookStartbody1 = lookStartbodyArr[k];

                console.log(`--------第 ${k + 1} 次看看赚激活执行中--------\n`)
                    await lookStart()
                    await $.wait(5000);

                console.log("\n\n")
            }

        console.log(`共${lookbodyArr.length}个看看赚阅读body`)
	        for (let k = 0; k < lookbodyArr.length; k++) {
                $.message = ""
                lookbody1 = lookbodyArr[k];
//                 console.log(`${lookbody1}`)
                console.log(`--------第 ${k + 1} 次看看赚任务执行中--------\n`)
                for(let k = 0; k < 6; k++){
                    await lookstart()
                    await $.wait(10000);
                }
	    if(remove == true){
		await removebody()
	    console.log(`清空看看赚阅读和激活body完成`)
	    console.log(`共${lookbodyArr.length}个看看赚阅读body`)
	    console.log(`共${lookStartbodyArr.length}个看看赚激活body`)
	    }else{
	     	console.log("\n\n")
	    }
                console.log("\n\n")
            }



        date = new Date()
        if ($.isNode() &&date.getHours() === 11 && date.getMinutes()<10) {
            if (message.length !== 0) {
                   await notify.sendNotify("晶彩看点看看赚", `${message}\n\n shaolin-kongfu`);
            }
        } else {
            $.msg($.name, "",  message)
        }

    })()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


!(async () => {
console.log(`共${rewardbodyArr.length}个看看赚奖励body`)
if (lookbodyArr.length == rewardbodyArr.length) {
for(let k=0;k<rewardbodyArr.length;k++){
	rewardbody1 = rewardbodyArr[k];
            await $.wait(5000);
            await reward()
}
	}else{
                    console.log(`看看赚阅读数与奖励数不同，请注意获取奖励body\n`)
		
                    $.done()
                }
    })()

function removebody() {
  let smallbody = []
       lookbodyArr = smallbody
  lookStartbodyArr = smallbody
}

//获取看看赚激活body
function getlookStartbody() {
    if ($request.url.match(/\/nameless\/adlickstart/)) {
          bodyVal = $request.body
        if (lookStartbody) {
            if (lookStartbody.indexOf(bodyVal) > -1) {
                $.log("此看看赚任务请求已存在，本次跳过")
            } else if (lookStartbody.indexOf(bodyVal) == -1) {
                lookStartbodys = lookStartbody + "&" + bodyVal;
                $.setdata(lookStartbodys, 'lookStartbody');
                $.log(`${$.name}获取看看赚任务: 成功, lookStartbodys: ${bodyVal}`);
                bodys = lookStartbodys.split("&")
                $.msg($.name, "获取第" + bodys.length + "个看看赚任务请求: 成功🎉", ``)
            }
        } else {
            $.setdata(bodyVal, 'lookStartbody');
            $.log(`${$.name}获取看看赚任务: 成功, lookStartbodys: ${bodyVal}`);
            $.msg($.name, `获取第一个看看赚任务请求: 成功🎉`, ``)
        }
    }

  }
//获取看看赚阅读body
function getlookbody() {
    if ($request.url.match(/\/nameless\/bannerstatus/)) {
          bodyVal = $request.body
        if (lookbody) {
            if (lookbody.indexOf(bodyVal) > -1) {
                $.log("此看看赚请求已存在，本次跳过")
            } else if (lookbody.indexOf(bodyVal) == -1) {
                lookbodys = lookbody + "&" + bodyVal;
                $.setdata(lookbodys, 'lookbody');
                $.log(`${$.name}获取看看赚: 成功, lookbodys: ${bodyVal}`);
                bodys = lookbodys.split("&")
                $.msg($.name, "获取第" + bodys.length + "个看看赚请求: 成功🎉", ``)
            }
        } else {
            $.setdata(bodyVal, 'lookbody');
            $.log(`${$.name}获取看看赚: 成功, lookbodys: ${bodyVal}`);
            $.msg($.name, `获取第一个看看赚请求: 成功🎉`, ``)
        }
    }

  }
//获取看看赚奖励body
function getrewardbody() {
    if ($request.url.match(/\/nameless\/adlickend/)) {
          bodyVal = $request.body
        if (rewardbody) {
            if (rewardbody.indexOf(bodyVal) > -1) {
                $.log("此看看赚奖励请求已存在，本次跳过")
            } else if (rewardbody.indexOf(bodyVal) == -1) {
                rewardbodys = rewardbody + "&" + bodyVal;
                $.setdata(rewardbodys, 'rewardbody');
                $.log(`${$.name}获取看看赚奖励: 成功, rewardbodys: ${bodyVal}`);
                bodys = rewardbodys.split("&")
                $.msg($.name, "获取第" + bodys.length + "个看看赚奖励请求: 成功🎉", ``)
            }
        } else {
            $.setdata(bodyVal, 'rewardbody');
            $.log(`${$.name}获取看看赚奖励: 成功, rewardbodys: ${bodyVal}`);
            $.msg($.name, `获取第一个看看赚奖励请求: 成功🎉`, ``)
        }
    }

  }
//看看赚激活
function lookStart(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url : 'https://ant.xunsl.com/v5/nameless/adlickstart.json',
            headers : lookStartheader,
            body : lookStartbody1,}//xsgbody,}
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if(result.success === true ){
                    console.log('\n激活看看赚任务成功')
                }else{
                    console.log('\n激活看看赚任务失败')
                }
            } catch (e) {
            } finally {
                resolve()
            }
            },timeout)
    })
}
//看看赚阅读
function lookstart(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url : 'https://ant.xunsl.com/v5/nameless/bannerstatus.json',
            headers : lookheader,
            body : lookbody1,}//xsgbody,}
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if(result.success === true ){
                    console.log('\n浏览看看赚文章成功')
                }else{
                    console.log('\n浏览看看赚文章失败')
                }
            } catch (e) {
            } finally {
                resolve()
            }
            },timeout)
    })
}
//看看赚奖励
function reward(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url : 'https://ant.xunsl.com/v5/nameless/adlickend.json',
            headers : rewardheader,
            body : rewardbody1,}//xsgbody,}
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if(result.items.score !== "undefined" ){
                    console.log('\n看看赚获得：'+result.items.score + '金币')
                }else{
                    console.log('\n领取奖励失败')
                }
            } catch (e) {
            } finally {
                resolve()
            }
            },timeout)
    })
}


function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
