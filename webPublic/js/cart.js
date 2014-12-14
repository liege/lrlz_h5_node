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
			if($(this).hasClass('checked')){
				$(this).removeClass("checked");
			}else{
				//添加到订单列表
				Utils.addSkuCount(sku_uuid,count);
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
		//修改数量
		$('.product_detail_plus').on('tap',function(){
			$(this).prev().html(function(i,oldValue){
				return oldValue*1+1;
			});
		});
		$('.product_detail_minus').on('tap',function(){
			$(this).next().html(function(i,oldValue){
				if(oldValue==1){return 1;}
				return oldValue*1-1;
			});
		});	
		//删除收藏
		$('.del_item').on('tap',function(){
			$('.layout_column_list .checked').each(function(i,v){
				Utils.delCart($(v).data('skuuuid'));
				$(v).parents('li').remove();
			})
		})	
	})();
});