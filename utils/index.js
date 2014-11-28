var setting = require('../configuration').setting;
var qs = require('querystring');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');

exports.getClientIp = function(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

var getSign = exports.getSign = function(package){
    var stringPackage = qs.stringify(package);
    var stringSignTemp = stringPackage + '&key='+ setting.wxParams.partnerKey;
    var sign = md5.update(stringSignTemp).digest('hex').toUpperCase();
    console.log('sign : ' + sign);
};

//var package = {test:'test', user:'123'};
//getSign(package);