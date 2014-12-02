var Driver = require('../driver/index.js');
var host_port = require('../configuration').setting.globalAPIParams.host_port;

//商品列表查询接口					
var getListProducts = exports.getListProducts = function(params, callback){
    Driver.queryDataByGet(host_port+'/app/inter/listProducts.ss', params, callback);
};

//单个商品信息查询接口
var getProductInfo = exports.getProductInfo = function(params, callback){
    Driver.queryDataByGet(host_port+'/app/inter/getProductInfo.ss', params, callback);
};

//商品详细-推荐商品接口
var getRecommandList = exports.getRecommandList = function(params, callback){
    Driver.queryDataByGet(host_port+'/app/inter/getRecommandList.ss', params, callback);
};

//商品详细-商品评价接口
var getCommentList = exports.getCommentList = function(params, callback){
    Driver.queryDataByPost(host_port+'/app/inter/getCommentList.ss', params, callback);
};

//商品详细-商品图文详情获得接口
var getDetailData = exports.getDetailData = function(params, callback){
    Driver.queryDataByGet(host_port+'/app/inter/getDetial.ss', params, callback);
};
//筛选器接口
var getFilter = exports.getFilter = function(params, callback){
    Driver.queryByPost(host_port+'/app/inter/getFilter.ss', params, callback);
};
//美妆街-美妆旗舰店展示
var getBrandList = exports.getBrandList = function(params, callback){
    Driver.queryByPost(host_port+'/app/inter/getBrandList.ss', params, callback);
};
//我的收藏-保存收藏 P.S. 测试数据返回值为空字符串 ""
var addFavor = exports.addFavor = function(params, callback){
    // Driver.queryByPost(host_port+'/app/inter/addFavor.ss', params, callback);
};
//我的收藏-查询我收藏的商品
var getFavorList = exports.getFavorList = function(params, callback){
    Driver.queryByPost(host_port+'/app/inter/getFavorList.ss', params, callback);
};
//专场秀
var getShows = exports.getShows = function(params, callback){
    Driver.queryByPost(host_port+'/app/inter/getShows.ss', params, callback);
};
//广告商品
var getAdProducts = exports.getAdProducts = function(params, callback){
    Driver.queryByPost(host_port+'/app/inter/getAdProducts.ss', params, callback);
};
//版本查询接口
var getAppVersion = exports.getAppVersion = function(params, callback){
    Driver.queryByPost(host_port+'/app/inter/getAppVersion.ss', params, callback);
};
//我的收藏-查询我收藏的品牌
var getFavorBrandList = exports.getFavorBrandList = function(params, callback){
    Driver.queryByPost(host_port+'/app/inter/getFavorBrandList.ss', params, callback);
};
//商品详细-商品图文详情获得接口
var getDetial = exports.getDetial = function(params, callback){
    Driver.queryByPost(host_port+'/app/inter/getDetial.ss', params, callback);
};
//商品详细-商品SKU信息获得接口
var getSkuInfo = exports.getSkuInfo = function(params, callback){
    Driver.queryByPost(host_port+'/app/inter/getSkuInfo.ss', params, callback);
};
//热门关键字接口
var getKeywordList = exports.getKeywordList = function(params, callback){
    Driver.queryByPost(host_port+'/app/inter/getKeywordList.ss', params, callback);
};
//用户预注册接口【隐私】【HTTPS】
var preReg = exports.preReg = function(params, callback){
    Driver.queryByPost(host_port+'/app/inter/preReg.ss', params, callback);
};
//用户完成注册接口【隐私】【HTTPS】
var doneReg = exports.doneReg = function(params, callback){
    Driver.queryByPost(host_port+'/app/inter/doneReg.ss', params, callback);
};