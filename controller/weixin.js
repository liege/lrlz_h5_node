var Driver = require('../driver/index');
var setting = require('../configuration').setting;
var utils = require('../utils/index');

exports.oauth = function(req, res, renderFun){
    var state = req.query.state;
    var redirect_url = '/home';
    if(req.session.globalParams){
        redirect_url = req.session.globalParams.redirect_url;
    }
    console.log('redirect_url : ' + redirect_url);
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
            //save userInfo to session
            req.session.userInfo = {};
            req.session.userInfo.openid = tokenData.openid;
            Driver.queryByPost('https://api.weixin.qq.com/sns/userinfo', user_params, function(userData){
                var userInfo = {};
                if(!userData.errmsg){
                    userInfo = userData;
                    req.session.userInfo = userData;
                    req.session.userInfo.access_token = tokenData.access_token;
                    req.session.userInfo.refresh_token = tokenData.refresh_token;
                    console.log('req.session.userInfo : ' + JSON.stringify(req.session.userInfo));
//                    renderFun(req,res, {
//                        title: '用户信息',
//                        userInfo: userInfo
//                    }, 'index');
//                    res.redirect("/product/detail/IJ45014z98");
                    res.redirect(redirect_url);
                }
            });
        });
    }catch(err){
        console.log("error : " + JSON.stringify(err));
    }
};

exports.orderConfirm = function(req, res, renderFun){
    var unifiedOrderUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    var unifiedOrderParams = {};
    unifiedOrderParams.appid = setting.wxParams.appId;
    unifiedOrderParams.body = '贡献一分钱';
    unifiedOrderParams.mch_id = setting.wxParams.mchid;
    unifiedOrderParams.nonce_str = utils.createNoncestr(32);
    unifiedOrderParams.notify_url = setting.wxParams.notify_url;
    unifiedOrderParams.openid = session.userInfo.openid;
    unifiedOrderParams.out_trade_no = setting.wxParams.appId + new Date().getTime();
    console.log('client ip : ' + utils.getClientIp(req));
    unifiedOrderParams.spbill_create_ip = utils.getClientIp(req);
    unifiedOrderParams.total_fee = 1;
    unifiedOrderParams.trade_type = 'JSAPI';
    unifiedOrderParams.sign = utils.getSign(unifiedOrderParams);

    var unifiedOrderXmlParams = utils.jsonToXml(unifiedOrderParams);

    try{
        Driver.queryByPostXml(unifiedOrderUrl, unifiedOrderXmlParams, function(unifiedOrderData){
            console.log('unifiedOrderData : ' + JSON.stringify(unifiedOrderData));
            if(unifiedOrderData.xml.return_code[0] == 'SUCCESS' && unifiedOrderData.xml.result_code[0] == 'SUCCESS'){
                var jsApiParameters = {};
                jsApiParameters.appId = setting.wxParams.appId;
                jsApiParameters.nonceStr = utils.createNoncestr(32);
                jsApiParameters.package = 'prepay_id=' + unifiedOrderData.xml.prepay_id[0];
                console.log('prepay_id: ' + unifiedOrderData.xml.prepay_id[0]);
                jsApiParameters.signType = 'MD5';
                jsApiParameters.timeStamp = parseInt(new Date().getTime()/1000).toString();
                jsApiParameters.paySign = utils.getSign(jsApiParameters);
                console.log('jsApiParameters: ' + JSON.stringify(jsApiParameters));
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