var hotSalesTemp = 
			'<% products.forEach(function(v){ %>'+
			'<li>'+
				'<div class="pic">'+
					'<a href=/product/detail/<%= v.uuid%>><img src=<%= v.pic_url %> alt=""></a>'+
				'</div>'+
				'<div class="info">'+
					'<p class="title"><%= v.title %></p>'+
					'<div class="meta">'+
						'<p class="cur_price">兑换积分<%= v.cur_price %></p>'+
						'<p class="og_price">原价<%= v.og_price %></p>'+					
					'</div>'+
					'<div class="layout_bot">'+
						'<p class="sales"><%= v.sales %>人已兑换</p>'+
						'<div class="cart"><a href="/uuid"></a></div>'+
					'</div>'+
				'</div>'+
			'</li>'+
			'<% }) %>';	