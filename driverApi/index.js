var Driver = require('../driver/index.js');

var getProductInfo = exports.getProductInfo = function(params, callback){
    Driver.queryDataByGet('http://meizhuangyouxuan.com/app/inter/getProductInfo.ss', params, callback);
};

var getRecommandList = exports.getRecommandList = function(params, callback){
    Driver.queryDataByGet('http://meizhuangyouxuan.com/app/inter/getRecommandList.ss', params, callback);
};

var getCommentList = exports.getCommentList = function(params, callback){
    Driver.queryDataByPost('http://meizhuangyouxuan.com/app/inter/getCommentList.ss', params, callback);
};

var getDetailData = exports.getDetailData = function(params, callback){
    Driver.queryDataByGet('http://meizhuangyouxuan.com/app/inter/getDetial.ss', params, callback);
};