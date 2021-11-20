# 在这里输入青龙面板用户名密码，如果不填写，就自动从auth.json中读取
username = ""
password = ""

import requests
import time
import json
import re
requests.packages.urllib3.disable_warnings()

token=""
if username == "" or password == "":
    f = open("/ql/config/auth.json")
    auth = f.read()
    auth = json.loads(auth)
    username = auth["username"]
    password = auth["password"]
    token=auth["token"]
    f.close()


def gettimestamp():
    return str(int(time.time() * 1000))


def login(username, password):
    url = "http://127.0.0.1:5700/api/login?t=%s" % gettimestamp()
    data = {"username": username, "password": password}
    r = s.post(url, data)
    s.headers.update({"authorization": "Bearer " + json.loads(r.text)["data"]["token"]})


def getitem(key):
    url = "http://127.0.0.1:5700/api/envs?searchValue=%s&t=%s" % (key, gettimestamp())
    r = s.get(url)
    item = json.loads(r.text)["data"]
    return item

def getckitem(key):
    url = "http://127.0.0.1:5700/api/envs?searchValue=JD_COOKIE&t=%s" % gettimestamp()
    r = s.get(url)
    for i in json.loads(r.text)["data"]:
        if key in i["value"]:
            return i
    return []

def wstopt(wskey):
    try:
        url = "https://jdsign.tk/getck"
        headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
        }
        data = {"wskey": wskey, "key": "xb3z4z2m3n847"}
        r = requests.post(url, headers=headers, data=json.dumps(data), verify=False)
        return r.text
    except:
        return "error"
def getToken(ws):
    headers = {
        'cookie': ws,
        'User-Agent': 'okhttp/3.12.1;jdmall;android;version/10.1.2;build/89743;screen/1440x3007;os/11;network/wifi;',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'charset': 'UTF-8',
        'accept-encoding': 'br,gzip,deflate'
    }
    params = {
        'functionId': 'genToken',
        'clientVersion': '10.1.2',
        'client': 'android',
        'lang': 'zh_CN',
        'uuid': '09d53a5653402b1f',
        'st': '1630392618706',
        'sign': '53904736db53eebc01ca70036e7187d6',
        'sv': '120'
    }
    # url = 'https://api.m.jd.com/client.action?functionId=genToken&clientVersion=10.1.2&client=android&lang=zh_CN&uuid=09d53a5653402b1f&st=1630392618706&sign=53904736db53eebc01ca70036e7187d6&sv=120'
    url = 'https://api.m.jd.com/client.action'
    data = 'body=%7B%22action%22%3A%22to%22%2C%22to%22%3A%22https%253A%252F%252Fplogin.m.jd.com%252Fcgi-bin%252Fm%252Fthirdapp_auth_page%253Ftoken%253DAAEAIEijIw6wxF2s3bNKF0bmGsI8xfw6hkQT6Ui2QVP7z1Xg%2526client_type%253Dandroid%2526appid%253D879%2526appup_type%253D1%22%7D&'
    res = requests.post(url=url, params=params, headers=headers, data=data, verify=False)
    # print(res.text)
    res_json = json.loads(res.text)
    totokenKey = res_json['tokenKey']
    # print("Token:", totokenKey)
    ck=appjmp(totokenKey)
    return ck


def appjmp(token):
    headers = {
        'User-Agent': 'jdapp;android;10.1.2;11;0393465333165363-5333430323261366;network/wifi;model/M2102K1C;addressid/938507929;aid/09d53a5653402b1f;oaid/2acbcab5bb3f0e68;osVer/30;appBuild/89743;partner/lc023;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; M2102K1C Build/RKQ1.201112.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    }
    params = {
        'tokenKey': token,
        'to': 'https://plogin.m.jd.com/cgi-bin/m/thirdapp_auth_page?token=AAEAIEijIw6wxF2s3bNKF0bmGsI8xfw6hkQT6Ui2QVP7z1Xg',
        'client_type': 'android',
        'appid': 879,
        'appup_type': 1,
    }
    # url = 'https://un.m.jd.com/cgi-bin/app/appjmp?tokenKey={0}&to=https%3A%2F%2Fplogin.m.jd.com%2Fcgi-bin%2Fm%2Fthirdapp_auth_page%3Ftoken%3DAAEAIEijIw6wxF2s3bNKF0bmGsI8xfw6hkQT6Ui2QVP7z1Xg%26client_type%3Dandroid%26appid%3D879%26appup_type%3D1'.format(token)
    url = 'https://un.m.jd.com/cgi-bin/app/appjmp'
    # print(url)
    # res = requests.get(url=url, headers=headers, verify=False, allow_redirects=False)
    res = requests.get(url=url, headers=headers, params=params, verify=False, allow_redirects=False)
    # print(res.headers)
    # print(res.status_code)
    res_set = res.cookies.get_dict()
    pt_key = 'pt_key=' + res_set['pt_key']
    pt_pin = 'pt_pin=' + res_set['pt_pin']
    ck1 = str(pt_key) + ';' + str(pt_pin) + ';'
    # print(ck1)
    return ck1
    # pyperclip.copy(ck)
    # print("已复制到剪切板")
    # print(res.text)


def update(text, qlid):
    url = "http://127.0.0.1:5700/api/envs?t=%s" % gettimestamp()
    s.headers.update({"Content-Type": "application/json;charset=UTF-8"})
    data = {
        "name": "JD_COOKIE",
        "value": text,
        "_id": qlid
    }
    r = s.put(url, data=json.dumps(data))
    if json.loads(r.text)["code"] == 200:
        return True
    else:
        return False


def insert(text):
    url = "http://127.0.0.1:5700/api/envs?t=%s" % gettimestamp()
    s.headers.update({"Content-Type": "application/json;charset=UTF-8"})
    data = []
    data_json = {
        "value": text,
        "name": "JD_COOKIE"
    }
    data.append(data_json)
    r = s.post(url, json.dumps(data))
    if json.loads(r.text)["code"] == 200:
        return True
    else:
        return False


if __name__ == '__main__':
    s = requests.session()
    if token =="":
        login(username, password)
    else:
        s.headers.update({"authorization": "Bearer " + token})
    wskeys = getitem("JD_WSCK")
    count = 1
    for i in wskeys:
        ptck = getToken(i["value"])
        # ptck = wstopt(i["value"])
        if ptck == "wskey错误":
            print("第%s个wskey可能过期了" % count)
        elif ptck == "未知错误":
            print("第%s个wskey发生了未知错误" % count)
        else:
            ptpin = re.findall(r"pt_pin=(.*?);", ptck)[0]
            item = getckitem("pt_pin=" + ptpin)
            if item != []:
                qlid = item["_id"]
                if update(ptck, qlid):
                    print("第%s个wskey更新成功" % count)
                else:
                    print("第%s个wskey更新失败" % count)
            else:
                if insert(ptck):
                    print("第%s个wskey添加成功" % count)
                else:
                    print("第%s个wskey添加失败" % count)
        count += 1
