var Driver = require('../driver/index.js');

//单个商品信息查询接口
var getProductInfo = exports.getProductInfo = function(params, callback){
    Driver.queryDataByGet('http://meizhuangyouxuan.com/app/inter/getProductInfo.ss', params, callback);
};

//商品详细-推荐商品接口
var getRecommandList = exports.getRecommandList = function(params, callback){
    Driver.queryDataByGet('http://meizhuangyouxuan.com/app/inter/getRecommandList.ss', params, callback);
};

//商品详细-商品评价接口
var getCommentList = exports.getCommentList = function(params, callback){
    Driver.queryDataByPost('http://meizhuangyouxuan.com/app/inter/getCommentList.ss', params, callback);
};

//商品详细-商品图文详情获得接口
var getDetailData = exports.getDetailData = function(params, callback){
    Driver.queryDataByGet('http://meizhuangyouxuan.com/app/inter/getDetial.ss', params, callback);
};