var queryUuid = '';// IJ45014z98

$(document).ready(function(){
    init();
    getGoodsInfo();
});

window.onload = function(){
    getCommentList();
    getDetail();
};

function init() {
    bindEvent();
    queryUuid = getQueryString('uuid')?getQueryString('uuid'):'IJ45014z98';
}

function bindEvent(){
    $('#add_cart').on('tap', function(){
        var chooseCount = parseInt($('#chooseCount').text());
        if($(this).hasClass('onCategoryArea')){
            //vincent-todo add cart
            $('#add_cart').removeClass('onCategoryArea').text('加入购物车');
            closeChooseCategory();
        }else{
            $('#add_cart').addClass('onCategoryArea').text('确定');
            showChooseCategory();
        }
    });

    $('#download').on('tap', function(){
        window.location.href = 'http://app.meizhuangyouxuan.com/weixin/appdown.html';
    });

    $('#chooseCategoryArea').on('tap', function(){
        $('#add_cart').addClass('onCategoryArea').text('确定');
        showChooseCategory();
    });

    $('#closeBtn').on('tap', function(){
        $('#add_cart').removeClass('onCategoryArea').text('加入购物车');
        closeChooseCategory();
    });

    $('#minus').on('tap',function(){
        var chooseCount = parseInt($('#chooseCount').text());
        if(chooseCount > 1){
            $('#chooseCount').text(chooseCount-1);
        }
    });

    $('#plus').on('tap',function(){
        var chooseCount = parseInt($('#chooseCount').text());
        $('#chooseCount').text(chooseCount+1);
    });
}

function showChooseCategory(){
    $('#mask').removeClass('displayNone');
    $('#chooseCategory').removeClass('displayNone');
}

function closeChooseCategory(){
    $('#mask').addClass('displayNone');
    $('#chooseCategory').addClass('displayNone');
}

function getGoodsInfo(){
    $.ajax({
        type: 'GET',
//        type: 'POST',
        url: '/ajax/getProductInfo',
//        data: JSON.stringify({ name: 'Zepto.js' }),
//        contentType: 'application/json'
        data: { uuid:queryUuid, appKey:'6581235709', appVer:'1.0'},
        dataType: 'json',
        timeout: 10000,
        beforeSend: function(xhr, opts){
            console.log('opts: ' + JSON.stringify(opts));
        },
        success: function(res){
            console.log('res: ' + JSON.stringify(res));
            var goodsInfo = {};
            if((res && res.success == undefined) || (res && res.success && res.success == 'true')){
                goodsInfo = res;
                showGoodsInfo(goodsInfo);
            }
        },
        error: function(xhr, errorType, error){
            console.log('error: ' + JSON.stringify(error));
        }
    })
}

function showGoodsInfo(goodsInfo){
    var imgUl = $('#focus .bd ul');
    var categoryList = $('#categoryList');
    var picUrlArr = new Array();
    var skuInfo = {};

    if(goodsInfo.pic_url){
        picUrlArr = goodsInfo.pic_url.split(',');
        if(picUrlArr && picUrlArr.length>0){
            $.each(picUrlArr, function(i, item){
                var liNode = $('<li><a><img src=' + item + '></a></li>');
                imgUl.append(liNode);
            });

            TouchSlide({
                slideCell:"#focus",
                titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
                mainCell:".bd ul",
                effect:"leftLoop",
                autoPlay:true,//自动播放
                autoPage:true, //自动分页
//        switchLoad:"_src", //切换加载，真实图片路径为"_src"
                pnLoop:true
            });
        }
    }

//    $('#introduce').text(cutText(goodsInfo.title,20));
    $('#introduce').text(goodsInfo.title);
    var discountPrice = parseInt(goodsInfo.cur_price.split('-')[0]);
    var originalPrice = parseInt(goodsInfo.og_price.split('-')[0]);
    $('#discountPrice').text(discountPrice);
    $('#originalPrice').text(originalPrice);
    if(discountPrice<originalPrice){
        $('#originalPriceArea').removeClass('displayNone');
    }
    $('#integral').text(parseInt(goodsInfo.cur_price.split('-')[0]));
    $('#courierFee').text(parseInt(goodsInfo.cur_price.split('-')[0])<100?10:0);
    $('#monthSale').text(goodsInfo.sales);

    $('#chooseCategory .categoryImg').attr('src', picUrlArr[0]);
    $('#priceRange').text(goodsInfo.cur_price);

    var skuNumber = 0;

    if(goodsInfo.skuinfo){
        skuInfo = goodsInfo.skuinfo;
        if(skuInfo.pvmap){
            $.each(skuInfo.pvmap, function(skuId, pvmapVal){
                skuNumber++;
                var skuKind = pvmapVal.split(';');
                var showName = '';
                $.each(skuKind, function(i, pvid){
                    var pid = pvid.split(':')[0];
                    var vid = pvid.split(':')[1];
                    $.each(skuInfo.pvs, function(i, pvsVal){
                        if(pvsVal.pid == pid){
                            $.each(pvsVal.vals, function(i, vidVal){
                                if(vidVal.vid == vid){
                                    showName = showName + vidVal.name;
                                }
                            });
                        }
                    });
                });

                var spanNone = $('<span>' + showName + '</span>');
                $.each(skuInfo.skumap, function(i, skumapVal){
                    if(skumapVal.skuid == skuId){
                        spanNone.attr('skuPrice', skumapVal.price).attr('skuid', skuId).attr('skuPic', skumapVal.pic_url);
                    }
                });
                categoryList.append(spanNone);
            });

            $('.categoryList span').each(function(i){
                if(i == 0){
                    $(this).addClass('selected');
                    $('#chooseCategory .categoryImg').attr('src', $(this).attr('skuPic'));
                    $('#priceRange').text($(this).attr('skuPrice'));
                }
                $(this).on('tap', function(){
                    $('.categoryList .selected').removeClass('selected');
                    $(this).addClass('selected');
                    $('#chooseCategory .categoryImg').attr('src', $(this).attr('skuPic'));
                    $('#priceRange').text($(this).attr('skuPrice'));
                });
            });
        }
    }
}

