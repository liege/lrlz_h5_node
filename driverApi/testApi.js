var DriverApi = require('./index.js');
var setting = require('../configuration').setting;
var globalAPIParams = setting['globalAPIParams'];

DriverApi.getProductInfo({uuid: 'IJ45014z98',appKey:globalAPIParams['appKey'],appVer:globalAPIParams['appVer']},function(returnData){
    console.log('getProductInfo: ' + JSON.stringify(returnData));
});

DriverApi.getRecommandList({uuid: 'IJ45014z98', appKey:'6581235709', appVer:'1.0'},function(returnData){
    console.log('getRecommandList: ' + JSON.stringify(returnData));
});

DriverApi.getCommentList({uuid: 'IJ45014z98', limit: '10', type: '1', appKey:'6581235709', appVer:'1.0'},function(returnData){
    console.log('getCommentList: ' + JSON.stringify(returnData));
});

DriverApi.getDetailData({uuid: 'IJ45014z98',last_modified: '0', appKey:'6581235709', appVer:'1.0'},function(returnData){
    console.log('getDetail: ' + JSON.stringify(returnData));
});