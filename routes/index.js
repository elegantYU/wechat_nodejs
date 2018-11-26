var express = require('express');
var router = express.Router();
var getJssdk = require('../server/getJssdk');
var cacheUserinfo = require('../server/cacheUserinfo');

/* GET home page. */
router.get('/getJssdk', function(req, res, next) {
  let url = '';         // 输入调用页面链接 https://xxx.xxx.xxx/yourpage/
  getJssdk.sign(url,function (obj) {  
    res.json(obj)       // 返回jssdk的json包
  });
});

router.get('/cacheUserinfo',function (req,res,next) {  

})

module.exports = router;
