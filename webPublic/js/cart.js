/**
 * [renderTemplate description]数据渲染局部视图
 * @param  {[type]} $wrap       [渲染内容容器]
 * @param  {[type]} templateStr [art 模板片段]
 * @param  {[type]} data        [json]
 * @return {[type]}             [undefined]
 */
function renderTemplate($wrap,templateStr,data){
	var oData = {};
	oData.products = data;
	console.log(oData);
	var render = template.compile(templateStr);
	var html = render(oData);
	$wrap.html(html);	
}
$(function(){
	//通过本地数据渲染列表	
	renderTemplate($('.layout_column_list'),cartListTemp,Utils.getCartList());
	//check事件
	(function(){
		var $checkbox = $('.layout_column_list .checkbox');
		//单选
		$checkbox.on('tap',function(){
			var sku_uuid = $(this).data('sukuuid');
			var count = $(this).parents('li').find('.value').html();
			console.log(sku_uuid+"-"+count);
			if($(this).hasClass('checked')){
				$(this).removeClass("checked");
				//添加到订单列表
				Utils.addSkuCount(sku_uuid,count);
			}else{
				$(this).addClass("checked");
			}
			//全选后取消单个
			$checkbox.each(function(i,v){
				if(!$(v).hasClass('checked')){
					$('.checkall').removeClass("checked");
				}
			});
		});
		//全选
		$('.checkall').on('tap',function(){		
			if($(this).hasClass('checked')){
				$('.checkbox').each(function(i,v){
					$(v).removeClass("checked");
				});
			}else{
				$('.checkbox').each(function(i,v){
					$(v).addClass("checked");
				});						
			}
		});
	})()
});