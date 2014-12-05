var express = require('express');
var router = express.Router();
var productController = require('../controller/product');
var weixinController = require('../controller/weixin');
var brandController = require('../controller/brand');
var newListController = require('../controller/new_products');
var giftExchangeController = require('../controller/gift_exchange');
var hotSalesController = require('../controller/hot_sales');
/* GET home page. */
router.get('/', function(req, res) {
    res.render('oauth', { title: '美妆优选' });
});

/* 微信共享地址. */
router.get('/addr', function(req, res) {
    res.render('addr', { ts:req.session.userInfo.access_token });
});

/* 首页. */
router.get('/home/:name?/:index?', function(req, res) {
    console.log("=====>"+req.params.name);
    switch(req.params.name){
        case "gift_exchange":
            giftExchangeController.getBrandList(req,res,renderView);
            break;
        case "brand":
            brandController.getBrandList(req,res,renderView);
            break;
        case "new_products":
            newListController.getNewList(req,res,renderView);
            break;
        case "hot_sales":
        default:
            hotSalesController.getBrandList(req,res,renderView);
    }
});

/* 品牌列表. */
router.get('/brand/list', function(req, res) {
    brandController.getBrandDetail(req,res,renderView);
});

/* GET users listing. */
router.get('/users', function(req, res) {
    res.send('respond with a resource');
});

/* oauth weixin user */
router.get('/weixin/oauth', function(req, res) {
    weixinController.oauth(req, res, renderView);
});

/* order confirm */
router.get('/order/confirm', function(req, res) {
    weixinController.orderConfirm(req, res, renderView);
});

/* weixin notify */
router.post('/weixin/notify', function(req, res) {
    weixinController.notify(req, res, renderJson);
});

/* GET product info page. */
router.get('/productInfo/:uuid', function(req, res) {
    productController.getProductInfo(req, res, renderView);
});

/* GET product info data. */
router.get('/getProductInfo.ss', function(req, res) {
    productController.getProductInfoData(req, res, renderJson);
});

/* GET product recommands data. */
router.get('/getRecommandList.ss', function(req, res) {
    productController.getRecommandListData(req, res, renderJson);
});

/* GET product commends data. */
router.post('/getCommentList.ss', function(req, res) {
    productController.getCommentListData(req, res, renderJson);
});

/* GET product detail data. */
router.get('/getDetial.ss', function(req, res) {
    productController.getDetailData(req, res, renderJson);
});

/**
 * Render the view and append some common values.
 * @type {Function}
 */
var renderView = exports.renderView = function(req, res, module, view){
//    module.contextPath = setting.contextPath;
//    module.appRoot = __appdir
//    module.keywords = utils.whenUndefined(req.session.keywords, function(value){return '';})
//    module.utils = utils;
//    module.session = req.session;
//    module.cartNumber = 0;
//    module.totalMoney = 0;
//    module.loginNumber = 0;
//    if (req.session.userInfo) {
//        module.userName = req.session.userInfo.userName ? req.session.userInfo.userName : "";
//        module.cartNumber = req.session.userInfo.cartNumber ? req.session.userInfo.cartNumber : 0;
//        module.totalMoney = req.session.userInfo.totalMoney ? req.session.userInfo.totalMoney : 0;
//        module.loginNumber = req.session.userInfo.loginNumber ? req.session.userInfo.loginNumber : 0;
//    }
    res.render(view, module);
};

var renderJson = exports.renderJson = function(req, res, module){
    res.writeHead(200, {"Content-Type": 'text/plain; charset=utf-8'});
    res.end(JSON.stringify(module));
};

module.exports = router;
