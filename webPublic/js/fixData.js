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