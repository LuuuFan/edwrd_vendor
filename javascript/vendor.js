

let slice = 0,
		pause = false,
		signuped = false;

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

const hideSignupForm = () => {
		const form = document.querySelector('.signup-session form');
		const succeedDOM = document.querySelector('.signup-session .succeed');
		$(form).fadeOut(1000);
		$(succeedDOM).fadeIn(1000);
};

document.addEventListener("DOMContentLoaded", () => {
	setIdForSliderAndDot();
	const signupBoolean = localStorage.getItem('signuped');
	signuped = signupBoolean === 'true' ? true : false;
	if (signuped) {
			hideSignupForm();
	}
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
		pauseInterval();
});

document.querySelector('.slide-container svg.right').addEventListener('click', ()=>{
		slice++;
		if (slice>2) slice = 0;
		setIdForSliderAndDot();
		pauseInterval();
});

const validEmail = (email) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};


document.querySelector('.signup-session form').addEventListener('submit', (e) => {
		e.preventDefault();
		if (!e.target.querySelector('input[name="store_name"]').value) {
				$('.signup-session .store_name').fadeIn(1000)
		}
		if (!e.target.querySelector('input[name="address"]').value) {
				$('.signup-session .address').fadeIn(1000)
		}
		if (!e.target.querySelector('input[name="name"]').value) {
				$('.signup-session .name').fadeIn(1000)
		}
		if (!validEmail(e.target.querySelector('input[name="email"]').value)) {
				$('.signup-session .email').fadeIn(1000)
		}
		if (validEmail(e.target.querySelector('input[name="email"]').value) && 
				e.target.querySelector('input[name="store_name"]').value &&
				e.target.querySelector('input[name="address"]').value &&
				e.target.querySelector('input[name="name"]').value
			) {
		// !!!import!!!!!  Send to backend~~~~api call~~~~~then reset~~~~~~
				e.target.reset();
				signuped = true;
				localStorage.setItem('signuped', true);
				hideSignupForm();
		}
});

document.querySelectorAll('.signup-session form input[type="text"]')
		.forEach(input => input.addEventListener('change', (e) => {
				$(`.signup-session .${e.target.name}`).fadeOut(1000);
		}));
