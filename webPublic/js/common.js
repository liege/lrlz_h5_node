// 首页4栏切换
$(function(){
	//首先选项卡初始化显示页面 0，1，2，3
	var pageIndex = parseInt(window.location.href.substr(-1,1));
	pageIndex = typeof(pageIndex)!="number"||pageIndex>3?0:pageIndex;
	TouchSlide({ 
		slideCell:"#touchSlide",
		titCell:".tab_li li", 
		mainCell:".tab_container",
		titOnClassName:"current",
		defaultIndex:pageIndex
	});
});

/*截取多余字符*/
$(function(){
	$('.brand_list').find('.title').each(function(i,v){
		$(v).html(cutText($(v).data("value"),40));
	});
});
