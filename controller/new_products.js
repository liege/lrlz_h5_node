var driverApi = require('../driverApi');
var setting = require('../configuration').setting;

exports.getNewList = function(req,res,renderFun){
	console.log('====>init getNewList');
	var params = {};
	params.appKey = setting.globalAPIParams.appKey;
	params.appVer = setting.globalAPIParams.appVer;
	params.scat_uuid = "activity03";
	params.show_memo = "true";
	console.log('========>INIT TRY');
	try{
		driverApi.getListProducts(params,function(data){
			var newList = {};
			if(data && data.success == undefined || data && data.success && data.success == 'true'){
				newList = data;
				console.log("=====>TO RENDER");
				renderFun(req,res,{
					title:'品牌详情',
					newListData:newList
				},'home_new_products');
			}
		});
	}catch(err){
		console.log("call back error : " + JSON.stringify(err));
	}
};