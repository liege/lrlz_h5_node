var driverApi = require('../driverApi');

exports.getProductInfo = function(req, res, renderFun){
    var params = {};
    params.uuid = req.params.uuid;
    params.appKey = req.params.appKey || '6581235709';
    params.appVer = req.params.appVer || '1.0';
    try {
        driverApi.getProductInfo(params, function(data){
            console.log('data: ' + JSON.stringify(data));
            var product = {};
            if((data && data.success == undefined) || (data && data.success && data.success == 'true')){
                product = data;
                renderFun(req,res, {
                    title: '商品详情',
                    product: product
                },'product');
            }
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};

exports.getProductInfoData = function(req, res, renderFun){
    var params = {};
    params.uuid = req.query.uuid;
    params.appKey = req.query.appKey;
    params.appVer = req.query.appVer;
    try {
        driverApi.getProductInfo(params, function(data){
            console.log('data' + JSON.stringify(data));
            renderFun(req,res,data);
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};

exports.getRecommandListData = function(req, res, renderFun){
    var params = {};
    params.uuid = req.query.uuid;
    params.appKey = req.query.appKey;
    params.appVer = req.query.appVer;
    try {
        driverApi.getRecommandList(params, function(data){
            console.log('data' + JSON.stringify(data));
            renderFun(req,res,data);
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};

exports.getCommentListData = function(req, res, renderFun){
    var params = {};
    params.uuid = req.body.uuid;
    params.limit = req.body.limit;
    params.type = req.body.type;
    params.appKey = req.body.appKey;
    params.appVer = req.body.appVer;
    try {
        driverApi.getCommentList(params, function(data){
            console.log('data' + JSON.stringify(data));
            renderFun(req,res,data);
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};

exports.getDetailData = function(req, res, renderFun){
    var params = {};
    params.uuid = req.query.uuid;
    params.last_modified = req.query.last_modified;
    params.appKey = req.query.appKey;
    params.appVer = req.query.appVer;
    try {
        driverApi.getDetailData(params, function(data){
            console.log('data' + JSON.stringify(data));
            renderFun(req,res,data);
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};

