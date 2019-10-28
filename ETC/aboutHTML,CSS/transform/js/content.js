$(document).ready(function(e){
  bxSlider2();

  $(".tooltip1").mouseenter(function(){
	$(this).animate({top:'311px'});
  });

  $(".tooltip1").mouseleave(function(){
	$(this).animate({top:'326px'});
  });

  $(".tooltip2").mouseenter(function(){
	$(this).animate({top:'217px'});
  });

  $(".tooltip2").mouseleave(function(){
	$(this).animate({top:'232px'});
  });

  $(".tooltip3").mouseenter(function(){
	$(this).animate({top:'303px'});
  });

  $(".tooltip3").mouseleave(function(){
	$(this).animate({top:'318px'});
  });

  $(".tooltip4").mouseenter(function(){
	$(this).animate({top:'338px'});
  });

  $(".tooltip4").mouseleave(function(){
	$(this).animate({top:'352px'});
  });
});

$(function () {
	// top버튼 스크립트
	$(window).scroll(function () {
		var contentsHeight = $("#wrap").height(),
		winscrolltop = $(window).scrollTop(),
		winscrollbtm = contentsHeight - $(window).height();
		if (winscrolltop > winscrollbtm - 100) {
			$('#top').css('bottom','417px');
		} else {
			$('#top').css('bottom','30px');
		}

		if (winscrolltop > 200) {
			$('#top').fadeIn();
		} else {
			$('#top').fadeOut();
		}
	});

	$('#top').click(function () {
		$('html, body').animate({ scrollTop: 0});
	});
});

// 팝업
$(function(){
	$('.md-trigger').on('click',function(){
		$('html,body').css({'overflow':'hidden'});
	});
	$('.btn_close').on('click',function(){
		$('html,body').css({'overflow':'auto'});
	});
});

// bxslider 롤링
function bxSlider2(){
	var slider= $("#bxslider2").bxSlider({
		infiniteLoop:true,
		touchEnabled:true
	});
}
/*
$(function(){
	$('.lst_tab a').click(function(){
		$('.lst_tab a').removeClass('active');
		$(this).addClass('active');
		 $(".tab_view").hide()
		var activeView = $(this).attr("href");
		$(activeView).show();
		return false;
	});
});
*/

$(function(){
	
	var img = $('.thumb_mobile.v1').html();
	var img2 = $('.thumb_mobile.v2').html();
	var img3 = $('.thumb_mobile.v3').html();
	var img4 = $('.thumb_mobile.v4').html();

	
	$('.lst_tab>li>a').click(function(){
		var idx = $(this).parent().index();
		$('.lst_tab a').removeClass('active');
		$(this).addClass('active');
		$('.tab_view').removeClass('on');
		$('.tab_view:eq('+idx+')').addClass('on');
		
		$('.thumb_mobile.v1').children().remove();
		$('.thumb_mobile.v1').append(img);
		$('.thumb_mobile.v2').children().remove();
		$('.thumb_mobile.v2').append(img2);
		$('.thumb_mobile.v3').children().remove();
		$('.thumb_mobile.v3').append(img3);
		$('.thumb_mobile.v4').children().remove();
		$('.thumb_mobile.v4').append(img4);
	});
	
	$('.lst_tooltip>li>a').click(function(){
		var idx2 = $(this).index();
		$(this).addClass('clear');
		$('.lst_tab>li>a').removeClass('active');
		$('.lst_tab>li:eq('+idx2+')').children().addClass('active');
		$('.tab_view').removeClass('on');
		$('.tab_view:eq('+idx2+')').addClass('on');	
		
		$('.thumb_mobile.v1').children().remove();
		$('.thumb_mobile.v1').append(img);
		$('.thumb_mobile.v2').children().remove();
		$('.thumb_mobile.v2').append(img2);
		$('.thumb_mobile.v3').children().remove();
		$('.thumb_mobile.v3').append(img3);
		$('.thumb_mobile.v4').children().remove();
		$('.thumb_mobile.v4').append(img4);
		
		setInterval(function(){
			$('.thumb_mobile.v1').children().animate({'top':'-377px'},5000).animate({'top':0},5000);
		},0);
		setInterval(function(){
			$('.thumb_mobile.v2').children().animate({'top':'-484px'},6000).animate({'top':0},6000);
		},0);
		setInterval(function(){
			$('.thumb_mobile.v3').children().animate({'top':'-695px'},8000).animate({'top':0},8000);
		},0);
		setInterval(function(){
			$('.thumb_mobile.v4').children().animate({'top':'-317px'},4500).animate({'top':0},4500);
		},0);
	});
	
	
	/*
	if($('.tab_menu.v2').hasClass('active')){
		setInterval(function(){
			$('.thumb_mobile.v2').children().stop().animate({'top':'-377px'},1000).animate({'top':0},1000);
		},0);
	}else{
		$('.thumb_mobile.v2').children().stop().animate({'top':0},1000);
	}
	*/
	/*
	$('.tab_menu.v1,.tooltip2').click(function(){
		setInterval(function(){
			$('.thumb_mobile.v1').children().animate({'top':'-377px'},5000).animate({'top':0},5000);
		},0);
	});
	
	$('.tab_menu.v2,.tooltip1').click(function(){
		setInterval(function(){
			$('.thumb_mobile.v2').children().animate({'top':'-484px'},6000).animate({'top':0},6000);
		},0);
	});
	$('.tab_menu.v3,.tooltip3').click(function(){
		setInterval(function(){
			$('.thumb_mobile.v3').children().animate({'top':'-695px'},8000).animate({'top':0},8000);
		},0);
	});
	$('.tab_menu.v4,.tooltip4').click(function(){
		setInterval(function(){
			$('.thumb_mobile.v4').children().animate({'top':'-317px'},4500).animate({'top':0},4500);
		},0);
	});
	*/
	
	
	
	/*
	$('.thumb_mobile').mouseenter(function(){
		$(this).children().stop().animate({'top':'-' + ($(this).children().height() - 357)  + 'px'},3000)
	});
	$('.thumb_mobile').mouseleave(function(){
		$('.thumb_mobile').children().stop().animate({'top':0},3000)
	});
	*/
});
