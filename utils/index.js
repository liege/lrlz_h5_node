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
    return sign;
};

var jsonToXml = exports.jsonToXml = function(jsonData){
    var xml = '<xml>';
    if(jsonData){
        for(var key in jsonData){
            if(!isNaN(jsonData[key])){
                xml = xml + "<" + key + ">" + jsonData[key] + "</" + key + ">";
            }else{
                xml = xml + "<" + key + "><![CDATA[" + jsonData[key] + "]]></" + key + ">";
            }
        }
    }
    xml = xml + '</xml>';
    console.log('xml : ' + xml);
    return xml;
};

//var package = {test:'test', user:'123'};
//getSign(package);
//jsonToXml(package);