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
//筛选器接口
var getFilter = exports.getFilter = function(params, callback){
    Driver.queryByPost('http://meizhuangyouxuan.com/app/inter/getFilter.ss', params, callback);
};
//美妆街-美妆旗舰店展示
var getBrandList = exports.getBrandList = function(params, callback){
    Driver.queryByPost('http://meizhuangyouxuan.com/app/inter/getBrandList.ss', params, callback);
};
//我的收藏-保存收藏
var addFavor = exports.addFavor = function(params, callback){
    Driver.queryByPost('http://meizhuangyouxuan.com/app/inter/addFavor.ss', params, callback);
};
//我的收藏-查询我收藏的商品
var getFavorList = exports.getFavorList = function(params, callback){
    Driver.queryByPost('http://meizhuangyouxuan.com/app/inter/getFavorList.ss', params, callback);
};