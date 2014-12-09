// 首页4栏切换
$(function(){
	//首先选项卡初始化显示页面 0，1，2，3
	var pageIndex = parseInt(window.location.href.substr(-1,1));
	pageIndex = typeof(pageIndex)!="number"||pageIndex>3?0:pageIndex;
	new TouchSlide({ 
		slideCell:"#touchSlide",
		titCell:".tab_li li", 
		mainCell:".tab_container",
		titOnClassName:"current",
		defaultIndex:pageIndex,
		startFun:function(i,c){ 
			if(i!=0){
				$(".banner").hide();
			}else{
				$(".banner").show();
			}
		}
	});
	//首页 分类列表选项卡初始化
	new Tab($('.tab_hd li'),$('.tab_bd ul')).callBack;
});

/*截取多余字符*/
$(function(){
	$('.brand_list').find('.title').each(function(i,v){
		$(v).html(Utils.cutText($(v).data("value"),40));
	});
});
/*截取多余字符*/
$(function(){
	$('.brand_list').find('.memo').each(function(i,v){
		$(v).html(Utils.cutText($(v).data("value"),60));
	});
});
/**
 * [Tab description] 选项卡
 * @param {[type]} hd [切换标签集合 jq、zepto、类数组对象]
 * @param {[type]} bd [切换内容集合 jq、zepto、类数组对象]
 */
function Tab(option){
	this.hd = option.hd;
	this.bd = option.bd;
	this.callBack = function(index){
		console.log("===>"+index);
	}
	this.bind();
}
Tab.prototype.bind = function(){
	var hd = this.hd,
		bd = this.bd,
		_this = this;
	hd.on("tap",function(e){
		$(this).addClass("current").siblings().removeClass("current");
		bd.eq($(this).index()).show().siblings().hide();
		_this.callBack($(this).index())
	})	
}






