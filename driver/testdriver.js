var Driver = require('./index.js');
var setting = require('../configuration').setting;

Driver.queryDataByGet('http://112.64.126.126:49521/TAEServer/app/inter/getProductInfo.ss', {uuid: 'IJ45014z98'},function(returnData){
    console.log('returnGetData: ' + JSON.stringify(returnData));
});

Driver.queryDataByPost('http://112.64.126.126:49521/TAEServer/app/inter/getProductInfo.ss', {uuid: 'IJ45014z98'},function(returnData){
    console.log('returnPostData: ' + JSON.stringify(returnData));
});

Driver.post('http://112.64.126.126:49521/TAEServer/app/inter/getProductInfo.ss',{uuid: 'IJ45014z98'},function(data){
    console.log('post: ' + JSON.stringify(data));
});