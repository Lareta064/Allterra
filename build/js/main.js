document.addEventListener("DOMContentLoaded", function () {
    const bodyEl = document.body;

   
    const tables = document.querySelectorAll('.simple-table');
   
    tables.forEach(table => {
        
        const wrapper = document.createElement('div');
        wrapper.classList.add('table-scroll-wrapper');

        
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
   
    const mainTitle = document.querySelector('.hero-title');
	if(mainTitle){
	  const titleLength = mainTitle.querySelector('h1').innerText.length;
	  mainTitle.classList.add('hero-title--rel');
	}
    
    $('.lazy').Lazy();

   
    const videoBox = document.querySelector('#video-box');
    if (videoBox) {
        const videoContent = videoBox.querySelector('#video');
        const videoToggleBtn = videoBox.querySelector('#video-btn');

        videoContent.addEventListener('click', () => {
            if (!videoToggleBtn.classList.contains('active')) {
                videoContent.pause();
                videoToggleBtn.classList.add('active');
                videoToggleBtn.querySelector('span').textContent = 'Возобновить видео';

            } else {
                videoContent.play();
                videoToggleBtn.classList.remove('active');
                videoToggleBtn.querySelector('span').textContent = 'Приостановить видео';
            }
        });
        videoContent.addEventListener("ended", function () {
            videoContent.pause();
            videoToggleBtn.classList.add('active');
            videoToggleBtn.querySelector('span').textContent = 'Возобновить видео';
        });
    }
  
    const videoBlock = document.querySelector('.video-local');
    if (videoBlock) {
        const videoBlockContent = videoBlock.querySelector('video');
        videoBlock.addEventListener('click', () => {
            if (videoBlock.classList.contains('active')) {
                videoBlockContent.pause();
                videoBlock.classList.remove('active');
            } else {
                videoBlockContent.play();
                videoBlock.classList.add('active');
            }
        });
        videoBlock.addEventListener("ended", function () {
            videoBlockContent.pause();
            videoBlock.classList.remove('active');
        });
    }
   
    const headerEl = document.querySelector('header');
    const openSearchForm = document.querySelector('#search-btn');
    const searchFormPopup = document.querySelector('#search-popup');

    const menuToggle = document.querySelector('#menu-toggle');
    const mobileMenu = document.querySelector('#mobile-menu');
    const fixedButtons = document.querySelector('#fixed-buttons');

    function hideSerchForm(formBlock) {
        formBlock.classList.remove('active');
        formBlock.style.top = 'auto';
        bodyEl.classList.remove('lock');
    }

    function resetActiveMenu() {
        mobileMenu.querySelector('.active')?.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }

    if (openSearchForm) {
        openSearchForm.addEventListener('click', () => {

            if (searchFormPopup.classList.contains('active')) {
                hideSerchForm(searchFormPopup);
            } else {
               
                const topPosition = headerEl.getBoundingClientRect().bottom;
                resetActiveMenu();
                searchFormPopup.classList.add('active');
                searchFormPopup.style.top = topPosition + 'px';
                bodyEl.classList.add('lock');
                fixedButtons.classList.remove('active');

            }

        });
       
        searchFormPopup.addEventListener('click', (e) => {
            if (e.target == e.currentTarget) {
                searchFormPopup.classList.remove('active');
                bodyEl.classList.remove('lock');
            }
        });
    }
   
    if (menuToggle) {
        const mobMenuDropItem = mobileMenu.querySelectorAll('.drop-menu-li');

      
        menuToggle.addEventListener('click', () => {
            hideSerchForm(searchFormPopup);
            if (menuToggle.classList.contains('active')) {
                resetActiveMenu();
                bodyEl.classList.remove('lock');
                if (window.scrollY > 500) {
                    fixedButtons.classList.add('active');

                }


            } else {
                menuToggle.classList.add('active');
                mobileMenu.classList.add('active');
                bodyEl.classList.add('lock');

                if (window.scrollY > 500) {

                    fixedButtons.classList.remove('active');

                }
            }
        });

      
        for (let item of mobMenuDropItem) {
            item.addEventListener('click', function (e) {
                item.querySelector('.drop-menu-wrapper').classList.add('active');
                if (window.scrollY > 500) {
                    fixedButtons.classList.remove('active');
                }
            });
            item.querySelector('.back-link').addEventListener(
                'click',
                (e) => {
                    e.stopPropagation();
                    e.target.closest('.drop-menu-wrapper').classList.remove('active');
                    if (window.scrollY > 500) {
                        fixedButtons.classList.remove('active');
                    }
                }
            );
        }
    }
    

    if (fixedButtons) {
        window.addEventListener('scroll', () => {

            if (window.scrollY > 500 &&
                !mobileMenu.classList.contains('active') &&
                !searchFormPopup.classList.contains('active')
            ) {
                fixedButtons.classList.add('active');
            } else {
                fixedButtons.classList.remove('active');
            }
        });
    }
   
    $('.custom-tabs').each(function () {
        let ths = $(this);
        ths.find('.custom-tab').not(':first').hide();
        ths.find('.tab-btn').click(function () {
            ths.find('.tab-btn').removeClass('active').eq($(this).index()).addClass('active');
            ths.find('.custom-tab').hide().eq($(this).index()).fadeIn()
        }).eq(0).addClass('active');

    });


    
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
                cbClose: null, 
                cbOpen: null 
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
                $headings.on('click', {_t: this}, this.headingClick);
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
    $(function () {
        $('.accordion-group').simpleAccordion();
    });

   
    var reviewSlider = new Swiper(".review-slider", {
        slidesPerView: 1.07,
        loop: true,
        speed: 1000,
        spaceBetween: 10,
        navigation: {
            nextEl: ".review-section .swiper-button-next",
            prevEl: ".review-section .swiper-button-prev",
        },
        breakpoints: {
            640: {
                slidesPerView: 1.2,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 1.4,
                spaceBetween: 16,
            },
            1024: {
                slidesPerView: 1,
                spaceBetween: 16,
            },

            1099: {
                slidesPerView: 1.5,
                spaceBetween: 16,
            },
            1199: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        },
    });
    var videoReviewSlider = new Swiper(".video-review-slider", {
         slidesPerView:'auto',
         speed: 1000,
         spaceBetween: 30,
         navigation: {
            nextEl: ".video-review-section .swiper-button-next",
            prevEl: ".video-review-section .swiper-button-prev",
        },
          breakpoints: {
            768: {
                spaceBetween: 20,
            },
        }
    });
    var reviewSliderArticle = new Swiper(".article-review-slider", {
        slidesPerView: 1.07,
        loop: true,
        speed: 1000,
        spaceBetween: 10,
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
                slidesPerView: 1.4,
                spaceBetween: 16,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 16,
            },

            1280: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
        },
    });

    
    var blogCardsSlider = new Swiper(".blog-cards-slider", {
        slidesPerView: 1.15,
        loop: true,
        speed: 1000,
        spaceBetween: 20,
        navigation: {
            nextEl: ".blog .swiper-button-next",
            prevEl: ".blog .swiper-button-prev",
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
                spaceBetween: 20,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
    });
    
    var instituteSlider = new Swiper(".institute-slider", {
        slidesPerView: 1,
        speed: 1000,
        loop: true,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
  
    var articlePageSlider = new Swiper('.article-swiper', {
        speed: 1000,
        effect: 'fade',
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 3000,
        },
    });
    var listsSwiper = new Swiper('.lists-swiper', {
        slidesPerView: 1.1,
        spaceBetween: 20,
        speed: 1000,
        navigation: {
            nextEl: '.lists-swiper-next',
            prevEl: '.lists-swiper-prev'
        },
        breakpoints: {
            768: {
                slidesPerView: 1.5,
            },
            1024: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 1,
            }
        }
    })
   
	const backlitMenu = document.querySelector('.backlit-menu');
const sections = document.querySelectorAll('.anchor'); 
let ignoreScroll = false; 

if (backlitMenu) {
  const menuLinks = backlitMenu.querySelectorAll('a');

  
  const setActiveLink = (id) => {
    menuLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

 
  menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').replace('#', '');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        
        targetSection.scrollIntoView({ behavior: 'smooth' });

        
        setActiveLink(targetId);

       
        ignoreScroll = true;

        
        setTimeout(() => {
          ignoreScroll = false;
        }, 600); 
      }
    });
  });

  
  const updateActiveSection = () => {
    if (ignoreScroll) return;

    let activeFound = false;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      
      
      if (rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.75 && !activeFound) {
        const activeLink = backlitMenu.querySelector(`a[href="#${section.id}"]`);
        
        if (activeLink) {
          setActiveLink(section.id); 
          activeFound = true;
        }
      }
    });
  };

 
  window.addEventListener('scroll', updateActiveSection);
}


    
    const dynamicMenu = document.querySelector('.dynamic-menu');

   
    if (dynamicMenu) {
        dynamicMenuBtn = dynamicMenu.querySelector('.dynamic-menu__header');
        dynamicMenuList = dynamicMenu.querySelector('.dynamic-menu__list');

        dynamicMenuBtn.addEventListener('click', () => {

            if (dynamicMenuBtn.classList.contains('active')) {

                dynamicMenuList.style.maxHeight = 0;
                dynamicMenuBtn.classList.remove('active');

            } else {
                const maxAllowedHeight = window.innerHeight - 186 + 'px';

                const maxHeight = dynamicMenuList.scrollHeight + 'px';
                if (dynamicMenuList.style.maxHeight === '0px' || dynamicMenuList.style.maxHeight === '') {
                    if (dynamicMenuList.scrollHeight > window.innerHeight - 186) {
                        dynamicMenuList.style.maxHeight = maxAllowedHeight;
                        dynamicMenuList.style.maxHeight = 'unset';

                        dynamicMenuList.style.overflowY = 'auto';
                    } else {
                        dynamicMenuList.style.maxHeight = maxHeight;
                        dynamicMenuList.style.overflowY = 'hidden';
                    }
                }

                dynamicMenuBtn.classList.add('active');
            }
        });
        dynamicMenuList.addEventListener('click', () => {
            if (dynamicMenu.classList.contains('active')) {


                dynamicMenuList.style.maxHeight = 0;
                dynamicMenuBtn.classList.remove('active');
            }
        });

        const stickyDynamicMenu = document.querySelector('#sticky-menu');
        const institutePageDynamicMenu = document.querySelector('#institute-menu');

        const stickyFiltersList = document.querySelector('.filters-drop');


        if (stickyDynamicMenu) {
            window.addEventListener('scroll', () => {
                if (window.innerWidth <= 1280) {
                    if (window.scrollY > 550) {
                        stickyDynamicMenu.classList.add('active');

                    } else {
                        stickyDynamicMenu.classList.remove('active');
                    }
                }
            });
            window.addEventListener('resize', () => {
                if (window.innerWidth > 1279) {
                    dynamicMenuList.style.maxHeight = 'unset';
                   
                    dynamicMenuBtn.classList.remove('active');


                } else {
                    dynamicMenuList.style.maxHeight = '0';
                    dynamicMenuBtn.classList.remove('active');
                }
            });
        }
        if (institutePageDynamicMenu) {
            window.addEventListener('scroll', () => {
                if (window.innerWidth <= 1024) {
                    if (window.scrollY > 150) {
                        institutePageDynamicMenu.classList.add('active');

                    } else {
                        institutePageDynamicMenu.classList.remove('active');
                    }
                }
            });
            window.addEventListener('resize', () => {
                if (window.innerWidth > 1023) {
                    
                    dynamicMenuList.style.maxHeight = 'unset';


                    dynamicMenuBtn.classList.remove('active');


                } else {
                    dynamicMenuList.style.maxHeight = '0';
                    dynamicMenuBtn.classList.remove('active');
                }
            });
        }
        if (stickyFiltersList) {
            window.addEventListener('resize', () => {
                if (window.innerWidth > 1023) {
                    
                    stickyFiltersList.style.maxHeight = 'calc(100vh - 200px)';
                    stickyFiltersList.style.maxHeight = 'max-content';

                    dynamicMenuBtn.classList.remove('active');
                } else {
                    if (window.innerWidth !== window.innerWidth) {
                        stickyFiltersList.style.maxHeight = '0';
                        dynamicMenuBtn.classList.remove('active');
                    }
                }
            });
        }
    }
    
    const buttons = document.querySelectorAll('.tab-btn');

    if (buttons.length > 0 && window.innerWidth < 584) {

       
        buttons[0].style.width = 'calc(100vw - 56px - 32px - 12px)';
       
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function () {
                const parent = buttons[i].parentNode;
                
                for (btn of buttons) {
                    btn.style.width = '56px';
                }
               
                if (i > 0 && i < (buttons.length - 1)) {
                    buttons[i].style.width = 'calc(100vw - 168px)';
                } else {
                    buttons[i].style.width = 'calc(100vw - 56px - 32px - 12px)';
                }
                
                const offsetLength = -((i - 1) * 56 + ((i - 1) * 12));
                const stopScrolling = buttons[buttons.length - 1];

                if (i < 2) {
                    parent.style.transform = `translateX(0)`;
                } else if (i == buttons.length - 1) {
                    parent.style.transform = `translateX(-272px)`;
                } else {
                    parent.style.transform = `translateX(${offsetLength}px)`;
                }
            });
        }
    }

   

    const swiperRoot = document.querySelector('.country-swiper');
    if (swiperRoot) {

        var mySwiper = new Swiper(".country-swiper", {
            slidesPerView: 'auto',
            speed: 1000,
            autoWidth: true,

            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            }
        });

       
        var isDragging = false;

        mySwiper.on('sliderMove', function () {
            isDragging = true;
        });

        mySwiper.on('touchEnd', function () {
            setTimeout(function () {
                isDragging = false;
            }, 100);
        });

        
        var block = document.createElement('div');
        block.className = 'new-block';
        mySwiper.slides[0].appendChild(block);

        
        function moveBlockToClickedSlide(slide) {
            if (!isDragging && !slide.classList.contains('active')) {
                
                mySwiper.slides.forEach(function (el) {
                    el.classList.remove('active');
                });

                
                slide.classList.add('active');

                
                var offset = slide.offsetLeft - mySwiper.wrapperEl.offsetLeft;

                
                block.style.left = offset + 'px';
                block.style.width = slide.offsetWidth + 'px';
            }
        }

        
        mySwiper.slides.forEach(function (slide) {
            slide.addEventListener('click', function () {
                moveBlockToClickedSlide(this);
            });
        });

       
        moveBlockToClickedSlide(mySwiper.slides[0]);

        
        block.style.height = '2px'; 
        block.style.width = mySwiper.slides[0].offsetWidth + 'px';
        block.textContent = ''; 

        
        window.addEventListener('resize', function () {
            var activeSlide = document.querySelector('.swiper-slide.active');
            if (activeSlide) {
                block.style.width = activeSlide.offsetWidth + 'px';
                block.style.left = activeSlide.offsetLeft - mySwiper.wrapperEl.offsetLeft + 'px';
            }
        });

        
        mySwiper.on('slideChangeTransitionEnd', function () {

            var activeIndex = mySwiper.activeIndex;
            document.querySelectorAll('.scool-description').forEach(function (content) {
                content.classList.remove('active');
            });

            var activeContent = document.querySelectorAll('.scool-description')[activeIndex];
            activeContent.classList.add('active');
        });

       
        mySwiper.slides.forEach(function (slide, index) {
            slide.addEventListener('click', function () {

                document.querySelectorAll('.scool-description').forEach(function (content) {
                    content.classList.remove('active');
                });

                var activeContent = document.querySelectorAll('.scool-description')[index];
                activeContent.classList.add('active');
            });
        });
        mySwiper.off('slideChangeTransitionEnd');
        window.dispatchEvent(new Event('resize'));
    }

   
    const scoolCards = document.querySelectorAll('.scool-card');

    
    function checkBounds(parent, child) {
        const parentRect = parent.getBoundingClientRect();
        const childRect = child.getBoundingClientRect();

        
        if (childRect.bottom > parentRect.bottom) {
            
            child.classList.add('offset-top');
        }
    }

    if (scoolCards.length > 0) {

        for (let item of scoolCards) {
            const btnShowPrograms = item.querySelector('.show-scool-programs');
            const cardprogramsTable = item.querySelector('.scool-drop');
            const cardPrices = item.querySelectorAll('.cell-price');

            function closeActivePrice() {
                const activePrice = item.querySelector('.cell-price__drop.active');
                if (activePrice) activePrice.classList.remove('active');
            }
        if (btnShowPrograms) {
            btnShowPrograms.addEventListener('click', () => {

                if (item.classList.contains('active')) {
                    closeActivePrice();
                    item.classList.remove('active');

                    if (window.innerWidth > 767) {
                        cardprogramsTable.style.maxHeight = 0;
                        cardprogramsTable.style.overflow = 'hidden';
                    }
                } else {
                    item.classList.add('active');

                    if (window.innerWidth > 767) {

                        cardprogramsTable.style.maxHeight = cardprogramsTable.scrollHeight + 'px';
                        cardprogramsTable.style.overflow = 'visible';
                    }
                }
            });
        }
            for (let priceCell of cardPrices) {
                const priceCellBtn = priceCell.querySelector('.cell-price__btn');
                const priceCellDrop = priceCell.querySelector('.cell-price__drop');
                if (priceCellBtn && priceCellDrop) {

                    priceCellBtn.addEventListener('click', (e) => {
                        e.preventDefault();

                        const activePrice = item.querySelector('.cell-price__drop.active');
                        const cellPriceActive = item.querySelector('.cell-price.active');
                        if (activePrice && activePrice !== priceCellDrop) {
                            activePrice.classList.remove('active');
                            cellPriceActive.classList.remove('active');
                        }
                        priceCellDrop.classList.toggle('active');
                        priceCell.classList.toggle('active');
                        checkBounds(item, priceCellDrop);

                    });
                }
            }

        }
    }

   
    function toggleActiveClass(parentClass, childClass) {
        const parents = document.querySelectorAll('.' + parentClass);
        parents.forEach(parent => {
            parent.addEventListener('click', function (e) {

                if (e.target.classList.contains(childClass)) {
                    
                    parent.querySelectorAll('.' + childClass).forEach(child => {
                        child.classList.remove('active');
                    });
                    
                    e.target.classList.add('active');
                }
            });
        });
    }

    toggleActiveClass('cell-price', 'pay-cur');
    toggleActiveClass('tab-toggles', 'tab-toggle');
    
    const cardsWrapper = document.getElementById('scool-cards-grid');

    if (cardsWrapper) {
        const btnBuildRows = document.getElementById('scool-grid-rows');
        const btnBuildCols = document.getElementById('scool-grid-cols');
        if (btnBuildRows && btnBuildCols) {
            btnBuildRows.addEventListener('click', () => {

                btnBuildRows.classList.add('active');
                btnBuildCols.classList.remove('active');
                cardsWrapper.classList.remove('three-columns');

            });
            btnBuildCols.addEventListener('click', () => {

                btnBuildRows.classList.remove('active');
                btnBuildCols.classList.add('active');
                cardsWrapper.classList.add('three-columns');

            });
            window.addEventListener('resize', function () {
                if (this.window.innerWidth < 1279) {
                    btnBuildRows.classList.add('active');
                    btnBuildCols.classList.remove('active');
                    cardsWrapper.classList.remove('three-columns');
                }
            });
        }
    }
    
    const heightDynamic = document.querySelectorAll('.height-dynamic');
    if (heightDynamic.length > 0) {
        for (let block of heightDynamic) {

            const heightDynamicBtn = block.querySelector('.height-dynamic__btn');
            if (heightDynamicBtn) {
                heightDynamicBtn.addEventListener('click', () => {
                    if (!block.classList.contains('active')) {
                        block.classList.add('active');
                        block.style.maxHeight = block.scrollHeight + 'px';
                    } else {
                        block.classList.remove('active');
                        block.style.maxHeight = 170 + 'px';
                    }
                });
            }
            //}

        }
    }

    const scoolProgramsPrice = document.querySelectorAll('.programs-table .cell-price');

    if (scoolProgramsPrice.length > 0) {
       
        var priceButtons = document.querySelectorAll('.programs-table .cell-price__btn');

       
        function removeActiveClasses() {
            document.querySelectorAll('.programs-table .cell-price.active').forEach(function (cellPrice) {
                cellPrice.classList.remove('active');
            });
        }

        priceButtons.forEach(function (btn) {
            btn.addEventListener('click', function (event) {

                event.stopPropagation();

                if (this.parentElement.classList.contains('active')) {

                    this.parentElement.classList.remove('active');
                } else {

                    removeActiveClasses();

                    this.parentElement.classList.add('active');
                }
            });
        });
        document.addEventListener('click', function () {
            removeActiveClasses();
        });
    }
    
    const hideElemetsParent = document.querySelectorAll('.has-hide');
    if (hideElemetsParent.length > 0) {
        for (let item of hideElemetsParent) {
            const showMoreBtn = item.querySelector('.btn-more');
            const searchInput = item.querySelector('.filters-group__search');
            if (showMoreBtn && searchInput) {
                showMoreBtn.addEventListener('click', () => {
                    const hideItems = item.querySelectorAll('.hide-item');
                    hideItems.forEach((el) => {
                        el.classList.remove('hide-item');
                    });
                    showMoreBtn.classList.add('hide-btn');
                    if (searchInput) {
                        searchInput.style.display = 'block'
                    }
                });
            }
        }
    }
   
    const customSelects = document.querySelectorAll('.custom-select');

    customSelects.forEach((customSelect) => {
        const selectTrigger = customSelect.querySelector('.custom-select-trigger');
        const optionsContainer = customSelect.querySelector('.custom-options');
        const optionsList = customSelect.querySelectorAll('.custom-option');

       
        selectTrigger.addEventListener('click', function (e) {
            e.stopPropagation(); // Останавливаем распространение события
            const isOpen = customSelect.classList.contains('open');
            closeAllSelects();
            if (!isOpen) {
                customSelect.classList.add('open');
                optionsContainer.style.maxHeight = optionsContainer.scrollHeight + 'px';
            } else {
                optionsContainer.style.maxHeight = '0';
            }
        });

       
        optionsList.forEach((option) => {
            option.addEventListener('click', function () {
                selectTrigger.textContent = option.textContent;
                selectTrigger.dataset.value = option.dataset.value;
                customSelect.classList.remove('open');
                optionsContainer.style.maxHeight = '0';
            });
        });
    });

   
    document.addEventListener('click', function () {
        closeAllSelects();
    });

    function closeAllSelects() {
        customSelects.forEach((select) => {
            select.classList.remove('open');
            const optionsContainer = select.querySelector('.custom-options');
            if (optionsContainer) {
                optionsContainer.style.maxHeight = '0';
            }
        });
    }

    
    const hideParentBtn = document.querySelectorAll('.hide-parent-btn');
    if (hideParentBtn.length > 0) {
        for (let item of hideParentBtn) {
            item.addEventListener('click', () => {
                item.closest('.hide-parent').style.display = "none";
            });
        }
    }
   
    const toggleCurrencyWrapper = document.querySelectorAll('.toggle-currency');
    if (toggleCurrencyWrapper.length > 0) {
        toggleCurrencyWrapper.forEach(function (item) {

            const toggleCurrencyBtn = item.querySelectorAll('.pay-cur');
            const toggleCurrencyPrices = item.querySelectorAll('.cur-type');
            for (let element of toggleCurrencyBtn) {
                element.addEventListener('click', function () {
                    if (element.classList.contains('pay-cur--second')) {
                        item.querySelectorAll('.cur-first').forEach(function (cur) {
                            cur.classList.add('hide-item');
                        });
                        item.querySelectorAll('.cur-second').forEach(function (cur) {
                            cur.classList.remove('hide-item');
                        });
                    } else {
                        item.querySelectorAll('.cur-first').forEach(function (cur) {
                            cur.classList.remove('hide-item');
                        });
                        item.querySelectorAll('.cur-second').forEach(function (cur) {
                            cur.classList.add('hide-item');
                        });
                    }
                });
            }
        });
    }

  const btnBackTop = document.getElementById('back-top');
  window.addEventListener('scroll', ()=>{
	if(window.scrollY > 800){
		btnBackTop.style.opacity = 1;
	}else{
		btnBackTop.style.opacity = 0;
	}
  });

const stickyFiltersMobile = document.querySelector('.filters.dynamic-menu');
if(stickyFiltersMobile){


const handleScroll = () => {
    if (window.scrollY > 550) {
        stickyFiltersMobile.classList.add('filters-fixed');
    } else {
        stickyFiltersMobile.classList.remove('filters-fixed');
    }
};


const checkWidthAndAddListeners = () => {
    if (window.innerWidth < 1024) {
        window.addEventListener('scroll', handleScroll);
    } else {
        window.removeEventListener('scroll', handleScroll);
        stickyFiltersMobile.classList.remove('filters-fixed'); // Удалить класс, если ширина больше 1024
    }
};

 
  checkWidthAndAddListeners();

  window.addEventListener('resize', checkWidthAndAddListeners);
}
});

document.addEventListener('DOMContentLoaded', () =>{
    const runUserVideoreview = document.getElementById('user-review-btn-play');
    if(runUserVideoreview){
        runUserVideoreview.addEventListener('click',()=>{
            if(runUserVideoreview.classList.contains('active')){
                runUserVideoreview.classList.remove('active')
            }else{
                runUserVideoreview.classList.add('active')
            }
        })
    }
})
