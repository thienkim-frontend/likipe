jQuery(document).ready(function ($) {
	/*-----------------------------------------
    SMOOTH SCROLL - https://github.com/kswedberg/jquery-smooth-scroll
    ------------------------------------------*/
	init_navigation_scroll = function() {
    $('.scroll-nav li a, a.scroll').smoothScroll({
      speed: 600,
      offset:-60
    });
  };
	init_navigation_scroll();

	$('[data-toggle="tooltip"]').tooltip(); 

	$('.testimonials-carousel').owlCarousel({
    items: 1,
    nav: true,
    singleItem: true,
    navText: ["<i class='icon-prev'></i>", "<i class='icon-next'></i>"]
	});

	/*-----------------------------------------
    PROJECT CAROUSEL
    ------------------------------------------*/
 	// $('.project-carousel').owlCarousel({
  //   items:1,
  //   stagePadding:50,
  //   loop:true,
  //   dotsData:true,
 	// });
  if($(".project-carousel").length){
    var $sync1 = $(".main-carousel"),
        $sync2 = $(".thumbs-carousel"),
        flag = false,
        duration = 0;

    $sync1
      .owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        navText: ["<i class='icon-prev'></i>", "<i class='icon-next'></i>"]
      })
      .on('changed.owl.carousel', function (e) {
        if (!flag) {
          flag = true;
          $sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
          $sync2.find(".owl-item").removeClass('current-thumbnail').eq(e.item.index).addClass('current-thumbnail');
          flag = false;
        }
      });

    
    $sync2
      .owlCarousel({
        margin: 20,
        items: 4,
        nav: true,
        dots: false,
        navText: ["<i class='icon-prev'></i>", "<i class='icon-next'></i>"]
      })
      .on('click', '.owl-item', function () {
        $sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
        $(this).addClass('current-thumbnail');
      })
      .on('changed.owl.carousel', function (e) {
        if (!flag) {
          flag = true;    
          $sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
          $sync2.find(".owl-item").removeClass('current-thumbnail').eq(e.item.index).addClass('current-thumbnail');
          flag = false;
        }
      })
      .on('initialized.owl.carousel', function(e){
      });
    $sync2.find(".owl-item").eq(0).addClass('current-thumbnail');
    
  	}
  

	new WOW().init();
	

	/*-----------------------------------------
    ANIMATED DEVICE
    ------------------------------------------*/
	var duration = 4000, steps = 3, step = 1;
	setInterval(function () {
		$('.animation').attr('data-animation-step', step = ++step > steps ? 1 : step);
	}, duration / steps);

	/*-----------------------------------------
    VERTICAL TABS
    ------------------------------------------*/
	if($(".service-tabs").length){
		$(".nav-stacked").each(function() {
			var tabEl = $(".service-tabs"),
				a = tabEl.find(".nav-tabs"),
				// d = a.find(".active"),
				o = tabEl.find(".tabs-nav-line"),
				n = a.find("> li"),
				i = !1,
				s = function() {
				  var e = $(".nav-tabs").find(".active");
				  $(".tabs-nav-line").css({
					"height": e.outerHeight(),
					"top": e.offset().top - $(".nav-tabs").offset().top,
					"opacity": 1
				  });
			  };
			  s();
			  $(".active").length && s(),
			  n.each(function() {
				  var t = $(this),
					d = t.outerHeight(),
					n = a.offset().top,
					s = t.offset().top - n;
				  i || (o.css("top", s), i = !0);
				  t.mouseenter(function() {
					  o.css("height", d);
					  o.css("top", s);
				  });
			  });
			  a.mouseleave(function() {
				  s();
			  });
		  });
		}

	/*-----------------------------------------
    PROGRESS BARS
    ------------------------------------------*/
	function InitProgressBars(el){

		el.length && el.each(function(){
		  var selft = $(this),
			progressEl = selft.find(".content"),
			titleEl = $(this).find(".title-holder"),
			percent = progressEl.data("percentage");
		  $(this).appear( function() {
			// this element is now inside browser viewport
			animateProgessBar(titleEl, percent);
			progressEl.css("width", "0%").animate({ width: percent + "%"}, 500);
		  });
		});
  }
  function animateProgessBar(el, percent){
		var titleEl = $(el).find(".percent");
		$(titleEl)
		  .css("opacity", "1")
		  .countTo({
				from: 0,
				to: percent,
				speed: 500,
				refreshInterval: 50
		  })
		  .addClass("active")
		  .animate({ left: titleEl.data("position") + "%" }, 500);
  }
  InitProgressBars($('.likipe-progress-bar'));
	  
	blogisotope = function() {
		var gutterwidth, 
			conwidth = jQuery('.blog-masonry').width(), 
			columnwidth = Math.floor(conwidth);
		if ($('.blog-masonry').hasClass('three-columns') === true) {
			columnwidth = Math.floor(conwidth * 0.3033);
			gutterwidth = Math.floor(conwidth * 0.04);
			if ($(window).width() < 1023) {
				if ($(window).width() < 768) {
					columnwidth = Math.floor(conwidth * 1);
				} else {
					columnwidth = Math.floor(conwidth * 0.48);
				}
			} else {
				columnwidth = Math.floor(conwidth * 0.3033);
			}
		}
		$('.blog-masonry').find('.post-masonry').each(function() {
			$(this).css({
				'width': columnwidth
			});
		});
		return gutterwidth;
	}
	var $blog_container = $('.blog-masonry');
	bloggingIsotope = function() {
		$blog_container.isotope({
			itemSelector: '.post-masonry',
			animationEngine: 'jquery',
			masonry: {
				gutterWidth: blogisotope()
			}
		});

	};
	bloggingIsotope();

	/* ISOTOPE GRID */
	jQuery('.isotope-grid').each(function() {
			var $grid,
	    		$div = jQuery(this),
	    		$container = jQuery(".project-grid"),
	    		$initial_filter = '*';
	  
	    colWidth = function() {
	        var w = $container.width(),
	            columnNum = 1,
	            columnWidth = 0;
	        
	        if (w > 1440) { columnNum = 7; } 
	        else if (w > 1023) { columnNum = 5; } 
	        else if (w > 767) { columnNum = 3; } 
	        else if (w > 479) { columnNum = 2; } 

	        columnWidth = Math.floor(w / columnNum);

	        $container.find('.grid-item').each(function() {
	            var $item = jQuery(this);
	            var gwidth = 4;
	            $item.css({ 'margin': gwidth / 2 });
	            if ($item.hasClass('item-wide')) {
	                if (w < 480) { 
	                	jQuery('.item-wide').css({ 'width': ((columnWidth) - gwidth) + 'px', 'height': Math.round(((columnWidth) - gwidth) * 0.7777777) + 'px' });
		                jQuery('.item-wide img').css({ 'width': ((columnWidth) - gwidth) + 'px', 'height': 'auto' }); 
		            } 
	                else { jQuery('.item-wide').css({ 'width': ((columnWidth * 2) - gwidth) + 'px', 'height': Math.round((2 * (((columnWidth) - gwidth) * 0.7777777)) + gwidth) + 'px' });
                    jQuery('.item-wide img').css({ 'width': ((columnWidth * 2) - gwidth) + 'px', 'height': 'auto' }); }
	            }
	            if ($item.hasClass('item-small')) { 
	            	jQuery('.item-small').css({ 'width': ((columnWidth) - gwidth) + 'px', 'height': Math.round(((columnWidth) - gwidth) * 0.7777777) + 'px' });
	            	jQuery('.item-small img').css({ 'width': ((columnWidth) - gwidth) + 'px', 'height': 'auto' });
	            }   
	            if ($item.hasClass('item-long')) {
	                if (w < 480) { 
	                	jQuery('.item-long').css({ 'width': ((columnWidth) - gwidth) + 'px', 'height': Math.round(((columnWidth) - gwidth) * 0.7777777 / 2) + 'px' });
	                	jQuery('.item-long img').css({ 'width': ((columnWidth) - gwidth) + 'px', 'height': 'auto' }); 
	                } else { 
	                	jQuery('.item-long').css({ 'width': ((columnWidth * 2) - gwidth) + 'px', 'height': Math.round(((columnWidth) - gwidth) * 0.7777777) + 'px' });
                        jQuery('.item-long img').css({ 'width': ((columnWidth * 2) - gwidth) + 'px', 'height': 'auto' }); 
	                }
	            }
	            if ($item.hasClass('item-high')) { 
	            	jQuery('.item-high').css({ 'width': ((columnWidth) - gwidth) + 'px', 'height': Math.round((2 * (((columnWidth) - gwidth) * 0.7777777)) + gwidth) + 'px' });
	            	jQuery('.item-high img').css({ 'width': ((columnWidth) - gwidth) + 'px', 'height': 'auto' });
	            }
	        });
	        return columnWidth;
	    }
	    gridIsotope = function() {
		    $grid = $container.isotope({
	    		layoutMode: 'masonry', 
	    		itemSelector: '.grid-item', 
	    		animationEngine: 'jquery', 
	    		filter: $initial_filter, 
	    		masonry: { columnWidth: colWidth(), gutterWidth: 0 } 
	    	});
    	} 
	    resizedIsotope = function() { 
	    	$container.isotope({ 
	    		layoutMode: 'masonry', 
	    		itemSelector: '.grid-item', 
	    		animationEngine: 'jquery', 
	    		masonry: { columnWidth: colWidth(), gutterWidth: 0 } 
	    	}); 
	    };
	    gridIsotope();
	    // jQuery(window).smartresize(resizedIsotope);
	    jQuery(window).load(gridIsotope);

	    // filter items on button click
			$('.filter-button-group').on( 'click', 'a', function(e) {
				$('.filter-button-group li').removeClass('active');
				$(this).parent('li').addClass('active');
			  var filterValue = $(this).attr('data-filter');
			  $grid.isotope({ filter: filterValue });
			  e.preventDefault();
			});
	});

	$(window).resize(bloggingIsotope);
	$(window).load(bloggingIsotope);


	/*-----------------------------------------
    GOOGLE MAP
    ------------------------------------------*/
  $(".button-map").click(function(event) {
		$(this).toggleClass('show-map').next("#likipe-google-map").slideToggle(400, function(){
			initMap();
		});
		
		// google.maps.event.trigger(map, "resize");
		event.preventDefault();
	});
  function initMap(){
    // New map
    var map = new google.maps.Map(document.getElementById('likipe-google-map'), {
      zoom:2,
      center:{lat:41.581354,lng:64.149791},
      fullscreenControl: true
    });

    // Listen for click on map
    google.maps.event.addListener(map, 'click', function(event){
      addMarker({coords:event.latLng});
    });
    google.maps.event.addDomListener(window, "resize", function() {
	    var center = map.getCenter();
	    google.maps.event.trigger(map, "resize");
	    map.setCenter(center); 
		});

    // Array of markers
    var markers = [{
        coords:{lat:10.790024,lng:106.684164}, 
        content:'<h3>Vietnam, HCMC</h3>'
      },
      {
        coords:{lat:57.730685,lng:12.938872},
        content:'<h3>Sverige, Borås</h3>'
      }];

    for(var i = 0;i < markers.length;i++){
      addMarker(markers[i]);
    }

    // Add Marker Function
    function addMarker(props){
      var marker = new google.maps.Marker({
        position:props.coords,
        map:map,
        icon:'http://demo.deliciousthemes.com/patti/wp-content/themes/patti/images/map-pin.png',
        // content:props.content
      });
    }
    
  }
  
});



