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

});
