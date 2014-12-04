var Utils = {
    'cutText' : function(str, length){
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
    },

    'loadImages' : (function() {
        var imgIndex = 0;

        return function(imgs, index, data){ // param imgs: zepto collections
            data = data ? data : 'data-original';

            if (index == 0) {
                imgIndex = 0;
            }

            for (var i = imgIndex; i < imgs.length; i++){
                if (imgs[i].offset.top < imgs[i].scrollTop() + window.innerHeight){
                    var data_src = imgs[i].attr(data);
                    if (data_src) {
                        imgs[i].attr('src', data_src);
                    }
                    imgs[i].onload = function(){
                        this.css('opacity', '1');
                    };
                } else {
                    imgIndex = i;
                    break;
                }
            }
        };
    })()
};