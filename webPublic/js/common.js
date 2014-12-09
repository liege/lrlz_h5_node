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
});

/**
 * [Tab description] 选项卡
 * @param {[type]} hd [切换标签集合 jq、zepto、类数组对象]
 * @param {[type]} bd [切换内容集合 jq、zepto、类数组对象]
 */
function Tab(option){
	this.hd = option.hd;
	this.bd = option.bd;
	this.switchEndCB = option.switchEnd;
	this.bind();
}
Tab.prototype.bind = function(){
	var hd = this.hd,
		bd = this.bd,
		_this = this;
	hd.on("tap",function(e){
		$(this).addClass("current").siblings().removeClass("current");
		bd.eq($(this).index()).show().siblings().hide();
		_this.switchEndCB($(this).index())
	})	
}






