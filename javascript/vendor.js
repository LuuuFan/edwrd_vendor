

let slice = 0;
let pause = false;

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


document.addEventListener("DOMContentLoaded", () => {
	setIdForSliderAndDot();
})

const slidingFunc = () => {
	if (!pause) {
		slice ++;
		if (slice > 2) slice = 0;
		setIdForSliderAndDot();
	}
};

var sliding = setInterval(slidingFunc, 2000);

const pauseInterval = () => {
	pause = true;
	setTimeout(()=>{pause = false}, 5000);
}

const setIdx = (e) => {
	slice = e.target.dataset.idx * 1;
	setIdForSliderAndDot();
	pauseInterval();
};


document.querySelectorAll('.dot i').forEach(dot => dot.addEventListener('click', setIdx));

document.querySelector('.slide-container svg.left').addEventListener('click', ()=>{
		slice--;
		if (slice < 0) slice = 2;
		setIdForSliderAndDot();
});

document.querySelector('.slide-container svg.right').addEventListener('click', ()=>{
		slice++;
		if (slice>2) slice = 0;
		setIdForSliderAndDot();
		pauseInterval();
});
