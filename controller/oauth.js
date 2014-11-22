var Driver = require('../driver/index.js');
var setting = require('../configuration').setting;

exports.oauth = function(req, res, renderFun){
    var state = req.query.state;
    var token_params = {};
    token_params.code = req.query.code;
    token_params.appid = setting.wxParams.appId;
    token_params.appSecret = setting.wxParams.appSecret;
    token_params.grant_type = 'authorization_code';
    try{
        Driver.queryByPost('https://api.weixin.qq.com/sns/oauth2/access_token', token_params, function(data){
            var user_params = {};
            user_params.access_token = data.access_token;
            user_params.openid = data.openid;
            Driver.queryByPost('https://api.weixin.qq.com/sns/userinfo', user_params, function(data){
                var userInfo = {};
                if(!data.errmsg){
                    userInfo = data;
                    renderFun(req,res, {
                        title: '用户信息',
                        userInfo: userInfo
                    },'index');
                }
            });
        });
    }catch(err){
        console.log("error : " + JSON.stringify(err));
    }
};