/*截取多余字符*/
$(function(){
	$('.layout_dblist').find('.title').each(function(i,v){
		$(v).html(Utils.cutText($(v).data("value"),40));
	});
});
/*截取多余字符*/
$(function(){
	$('.layout_dblist').find('.memo').each(function(i,v){
		$(v).html(Utils.cutText($(v).data("value"),60));
	});
});	
/*截取多余字符*/
$(function(){
	$('.layout_column_list').find('.title').each(function(i,v){
		$(v).html(Utils.cutText($(v).html(),24));
	});
});	