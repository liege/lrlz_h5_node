var driverApi = require('../driverApi');
var setting = require('../configuration').setting;

exports.getBrandList = function(req,res,renderFun){
	var params = {};
	params.uuid = req.params.uuid;
	params.appKey = setting.globalAPIParams.appKey;
	params.appVer = setting.globalAPIParams.appVer;
	params.update_time = '20140801';
	params.user_label = 'userXXXX';
	try{
		driverApi.getBrandList(params,function(data){
			var brandList = {}
			if(data && data.success == undefined || data && data.success && data.success == 'true'){
				brandList = data;
				renderFun(req,res,{
					title:'美妆优选',
					data:brandList
				},'home');
			}
		})
	}catch(err){
		console.log("call back error : " + JSON.stringify(err));
	}
}