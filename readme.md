# 此项目文件用于获取access_token和ticket并拼合signatrue返回前台页面

`@path:/server/getJssdk;@api:http://ued.ecmoho.com/getJssdk;`

## 若是服务号，可获取用户基本信息存入mysql数据库(未完成)

`@path:/server/cacheUserinfo;@api:http://ued.ecmoho.com/cacheUserinfo;`

## 目录解析
* config文件夹放置配置文件
  > mysql.config 配置mysql的地址、账户密码等

  > wechat.config 配置公众号的appid、secret。cache_duration配置缓存时间

* routes文件夹放置路由文件
  > 主要使用index.js文件，里面需配置当前页面的链接。例：https://ued.ecmoho.com/website/AnswerTemplate/

* server文件夹放置后台逻辑文件
  > getJssdk.js处理signatrue签名的拼接和控制其缓存
  
  > cacheUserinfo.js 处理为服务号的公众号，静默授权获取用户信息入库操作等

* 迁移项目时请先删除node_modules包，迁移完成再进入项目目录`npm install` & `npm start`
* 或使用pm2(推荐)管理项目