var driverApi = require('../driverApi');
var setting = require('../configuration').setting;

exports.getNewList = function(req,res,renderFun){
	console.log('====>init getNewList');
	var params = {};
	params.appKey = setting.globalAPIParams.appKey;
	params.appVer = setting.globalAPIParams.appVer;
	params.scat_uuid = "activity03";
	console.log('========>INIT TRY');
	try{
		driverApi.getListProducts(params,function(data){
			var brandDetail = {};
			if(data && data.success == undefined || data && data.success && data.success == 'true'){
				brandDetail = data;
				console.log("=====>TO RENDER");
				renderFun(req,res,{
					title:'品牌详情',
					brandDetailData:brandDetail
				},'home_new_list');
			};			
		});
	}catch(err){
		console.log("call back error : " + JSON.stringify(err));
	};
};