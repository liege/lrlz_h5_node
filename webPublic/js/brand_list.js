$(function(){
	$('.brand_list').find('.title').each(function(i,v){
		$(v).html(cutText($(v).data("value"),42));
	});
});