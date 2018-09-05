

let slice = 0;

const setIdForSliderAndDot = () => {
	const slideDOM = document.querySelector('.slide');
	const dot = document.querySelector(`.dot i[data-idx="${slice}"]`);
	const prevDot = document.querySelector('.dot .normal');
	if (prevDot) {
		prevDot.classList.remove('normal');
	}
	switch(slice){
		case 0:
				slideDOM.id = 'first';
				dot.classList.add('normal');
				break;
		case 1:
				slideDOM.id = 'second';
				dot.classList.add('normal');
				break;
		case 2:
				slideDOM.id = 'third';
				dot.classList.add('normal');
				break;
	};
};

const slidingFunc = () => {
	slice ++;
	if (slice > 2) slice = 0;
	setIdForSliderAndDot();
};

document.addEventListener("DOMContentLoaded", () => {
	setIdForSliderAndDot();
})

var sliding = setInterval(slidingFunc, 2000);

const setIdx = (e) => {
	slice = e.target.dataset.idx * 1;
	setIdForSliderAndDot();
	window.clearInterval(sliding);
	setTimeout(()=>{
		sliding = setInterval(slidingFunc, 2000);
	}, 5000);
}

document.querySelectorAll('.dot i').forEach(dot => dot.addEventListener('click', setIdx));