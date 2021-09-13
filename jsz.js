/*

金银手指
原作者：柠檬

适配v2p和青龙，修复v2p运行偶现报错问题，需要依赖 crypto-js.js ，请将该文件放在脚本同级目录即可
crypto-js 文件地址：https://raw.githubusercontent.com/shaolin-kongfu/js_scripts/main/crypto-js.js
圈x请跑原作者脚本

青龙抓包以下链接的header
http://apponlie.sahaj.cn/user/myInfo
变量：jszhd


v2p配置重写如下：
***************************************************************************************************************
[rewrite]
http://apponlie.sahaj.cn/user/myInfo 重写目标 https://raw.githubusercontent.com/shaolin-kongfu/js_scripts/main/jsz.js
[task]
建议定时每十分钟跑一次 https://raw.githubusercontent.com/shaolin-kongfu/js_scripts/main/jsz.js
***************************************************************************************************************
活动地址：频道图片
食用方法：
1.先填写好上方的重写或打开抓包软件
2.微信扫图片二维码，会自动跳出文章，等待10s左右，点击返回，点击停止阅读即可

收益：只看文章的话，跑满每日12000金币（1.2元），被限制阅读另说
每满4000金币（4毛）微信自动提现

*/
// */10 * * * * https://raw.githubusercontent.com/shaolin-kongfu/js_scripts/main/jsz.js


