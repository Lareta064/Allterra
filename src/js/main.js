document.addEventListener("DOMContentLoaded", function (){
	/*==============FOR HEADER SEARCH FORM ============= */
	const bodyEl = document.body;
	const openSearchForm = document.querySelector('#search-btn');
	const searchFormPopup = document.querySelector('#search-popup');
	if(openSearchForm){
		openSearchForm.addEventListener('click', ()=>{
			bodyEl.classList.add('lock');
			if(searchFormPopup.classList.contains('active')){
				searchFormPopup.classList.remove('active');
			}else{
				searchFormPopup.classList.add('active');
			}
			
		})
	}
    /*===============MOBILE MENU ==================*/
	const menuToggle = document.querySelector('#menu-toggle');
	const mobileMenu = document.querySelector('#mobile-menu');
	

	if (menuToggle) {
		const  mobMenuDropItem = mobileMenu.querySelectorAll('.drop-menu-li');
		
		/*   клик по иконке гамбургер*/  
		menuToggle.addEventListener('click', ()=> {
			
			if (menuToggle.classList.contains('active')) {

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
			item.querySelector('.back-link').addEventListener('click', function(){
				item.querySelector('.drop-menu-wrapper').classList.remove('active');
			});
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
});
