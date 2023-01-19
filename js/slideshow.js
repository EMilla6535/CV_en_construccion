
let prev_slide_index = 0;
let slide_index = 1;
let next_slide_index = 2;

let stand_by = setTimeout(funcAnimar, 1000);
let animacion;

function checkIndex(index, length){
	if((index + 1) >= length){
		return 0;
	}
	return ++index;
}

function funcAnimar(){
	let slides = document.getElementsByClassName('slide');
	
	slides[prev_slide_index].removeAttribute('id');
	slides[slide_index].removeAttribute('id');
	slides[next_slide_index].removeAttribute('id');
	
	slides[prev_slide_index].setAttribute('class', 'slide slide-left left-out col-3');
	slides[slide_index].setAttribute('class', ' slide slide-left left-move1 col-3');
	slides[next_slide_index].setAttribute('class', 'slide slide-left left-move2 col-3');
	
	let next_index = checkIndex(next_slide_index, slides.length);
	switch(next_index)
	{
		case 0:
			slides[prev_slide_index].setAttribute('class', 'slide slide-left zero-out col-3');
			slides[slide_index].setAttribute('class', 'slide slide-left one-left col-3');
			slides[next_slide_index].setAttribute('class', 'slide slide-left two-center col-3');
			break;
		case 1:
			slides[prev_slide_index].setAttribute('class', 'slide slide-left one-out col-3');
			slides[slide_index].setAttribute('class', 'slide slide-left two-left col-3');
			break;
		case 2:
			slides[prev_slide_index].setAttribute('class', 'slide slide-left two-out col-3');
			break;
		default:
			break;
	}
	
	if((slide_index + 1) >= slides.length){
		slide_index = 0;
		prev_slide_index++;
		next_slide_index++;
	}
	else{
		slide_index++;
		prev_slide_index = checkIndex(prev_slide_index, slides.length);
		next_slide_index = checkIndex(next_slide_index, slides.length);
	}
	
	switch(next_slide_index)
	{
		case 0:
			slides[next_slide_index].setAttribute('class', 'slide slide-left zero-in col-3');
			break;
		case 1:
			slides[next_slide_index].setAttribute('class', 'slide slide-left one-in col-3');
			slides[slide_index].setAttribute('class', 'slide slide-left zero-center col-3');
			break;
		case 2:
			slides[next_slide_index].setAttribute('class', 'slide slide-left two-in col-3');
			slides[slide_index].setAttribute('class', 'slide slide-left one-center col-3');
			slides[prev_slide_index].setAttribute('class', 'slide slide-left zero-left col-3');
			break;
		default:
			slides[next_slide_index].setAttribute('class', 'slide slide-left left-in col-3');
			break;
	}
	
	slides[slide_index].setAttribute('id', 'actual');
	slides[slide_index].style.display = 'block';
	slides[prev_slide_index].setAttribute('id', 'side');
	slides[prev_slide_index].style.display = 'block';
	slides[next_slide_index].setAttribute('id', 'side');
	slides[next_slide_index].style.display = 'block';
	
	clearTimeout(stand_by);
	animacion = setTimeout(funcStand, 1000);
}

function funcStand(){
	let slides = document.getElementsByClassName('slide');
	let i;
	
	for(i = 0; i < slides.length; i++){
		if(!slides[i].hasAttribute('id')){
			slides[i].style.display = 'none';
			slides[i].style.left = '0%';
		}
	}
	
	slides[prev_slide_index].setAttribute('class', 'slide col-3');
	slides[slide_index].setAttribute('class', 'slide  col-3');
	slides[next_slide_index].setAttribute('class', 'slide col-3');
	
	switch(next_slide_index)
	{
		case 0:
			slides[next_slide_index].style.left = '50%';
			slides[slide_index].style.left = '-25%';
			slides[prev_slide_index].style.left = '-25%';
			break;
		case 1:
			slides[slide_index].style.left = '25%';
			slides[next_slide_index].style.left = '25%';
			slides[prev_slide_index].style.left = '-50%';
			break;
		case 2:
			slides[next_slide_index].style.left = '0%';
			slides[slide_index].style.left = '0%';
			slides[prev_slide_index].style.left = '0%';
			break;
		default:
			break;
	}
	
	clearTimeout(animacion);
	stand_by = setTimeout(funcAnimar, 1000);
}
