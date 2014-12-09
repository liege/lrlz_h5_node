var driverApi = require('../driverApi');
var setting = require('../configuration').setting;

//首页热销榜data
exports.getHotSalesData = function(req, res, renderFun){
    var params = {};
    params.appKey = setting.globalAPIParams.appKey;
    params.appVer = setting.globalAPIParams.appVer;
    params.scat_uuid = req.params.scat_uuid;
    try {
        driverApi.getListProducts(params, function(data){
            console.log('data' + JSON.stringify(data));
            renderFun(req,res,data);
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};