function getCommentList(){
    $.ajax({
        type: 'POST',
        url: '/ajax/getCommentList',
        data: JSON.stringify({uuid: queryUuid, limit: '10', type: '1', appKey:'6581235709', appVer:'1.0'}),
        contentType: 'application/json',
        dataType: 'json',
        timeout: 10000,
        beforeSend: function(xhr, opts){
            console.log('opts: ' + JSON.stringify(opts));
        },
        success: function(res){
            console.log('res: ' + JSON.stringify(res));
            var comments = new Array();
            if((res && res.success == undefined) || (res && res.success && res.success == 'true')){
                comments = res;
                showCommentList(comments);
            }
        },
        error: function(xhr, errorType, error){
            console.log('error: ' + JSON.stringify(error));
        }
    })
}

function showCommentList(comments){
    var evaluationUl = $('#evaluation .bd ul');

    if(comments && comments.length>0){
        $.each(comments, function(i, item){
            if(item.comment && item.comment.trim()){
                var liNoneStr = '<li><div class="userInfo"><span class="userName">'+item.time
                    +'</span><span class="time"></span></div><div class="comment">'
                    + item.comment + '</div></li>';
                var liNode = $(liNoneStr);
                evaluationUl.append(liNode);
            }
        });

        TouchSlide({
            slideCell:"#evaluation",
            titCell:".hd li", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
            mainCell:".bd ul",
            effect:"leftLoop",
            autoPlay:true,//自动播放
//        autoPage:true, //自动分页
//        switchLoad:"_src", //切换加载，真实图片路径为"_src"
            pnLoop:true
        });
    }
}

function getDetail(){
    $.ajax({
        type: 'GET',
        url: '/ajax/getDetial',
        data: { uuid:queryUuid, last_modified:'0', appKey:'6581235709', appVer:'1.0'},
        dataType: 'json',
        timeout: 10000,
        beforeSend: function(xhr, opts){
            console.log('opts: ' + JSON.stringify(opts));
        },
        success: function(res){
            console.log('res: ' + JSON.stringify(res));
            var productDetail = {};
            if((res && res.success == undefined) || (res && res.success && res.success == 'true')){
                productDetail = res;
                showDetail(productDetail);
            }
        },
        error: function(xhr, errorType, error){
            console.log('error: ' + JSON.stringify(error));
        }
    })
}

function showDetail(productDetail){
    var detailContent = $('#detailContent');

    if(productDetail.url){
        detailContent.attr('src', productDetail.url).attr('height', '400px');
    }
}

function cutText(str, length){
    var sub_length = length ;
    var temp1 = str.replace(/[^\x00-\xff]/g,"**");//匹配双字节字符
    var temp2 = temp1.substring(0,sub_length);
    //找出有多少个*
    var x_length = temp2.split("\*").length - 1 ;
    var hanzi_num = x_length /2 ;
    sub_length = sub_length - hanzi_num ;//实际需要sub的长度是总长度-汉字长度
    var res = str.substring(0,sub_length);
    if(sub_length < str.length ){
        var end  =res+"..." ;
    }else{
        var end  = res ;
    }
    return end ;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2]; return null;
}

