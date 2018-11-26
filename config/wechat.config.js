module.exports = {
  grant_type  : 'client_credential',  // 授权类型 客户端证书 ticket
  appid       : 'xxxxxxxxxx',                   // 公众号appid (测试ID和secret)
  secret      : 'zzzzzzzzzzzzzzzzzzzzzzz',                   // 公众号 appsecret
  accessTokenUrl  : 'https://api.weixin.qq.com/cgi-bin/token',               // 获取access_Token
  ticketUrl      : 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',               // 获取tickect
  cache_duration  : 1000*60*60*24     // tickect缓存一天
}