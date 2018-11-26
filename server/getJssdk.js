const cache = require('memory-cache'),
      sha1 = require('sha1'),
      request = require('request'),
      wechatConfig = require('../config/wechat.config');

module.exports = {
  sign(url,call) {
    const timestamp = Math.floor(Date.now()/1000);
    let jsapi_ticket = '',
        noncestr = '';
    if (cache.get('ticket')) {
      jsapi_ticket = cache.get('ticket');
      noncestr = cache.get('noncestr');
      let callback = {
        noncestr : noncestr,
        timestamp : timestamp,
        appid : wechatConfig.appid,
        url : url,
        // 加密拼接签名
        signature : sha1(`jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`)
       }
      return call(callback);
    } else {
      noncestr = getNoncestr();                          // 获取 access_token
      request(`${wechatConfig.accessTokenUrl}?grant_type=${wechatConfig.grant_type}&appid=${wechatConfig.appid}&secret=${wechatConfig.secret}`,
        function (err,response,body) {  
          if (!err && response.statusCode == 200) {
            let tokenMap = JSON.parse(body);
            console.log(tokenMap);                      // 获取 ticket
            request(`${wechatConfig.ticketUrl}?access_token=${tokenMap.access_token}&type=jsapi`,
              function (err,res,json) {  
                if (!err && res.statusCode == 200) {
                  let ticketMap = JSON.parse(json);
                  cache.put('ticket',ticketMap.ticket,wechatConfig.cache_duration); // ticket加入cache
                  cache.put('noncestr',noncestr);
                  let callback = {
                    noncestr : noncestr,
                    timestamp : timestamp,
                    appid : wechatConfig.appid,
                    url : url,
                    signature : sha1(`jsapi_ticket=${ticketMap.ticket}&noncestr${noncestr}&timestamp=${timestamp}&url=${url}`)
                  }
                  return call(callback);
                }
              }
            )
          }
        }
      )
    }
  }
}

function getNoncestr(){
  let str = `abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
  let noncestr = '';
  str = str.split('');
  for (let i = 0; i < 16; i++) {
    noncestr += str[Math.floor(Math.random()*str.length)];  // 生成16位随机字符串     
  }
  return noncestr;
}