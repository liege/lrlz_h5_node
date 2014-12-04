var driverApi = require('../driverApi');
var setting = require('../configuration').setting;

exports.getBrandList = function(req,res,renderFun){
	var params = {};
	params.appKey = setting.globalAPIParams.appKey;
	params.appVer = setting.globalAPIParams.appVer;
	params.update_time = '20140801';
	params.user_label = 'userXXXX';
	try{
		driverApi.getBrandList(params,function(data){
			var brandList = {};
			if(data && data.success == undefined || data && data.success && data.success == 'true'){
				brandList = data;
				renderFun(req,res,{
					title:'品牌街',
					brandListData:brandList
				},'home_brand');
			};
		});
	}catch(err){
		console.log("call back error : " + JSON.stringify(err));
	};
};
exports.getBrandDetail = function(req,res,renderFun){
	var params = {};
	params.appKey = setting.globalAPIParams.appKey;
	params.appVer = setting.globalAPIParams.appVer;
	params.brand_uuid = req.query.brand_uuid;
	params.page = 2;
	console.log('========>'+params.brand_uuid);
	try{
		driverApi.getListProducts(params,function(data){
			var brandDetail = {};
			if(data && data.success == undefined || data && data.success && data.success == 'true'){
				brandDetail = data;
				renderFun(req,res,{
					title:'品牌详情',
					brandDetailData:brandDetail
				},'brand_list');
			};			
		});
	}catch(err){
		console.log("call back error : " + JSON.stringify(err));
	};
};