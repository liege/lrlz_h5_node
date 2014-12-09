$(function(){
	// 首页4栏切换
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

	// 首页四块内容切换
	new TouchSlide({ 
		slideCell:"#banner",
		titCell:".banner_hd", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		mainCell:".banner_bd", 
		effect:"left", 
		autoPlay:true,//自动播放
		autoPage:true, //自动分页
		switchLoad:"_src" //切换加载，真实图片路径为"_src" 
	});
	//阻止冒泡
	$(".banner_bd").on("touchmove",function(e){
		// return false;
		e.stopPropagation();
	});
	//fix index-hotSales banner style [touchslide]
	$("#banner").width(window.innerWidth-6+"px");
	(function(){
		var evt = "onorientationchange" in window ? "orientationchange" : "resize";
		window.addEventListener(evt, function() {
			$("#banner").width(window.innerWidth-6+"px");
		}, false);
	})();
	//首页列表加载
	if(window.hotSalesTemp){
		ajaxRenderTemplate(hotSalesTemp,"activity05",$(".caizhuang"));
	}
	//首页 分类列表选项卡初始化
	new Tab({
		hd:$('.tab_hd li'),
		bd:$('.tab_bd ul'),
		switchEnd:function(index){
			if(this.bd.eq(index).html()!=""){
				return;
			}else{
				ajaxRenderTemplate(hotSalesTemp,"activity0"+(5+index),this.bd.eq(index));
			}
		}
	});
	// 列表页收藏商品按钮
	$('.addFavor').on("tap",function(){
		if($(this).data("flag") && $(this).data("flag")=="addFavor"){
			$(this).data("flag","rmFavor");
		}else{
			$(this).data("flag","addFavor");
		}
		return false;
	});
});

/**
 * [ajaxRenderTemplate description] ajax加载数据渲染局部视图
 * @param  {[type]} templateStr [art 模板片段]
 * @param  {[type]} scat_uuid   [activity05/6/7/8]
 * @return {[type]}             [undefined]
 */
function ajaxRenderTemplate(templateStr,scat_uuid,$wrap){
	console.log(scat_uuid);
	$.ajax({
		type:"GET",
		url:"/ajax/getHotSales/"+scat_uuid,
        dataType: 'json',
        timeout: 10000,
        success:function(res){
			var render = template.compile(templateStr);
			var html = render(res);
			$wrap.html(html);	
        }		
	});			
}