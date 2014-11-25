var Driver = require('../driver/index.js');
var setting = require('../configuration').setting;

exports.oauth = function(req, res, renderFun){
    var state = req.query.state;
    var token_params = {};
    token_params.code = req.query.code;
    token_params.appid = setting.wxParams.appId;
    token_params.secret = setting.wxParams.appSecret;
    token_params.grant_type = 'authorization_code';
    try{
        Driver.queryByPost('https://api.weixin.qq.com/sns/oauth2/access_token', token_params, function(tokenData){
            var user_params = {};
            user_params.access_token = tokenData.access_token;
            user_params.openid = tokenData.openid;
            Driver.queryByPost('https://api.weixin.qq.com/sns/userinfo', user_params, function(userData){
                var userInfo = {};
                if(!userData.errmsg){
                    userInfo = userData;
                    //save userInfo to session
                    req.session.userInfo = {};
                    req.session.userInfo = userData;
                    req.session.userInfo.access_token = tokenData.access_token;
                    req.session.userInfo.refresh_token = tokenData.refresh_token;
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