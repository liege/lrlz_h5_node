var driverApi = require('../driverApi');
var setting = require('../configuration').setting;

//收藏页列表
exports.getFavoriteList = function(req, res, renderFun){
    var params = {};
    params.appKey = setting.globalAPIParams.appKey;
    params.appVer = setting.globalAPIParams.appVer;
    params.token = setting.globalAPIParams.token;
    params.user_label = "44rPVH2uw1";
    params.type = "product";
    try {
		driverApi.getFavorList(params,function(data){
			var favorList = {};
			if(data && data.success == undefined || data && data.success && data.success == 'true'){
				favorList = data;
				renderFun(req,res,{
					title:'收藏列表',
					favorListData:favorList
				},'favor_list');
			}
		});
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};
//添加收藏
exports.addFavor = function(req, res, renderFun){
    var params = {};
    params.appKey = setting.globalAPIParams.appKey;
    params.appVer = setting.globalAPIParams.appVer;
    params.token = setting.globalAPIParams.token;
    params.user_uuid = "44rPVH2uw1";
    params.uuids = "3Nx9550oI3";
    params.type = "product";
    try {
        driverApi.addFavor(params, function(data){
            console.log('data' + JSON.stringify(data));
            renderFun(req,res,data);
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};