document.addEventListener("DOMContentLoaded", function (){
	const bodyEl = document.body;
	/*========Lazy Load============ */
	$('.lazy').Lazy();

	/*========HEADER VIDEO============ */
	const videoBox = document.querySelector('#video-box');
	if(videoBox){
		const videoContent = videoBox.querySelector('#video');
		const videoToggleBtn = videoBox.querySelector('#video-btn');
		
		videoToggleBtn.addEventListener('click', ()=>{
			if(!videoToggleBtn.classList.contains('active')){
				videoContent.pause();
				videoToggleBtn.classList.add('active');
				videoToggleBtn.querySelector('span').textContent = 'Возобновить видео';
				
			}else{
				videoContent.play();
				videoToggleBtn.classList.remove('active');
				videoToggleBtn.querySelector('span').textContent = 'Приостановить видео';
				
			}
			
		});
	}
	/*==============FOR HEADER SEARCH FORM ============= */
	
	const openSearchForm = document.querySelector('#search-btn');
	const searchFormPopup = document.querySelector('#search-popup');
	if(openSearchForm){
		openSearchForm.addEventListener('click', ()=>{
			bodyEl.classList.add('lock');
			if(searchFormPopup.classList.contains('active')){
				searchFormPopup.classList.remove('active');
				bodyEl.classList.remove('lock');
			}else{
				searchFormPopup.classList.add('active');
				bodyEl.classList.add('lock');
			}
			
		});
		/*====== click for overlay ====*/
		searchFormPopup.addEventListener('click', (e)=>{
			if(e.target == e.currentTarget){
				searchFormPopup.classList.remove('active');
				bodyEl.classList.remove('lock');
			}
		});
	}
    /*===============MOBILE MENU ==================*/
	const menuToggle = document.querySelector('#menu-toggle');
	const mobileMenu = document.querySelector('#mobile-menu');
	

	if (menuToggle) {
		const  mobMenuDropItem = mobileMenu.querySelectorAll('.drop-menu-li');
		
		/*   клик по иконке гамбургер*/  
		menuToggle.addEventListener('click', ()=> {
			
			if (menuToggle.classList.contains('active')) {
				mobileMenu.querySelector('.active')?.classList.remove('active');
				menuToggle.classList.remove('active');
				mobileMenu.classList.remove('active');
				bodyEl.classList.remove('lock');
				
			
			} else {
				menuToggle.classList.add('active');
			    mobileMenu.classList.add('active');
				bodyEl.classList.add('lock');
			}
		});

       /*   клик по мобильному меню*/  
		
		for(let item of mobMenuDropItem){
			item.addEventListener('click', function(e){
				item.querySelector('.drop-menu-wrapper').classList.add('active');
			});
			item.querySelector('.back-link').addEventListener(
				'click', 
				(e) => {
					e.stopPropagation();
					e.target.closest('.drop-menu-wrapper').classList.remove('active');
				}
			);
		}
	}
	/*================ FIXED BOTTOM BUTTONS============ */
	const fixedButtons = document.querySelector('#fixed-buttons');
	if(fixedButtons){
		window.addEventListener('scroll', ()=>{
			if(window.scrollY > 500){
				fixedButtons.classList.add('active');
			}else{
				fixedButtons.classList.remove('active');
			}
		});
	}

	/*================ STAGES TABS============ */
	$('.custom-tabs').each(function() {
		let ths = $(this);
		ths.find('.custom-tab').not(':first').hide();
		ths.find('.tab-btn').click(function() {
			ths.find('.tab-btn').removeClass('active').eq($(this).index()).addClass('active');
			ths.find('.custom-tab').hide().eq($(this).index()).fadeIn()
		}).eq(0).addClass('active');
	});

	/*============== ACORDION ========== */
	;(function ($, window, document, undefined) {
		"use strict";
		var pluginName = 'simpleAccordion',
		defaults = {
			multiple: false,
			speedOpen: 300,
			speedClose: 150,
			easingOpen: null,
			easingClose: null,
			headClass: 'accordion-header',
			bodyClass: 'accordion-body',
			openClass: 'open',
			defaultOpenClass: 'default-open',
			cbClose: null, //function (e, $this) {},
			cbOpen: null //function (e, $this) {}
		};
		function Accordion(element, options) {
			this.$el = $(element);
			this.options = $.extend({}, defaults, options);
			this._defaults = defaults;
			this._name = pluginName;
			if (typeof this.$el.data('multiple') !== 'undefined') {
				this.options.multiple = this.$el.data('multiple');
				} else {
				this.options.multiple = this._defaults.multiple;
			}
			this.init();
		}
		Accordion.prototype = {
			init: function () {
				var o = this.options,
				$headings = this.$el.children('.' + o.headClass);
				$headings.on('click', {_t:this}, this.headingClick);
				$headings.filter('.' + o.defaultOpenClass).first().click();
			},
			headingClick: function (e) {
				var $this = $(this),
				_t = e.data._t,
				o = _t.options,
				$headings = _t.$el.children('.' + o.headClass),
				$currentOpen = $headings.filter('.' + o.openClass);
				if (!$this.hasClass(o.openClass)) {
					if ($currentOpen.length && o.multiple === false) {
						$currentOpen.removeClass(o.openClass).next('.' + o.bodyClass).slideUp(o.speedClose, o.easingClose, function () {
							if ($.isFunction(o.cbClose)) {
								o.cbClose(e, $currentOpen);
							}
							$this.addClass(o.openClass).next('.' + o.bodyClass).slideDown(o.speedOpen, o.easingOpen, function () {
								if ($.isFunction(o.cbOpen)) {
									o.cbOpen(e, $this);
								}
							});
						});
						} else {
						$this.addClass(o.openClass).next('.' + o.bodyClass).slideDown(o.speedOpen, o.easingOpen, function () {
							$this.removeClass(o.defaultOpenClass);
							if ($.isFunction(o.cbOpen)) {
								o.cbOpen(e, $this);
							}
						});
					}
					} else {
					$this.removeClass(o.openClass).next('.' + o.bodyClass).slideUp(o.speedClose, o.easingClose, function () {
						if ($.isFunction(o.cbClose)) {
							o.cbClose(e, $this);
						}
					});
				}
			}
		};
		$.fn[pluginName] = function (options) {
			return this.each(function () {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName,
					new Accordion(this, options));
				}
			});
		};
	}(jQuery, window, document));
	$(function() {
    	$('.accordion-group').simpleAccordion();
	});

	/*=================REVIEW SLIDER ================== */
    var reviewSlider = new Swiper(".review-slider", {
	   slidesPerView: 1.15,
	   loop: true,
	   speed: 1000,
	    spaceBetween: 20,
       navigation: {
         nextEl: ".swiper-button-next",
         prevEl: ".swiper-button-prev",
      },
	  breakpoints: {
        640: {
          slidesPerView: 1.2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        
	   1199: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });
	/*=================BLOG CARDS SLIDER ================== */
    var blogCardsSliderr = new Swiper(".blog-cards-slider", {
	   slidesPerView: 1.15,
	   loop: true,
	   speed: 1000,
	    spaceBetween: 20,
       navigation: {
         nextEl: ".swiper-button-next",
         prevEl: ".swiper-button-prev",
      },
	  breakpoints: {
        376: {
          slidesPerView: 1.5,
          spaceBetween: 16,
        },
        576: {
          slidesPerView: 1.8,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2.5,
          spaceBetween: 16,
        },
		1024: {
		slidesPerView: 3,
		spaceBetween:20,
	},       
	   1280: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });

	/* подсветка активного меню при скролле Article Page */
	const backlitMenu = document.querySelector('.backlit-menu');
	if(backlitMenu){
		const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				
				backlitMenu.querySelectorAll('a').forEach((link) => {
					
				let id = link.getAttribute('href').replace('#', '');
				if (id === entry.target.id) {
					
					link.classList.add('active');
				} else {
				link.classList.remove('active');
				}
			});
			}
		});
		}, {
		threshold: 0.5
		});
	
		document.querySelectorAll('.anchor').forEach(section => { observer.observe(section)} );
	}
   const dynamicMenu = document.querySelector('.dynamic-menu');
  
   if(dynamicMenu){
	   dynamicMenuBtn = dynamicMenu.querySelector('.dynamic-menu__header');
	   dynamicMenuList = dynamicMenu.querySelector('.dynamic-menu__list');
	  
	    dynamicMenuBtn.addEventListener('click', ()=>{
			
			if(dynamicMenuBtn.classList.contains('active')){
				dynamicMenuList.style.maxHeight = 0;
				dynamicMenuBtn.classList.remove('active');
				
			}else{
				dynamicMenuList.style.maxHeight = dynamicMenuList.scrollHeight + 'px';
				dynamicMenuBtn.classList.add('active');
			}
		});
		dynamicMenuList.addEventListener('click', ()=>{
			dynamicMenuList.style.maxHeight = 0;
			dynamicMenuBtn.classList.remove('active');
		});
		window.addEventListener('scroll', ()=>{
			if(window.innerWidth <= 1280){
				if(window.scrollY > 550){
					dynamicMenu.classList.add('active');
				}else{
					dynamicMenu.classList.remove('active');
				}
			}
		});
   }
});