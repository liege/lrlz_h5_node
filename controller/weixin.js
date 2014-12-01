var Driver = require('../driver/index');
var setting = require('../configuration').setting;
var utils = require('../utils/index');

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
            console.log('access_token: ' + tokenData.access_token);
            user_params.openid = tokenData.openid;
            req.session.openid = tokenData.openid;
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
                    }, 'index');
                }
            });
        });
    }catch(err){
        console.log("error : " + JSON.stringify(err));
    }
};

exports.wxPay = function(req, res, renderFun){
    var unifiedOrderUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    var unifiedOrderParams = {};
    unifiedOrderParams.appid = setting.wxParams.appId;
    unifiedOrderParams.body = '贡献一分钱';
    unifiedOrderParams.mch_id = setting.wxParams.mchid;
    unifiedOrderParams.nonce_str = utils.createNoncestr(32);
    unifiedOrderParams.notify_url = setting.wxParams.notify_url;
    unifiedOrderParams.openid = req.session.openid || '';
    unifiedOrderParams.out_trade_no = setting.wxParams.appId + new Date().getTime();
    console.log('client ip : ' + utils.getClientIp(req));
    unifiedOrderParams.spbill_create_ip = utils.getClientIp(req);
    unifiedOrderParams.total_fee = '0.1';
    unifiedOrderParams.trade_type = 'JSAPI';
    unifiedOrderParams.sign = utils.getSign(unifiedOrderParams);

    var unifiedOrderXmlParams = utils.jsonToXml(unifiedOrderParams);

    try{
        Driver.queryByPostXml(unifiedOrderUrl, unifiedOrderXmlParams, function(unifiedOrderData){
            if(unifiedOrderData.return_code == 'SUCCESS' && unifiedOrderData.result_code == 'SUCCESS'){
                var jsApiParameters = {};
                jsApiParameters.appId = setting.wxParams.appId;
                jsApiParameters.timeStamp = new Date().getTime().toString();
                jsApiParameters.nonceStr = utils.createNoncestr(32);
                jsApiParameters.signType = 'MD5';
                jsApiParameters.package = 'prepay_id=' + unifiedOrderData.prepay_id;
                console.log('prepay_id: ' + unifiedOrderData.prepay_id);
                jsApiParameters.paySign = utils.getSign(jsApiParameters);
                renderFun(req,res, {
                    title:'确认订单',
                    jsApiParameters: jsApiParameters
                }, 'order_confirm');
            }
        });
    }catch(err){
        console.log("error : " + JSON.stringify(err));
    }
};

exports.notify = function(req, res, renderFun){
    renderFun(req,res,{return_code:'SUCCESS'});
};