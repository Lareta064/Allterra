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

	const menuToggle = document.querySelector('#menu-toggle');
	const mobileMenu = document.querySelector('#header-menu');
	

	if (menuToggle) {

		/*   клик поиконке гамбургер*/  
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
		mobileMenu.addEventListener('click', () => {
			menuToggle.classList.remove('active');
			mobileMenu.classList.remove('active');
			bodyEl.classList.remove('lock');
		});
	}

});
