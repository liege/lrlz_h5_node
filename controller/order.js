var driverApi = require('../driverApi');
var setting = require('../configuration').setting;

exports.addOrder = function(req, res, renderFun){
    var params = {
        conding:'P0103529',
        product_uuid:'IJ45014z98',
        product_name:'SEKKISEI 雪肌精水敷容纸膜14粒装3包 5包 压缩面膜 正品保证',
        product_pic_urls:'http://img03.taobaocdn.com/bao/uploaded/i3/2203256980/TB2YG3XaFXXXXXuXpXXXXXXXXXX_!!2203256980.jpg',
        isRegular:'1',
        count:'2',
        sku_uuid:'j19lB5823R',
        sku_name:'1包',
        sku_type:'颜色分类',
        price:'28',
        total_price: 56,
        pay_point: 0,
        back_point:56,
        bat_uuid:utils.createNoncestr(16) + new Date().getTime(),
        user_label:'97901u1kAn',
        user_nick: '汪吉灵',
        payed: '0',
        post_fee: 10,
        receiver_name: '汪吉灵',
        receiver_state: '上海',
        receiver_city: '上海',
        receiver_district: '闵行',
        receiver_address: '兴迪大厦',
        receiver_mobile: '15216779471'
    };
    params.appKey = setting.globalAPIParams.appKey;
    params.appVer = setting.globalAPIParams.appVer;
    params.token = setting.globalAPIParams.token;

    try {
        driverApi.addOrder(params, function(data){
            console.log('data' + JSON.stringify(data));
            renderFun(req,res,data);
        });
    }catch(err){
        console.log("call back error : " + JSON.stringify(err));
    }
};

