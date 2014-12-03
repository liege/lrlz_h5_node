$(document).ready(function(){
    init();
//    getGoodsInfo();
    var introduce = 'Jurlique茱莉蔻玫瑰衡肤花卉水澳洲进口正品满200减100满400减200';
    $('#introduce').text(cutText(introduce,35));

    bindEvent();
});

function init(){
}

function bindEvent(){
    $('#addAddress').on('tap', function(){
        $('#addAddress').addClass('displayNone');
        $('#editAddress').removeClass('displayNone');
    });

    $('#buyerName').on('input focus', function(){
        var buyerName = $('#buyerName').val().trim();
        if(!buyerName){
            $('#nameErrMsg').removeClass('displayNone');
        }else{
            $('#nameErrMsg').addClass('displayNone');
        }
    });
    $('#buyerPhone').on('input focus', function(){
        var phoneReg = /^1[3-8]\d{9}$/;
        var buyerPhone = $('#buyerPhone').val().trim();
        if(!phoneReg.test(buyerPhone)){
            $('#phoneErrMsg').removeClass('displayNone');
        }else{
            $('#phoneErrMsg').addClass('displayNone');
        }
    });
    $('#buyerAddress').on('input focus', function(){
        var buyerAddress = $('#buyerAddress').val();
        if(!buyerAddress){
            $('#addressErrMsg').removeClass('displayNone');
        }else{
            $('#addressErrMsg').addClass('displayNone');
        }
    });

    $('#completeBtn').on('tap', function(){
        var checkFlag = checkInputVal();
        if(checkFlag){
            $('#completeName').val($('#buyerName').val());
            $('#completePhone').val($('#buyerPhone').val());
            $('#completeAddr').val($('#buyerAddress').val());
            $('#editAddress').addClass('displayNone');
            $('#completeAddress').removeClass('displayNone');
        }
    });

    $('#editBtn').on('tap', function(){
        $('#completeAddress').addClass('displayNone');
        $('#editAddress').removeClass('displayNone');
    });

    $('#payBtn').on('tap', function(){
//        alert('call pay');
        callPay();
//        window.location.href = 'http://detail.m.tmall.com/item.htm?id=35598128047&sid=927a79b2f63dbf04&abtest=5&rn=0bb11bef2ab4ba09d4c4e5a60b9e18b6'
    });
}

function checkInputVal(){
    var checkFlag = false;
    var phoneReg = /^1[3-8]\d{9}$/;
    var buyerName = $('#buyerName').val().trim();
    var buyerPhone = $('#buyerPhone').val().trim();
    var buyerAddress = $('#buyerAddress').val();

    if(buyerName && phoneReg.test(buyerPhone) && buyerAddress){
        checkFlag = true;
    }else{
        if(!buyerName){
            $('#nameErrMsg').removeClass('displayNone');
        }else{
            $('#nameErrMsg').addClass('displayNone');
        }

        if(!phoneReg.test(buyerPhone)){
            $('#phoneErrMsg').removeClass('displayNone');
        }else{
            $('#phoneErrMsg').addClass('displayNone');
        }

        if(!buyerAddress){
            $('#addressErrMsg').removeClass('displayNone');
        }else{
            $('#addressErrMsg').addClass('displayNone');
        }
    }

    return checkFlag;
}

function getGoodsInfo(){
    $.ajax({
        type: 'GET',
//        type: 'POST',
        url: 'http://localhost:3000/getProductInfo',
//        data: JSON.stringify({ name: 'Zepto.js' }),
//        contentType: 'application/json'
        data: { uuid: 'IJ45014z98'},
        dataType: 'json',
        timeout: 3000,
        beforeSend: function(xhr, opts){
            console.log('opts: ' + JSON.stringify(opts));
        },
        success: function(res){
            console.log('res: ' + JSON.stringify(res));
            showGoodsInfo(res);
        },
        error: function(xhr, errorType, error){
            console.log('error: ' + JSON.stringify(error));
        }
    })
}

function showGoodsInfo(goodsInfo){

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

