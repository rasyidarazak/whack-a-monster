const cliff = document.querySelectorAll('.cliff');
const monster = document.querySelectorAll('.monster');
const wolf = document.querySelectorAll('.wolf');
const gold = document.querySelectorAll('.gold');
const scoreBoard = document.querySelector('.score');
const punch = document.querySelector('#punch');
const hitMonster = document.querySelector('#hit-monster');
const hitWolf = document.querySelector('#hit-wolf');
const hitGold = document.querySelector('#hit-gold');

const button = document.querySelector('.btn-start');
const time = document.querySelector('.time');

let prevCliff;
let end = false;
let score = 0;

function cliffRandom(cliff){
	const c = Math.floor(Math.random() * cliff.length);
	const cRandom  = cliff[c];
	if (cRandom == prevCliff) {
		cliffRandom(cliff);
	}
	prevCliff = cRandom;
	return cRandom;
}

function timeRandom(min,max){
	return Math.round(Math.random() * ((max - min) + min))
}

function wolfRandom(){
	return Math.floor(Math.random() * 100);
}

function monsterAppear(){
	const cRandom = cliffRandom(cliff);
	const tRandom = timeRandom(300,1300);
	if (wolfRandom() >= 80 && wolfRandom() < 90) {
		cRandom.classList.add('appear-wolf');
	}else if(wolfRandom() >= 90){
		cRandom.classList.add('appear-gold');
	}else{
		cRandom.classList.add('appear');
	}
	setTimeout(()=> {
		cRandom.classList.remove('appear');
		cRandom.classList.remove('appear-wolf');
		cRandom.classList.remove('appear-gold');
		if(!end){
			monsterAppear();
		}
	}, tRandom);
}

function start(){
	button.classList.add('hidden');
	scoreBoard.classList.remove('hidden');
	time.classList.remove('hidden');
	end = false;
	score = 0;
	scoreBoard.textContent = 0;
	monsterAppear();

	let countDown= 60;
	time.innerHTML = '01 : 00';
	const x = setInterval(function(){
		countDown -= 1;
		if(countDown < 0){
			clearInterval(x);
			time.innerHTML = 'Time Out!';
			end = true;
			setTimeout(()=> {
				Swal.fire({
					title: 'Anda mendapatkan',
					text: score + ' poin!',
					type: 'success'
				});
			}, 1500);
		}else{
			time.innerHTML = '00 : ' + countDown;
		}
	},1000);
}

function whack(){
	score++;
	punch.play();
	hitMonster.play();
	this.classList.remove('monster');
	this.classList.add('monster-damage');
	this.parentNode.classList.remove('appear');
	setTimeout(()=> {
	this.classList.remove('monster-damage');
	this.classList.add('monster');
	}, 200);
	scoreBoard.textContent = score;
}

function whackWolf(){
	score=score-2;
	punch.play();
	hitWolf.play();
	this.classList.remove('wolf');
	this.classList.add('wolf-damage');
	this.parentNode.classList.remove('appear-wolf');
	setTimeout(()=> {
	this.classList.remove('wolf-damage');
	this.classList.add('wolf');
	}, 200);
	scoreBoard.textContent = score;
}

function whackGold(){
	score=score+3;
	punch.play();
	hitGold.play();
	this.classList.remove('gold');
	this.classList.add('gold-damage');
	this.parentNode.classList.remove('appear-gold');
	setTimeout(()=> {
	this.classList.remove('gold-damage');
	this.classList.add('gold');
	}, 200);
	scoreBoard.textContent = score;
}

monster.forEach(m => {
	m.addEventListener('click', whack);
});

wolf.forEach(w => {
	w.addEventListener('click', whackWolf);
});

gold.forEach(g => {
	g.addEventListener('click', whackGold);
});