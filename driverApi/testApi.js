var DriverApi = require('./index.js');
var setting = require('../configuration').setting;
var globalAPIParams = setting['globalAPIParams'];
var globalAppKey = globalAPIParams['appKey'];
var globalAppVer = globalAPIParams['appVer'];

//单个商品信息查询接口
DriverApi.getProductInfo({uuid: 'IJ45014z98',appKey:globalAppKey,appVer:globalAppVer},function(returnData){
    // console.log('getProductInfo: ' + JSON.stringify(returnData));
});
//商品详细-推荐商品接口
DriverApi.getRecommandList({uuid: 'IJ45014z98', appKey:globalAppKey, appVer:globalAppVer},function(returnData){
    // console.log('getRecommandList: ' + JSON.stringify(returnData));
});
//商品详细-商品评价接口
DriverApi.getCommentList({uuid: 'IJ45014z98', limit: '10', type: '1', appKey:globalAppKey, appVer:globalAppVer},function(returnData){
    // console.log('getCommentList: ' + JSON.stringify(returnData));
});
//商品详细-商品图文详情获得接口
DriverApi.getDetailData({uuid: 'IJ45014z98',last_modified: '0', appKey:globalAppKey, appVer:globalAppVer},function(returnData){
    // console.log('getDetail: ' + JSON.stringify(returnData));
});
//筛选器接口
DriverApi.getFilter({ appKey:globalAppKey, appVer:globalAppVer},function(returnData){
    // console.log('getFilter: ' + JSON.stringify(returnData));
});
//美妆街-美妆旗舰店展示
DriverApi.getBrandList({ appKey:globalAppKey, appVer:globalAppVer,update_time:'20140801',user_label:'userXXXX'},function(returnData){
    // console.log('getBrandList: ' + JSON.stringify(returnData));
});
//我的收藏-保存收藏
DriverApi.addFavor({uuid:'IJ45014z98',isDelete:'true', appKey:globalAppKey, appVer:globalAppVer,type:'0',user_label:'userXXXX'},function(returnData){
    // console.log('addFavor: ' + JSON.stringify(returnData));
});
//我的收藏-查询我收藏的商品
DriverApi.getFavorList({client_type:'anywhere', appKey:globalAppKey, appVer:globalAppVer,user_label:'userXXXX'},function(returnData){
    // console.log('getFavorList: ' + JSON.stringify(returnData));
});