// @grant    require
const $ = new Env('金手指阅读');
let status;
status = (status = ($.getval("jszstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
let jszhdArr = [],jszcount = ''
let jszhd= $.isNode() ? (process.env.jszhd ? process.env.jszhd : "") : ($.getdata('jszhd') ? $.getdata('jszhd') : "")
let jszhds = ""
const logs =0;
var timestamp = (new Date()).valueOf();
!(async () => {
  if (typeof $request !== "undefined") {
        await jszck()
  } else {
      if(!$.isNode()){
          jszhdArr.push($.getdata('jszhd'))
          let jszcount = ($.getval('jszcount') || '1');
          for (let i = 2; i <= jszcount; i++) {
            jszhdArr.push($.getdata(`jszhd${i}`))
            }
    console.log(`------------- 共${jszhdArr.length}个账号-------------\n`)
      for (let i = 0; i < jszhdArr.length; i++) {
        if (jszhdArr[i]) {
          jszhd = jszhdArr[i];
          $.index = i + 1;
          console.log(`\n开始【金手指阅读${$.index}】`)
            $.log("每日上限阅读50次 如已满 请明天再来")
            $.log("提现金额如果达标 将会自动提现")
            await myInfo()
            await task()
	    await $.wait(15000)

  }
}
      }else  {
          if (process.env.jszhd && process.env.jszhd.indexOf('@') > -1) {
            jszhdArr = process.env.jszhd.split('@');
            console.log(`您选择的是用"@"隔开\n`)
        } else {
            jszhds = [process.env.jszhd]
        };
        Object.keys(jszhds).forEach((item) => {
        if (jszhds[item]) {
            jszhdArr.push(jszhds[item])
        }
    })
          console.log(`共${jszhdArr.length}个cookie`)
	        for (let k = 0; k < jszhdArr.length; k++) {
                $.message = ""
                jszhd = jszhdArr[k]
                $.index = k + 1;
          console.log(`\n开始【金手指阅读${$.index}】`)
                $.log("每日上限阅读50次 如已满 请明天再来")
            $.log("提现金额如果达标 将会自动提现")
            await myInfo()
            await task()
	    await $.wait(15000)
            }
      }
  }
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())


function jszck() {
   if ($request.url.indexOf("myInfo") > -1) {
  const jszhd = JSON.stringify($request.headers)
if(jszhd)    $.setdata(jszhd,`jszhd${status}`)
  //const jszurl = JSON.stringify($request.url)
//if(jszurl)    $.setdata(jszurl,`jszurl${status}`)

$.log(jszhd)
//$.log(jszurl)

   $.msg($.name,"",'金手指'+`${status}` +'数据获取成功！')

}
}

async function myInfo(){
 return new Promise((resolve) => {
 let plant6_url = {
       url: `http://apponlie.sahaj.cn/user/myInfo`,
        headers: JSON.parse(jszhd),
        //body: `{"channel_id":188}`,

    }
   $.get(plant6_url,async(error, response, data) =>{
       //console.log(`${JSON.stringify(jszhd)}`)
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)

          if(result.code == 0){
         $.goldNow = result.data.goldNow
         console.log(`\n余额：`+result.data.goldNow)
         num = $.goldNow/4000*0.35

             $.log("可提金额："+num.toFixed(1))
            if($.goldNow>=4000){
            $.log("\n=====开始提现=====")
             txnum = $.goldNow/4000*0.35
             txnum = txnum.toFixed(1)
                const CryptoJS = require('./crypto-js')
          var key = CryptoJS.enc.Utf8.parse("5kosc7jy2w0fxx3s")
            var plaintText = `{"moneyPick":${txnum}}`
            var js = CryptoJS.AES.encrypt(plaintText, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
    })
             await $.wait(15000)
                await tx(js)
            }
} else {
              console.log(`\n数据获取失败`)
          }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
  }
async function taskSeq(type){
 return new Promise((resolve) => {


 let plant6_url = {
       url: `http://apponlie.sahaj.cn/sign/todayAwardGain?taskSeq=${type}`,
        headers: JSON.parse(jszhd),
        //body: `{"channel_id":188}`,

    }
   $.post(plant6_url,async(error, response, data) =>{
       //console.log(`${JSON.stringify(jszhd)}`)
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
          if(result.code == 0){
        console.log(`任务领取金币成功`)
} else {
       console.log(`\n今日任务奖励已领取明日再来`)
}
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      }
    })
   })
  }
async function task(){
 return new Promise((resolve) => {
 let plant6_url = {
       url: `http://apponlie.sahaj.cn/task/fetchTask?taskType=1`,
        headers: JSON.parse(jszhd),
        //body: `{"channel_id":188}`,

    }
   $.get(plant6_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)

          if(result.code == 0){
        taskId = result.data.taskId
        completeTodayCount = result.data.completeTodayCount
        completeTodayGold = result.data.completeTodayGold
        console.log(`今日获得金币：${completeTodayGold}\n阅读次数：${completeTodayCount}\n任务ID: ${taskId}`)

        if(completeTodayCount >= 25){
            await taskSeq(1)
        }
        if(completeTodayCount >= 50){
            await taskSeq(2)
            $.log("今日阅读次数已满 请明天再来")
           //$.log("\n=====开始提现=====")


        }else {
		const CryptoJS = require('./crypto-js')
          var key = CryptoJS.enc.Utf8.parse("5kosc7jy2w0fxx3s")
            var plaintText = `{"taskId":${taskId}}`
            var js = CryptoJS.AES.encrypt(plaintText, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
    })
	    if (taskId !== null){
             await $.wait(21000)
            await completeTask(js)
	    }else{
	    console.log('此账号已被限制阅读，请24小时后再跑脚本')
	    }

        }
} else {
       console.log(`\n数据获取失败或者  今日阅读次数已满 请明天再来`)
}
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }


async function completeTask(body){
 return new Promise((resolve) => {
tk = JSON.parse(jszhd)
token = tk.token
 let plant6_url = {
       url: `http://apponlie.sahaj.cn/task/completeTask`,
        headers: {
"Content-Type": "application/json;charset=UTF-8",
"Host": "apponlie.sahaj.cn",
"Origin": "http://dd.e-zine.top",
"Referer": "http://dd.e-zine.top",
"token": token,
"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.8(0x18000825) NetType/4G Language/zh_CN"},
        body: `${body}`,
    }
   $.post(plant6_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
          if(result.code == 0){
        console.log(`\n阅读完成 获得金币：${result.data.goldAward}`)
} else {
       console.log(`\n数据获取失败`)
}
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
async function tx(body){
 return new Promise((resolve) => {
tk = JSON.parse(jszhd)
token = tk.token

 let plant6_url = {
       url: `http://apponlie.sahaj.cn/user/pickAuto`,
        headers: {
"Content-Type": "application/json;charset=UTF-8",
"Host": "apponlie.sahaj.cn",
"Origin": "http://dd.e-zine.top",
"Referer": "http://dd.e-zine.top",

"token": token,
"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.8(0x18000825) NetType/4G Language/zh_CN"},
        body: `${body}`,
        
    }
   $.post(plant6_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        
          if(result.code == 0){
         
        console.log(`\n=====提现成功=====`)

        
} else {
    
   
       console.log(`\n数据获取失败`)

       
}
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
