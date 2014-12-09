$(function(){
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
	ajaxRenderTemplate(hotSalesTemp,"activity05");

});

/**
 * [ajaxRenderTemplate description] ajax加载数据渲染局部视图
 * @param  {[type]} templateStr [art 模板片段]
 * @param  {[type]} scat_uuid   [activity05/6/7/8]
 * @return {[type]}             [undefined]
 */
function ajaxRenderTemplate(templateStr,scat_uuid){
	console.log(scat_uuid);
	$.ajax({
		type:"GET",
		url:"/ajax/getHotSales/"+scat_uuid,
        dataType: 'json',
        timeout: 10000,
        success:function(res){
			var render = template.compile(templateStr);
			var html = render(res);
			$(".caizhuang").html(html);	
        }		
	});			
}