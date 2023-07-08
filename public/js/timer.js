const counter = document.querySelector('.counter');
const startButton = document.querySelector('.btnStart');
const upButton = document.querySelector('.btnUp');
const downButton = document.querySelector('.btnDown');
const resOne = document.querySelector('.res45');
const resTwo = document.querySelector('.res60');
const resThree = document.querySelector('.res90');
const squareAlert = document.querySelector('.alert');
const set = document.getElementById('set');

set.innerHTML = 'Set: ';

let timer;
let interval;

// Sets the Initial Timer to the default value 60; or to the value in localStorage
(function setTimer() {
  const time = localStorage.getItem('timer');
  if (time && time != 0) {
    timer = time;
  } else {
    timer = 60;
  }
  counter.innerHTML = timer;
})();

function initTimer() {
  startButton.classList.add('disable');
  startButton.setAttribute('disabled', '');
  upButton.classList.add('disable');
  upButton.setAttribute('disabled', '');
  downButton.classList.add('disable');
  downButton.setAttribute('disabled', '');

  resOne.classList.add('disable');
  resOne.setAttribute('disabled', '');
  resTwo.classList.add('disable');
  resTwo.setAttribute('disabled', '');
  resThree.classList.add('disable');
  resThree.setAttribute('disabled', '');

  squareAlert.classList.add('alertY');

  interval = setInterval(timerFunc, 1000);
}

function timerFunc() {
  if (timer === 0) {
    startButton.classList.remove('disable');
    startButton.removeAttribute('disabled', '');
    upButton.classList.remove('disable');
    upButton.removeAttribute('disabled', '');
    downButton.classList.remove('disable');
    downButton.removeAttribute('disabled', '');

    resOne.classList.remove('disable');
    resOne.removeAttribute('disabled', '');
    resTwo.classList.remove('disable');
    resTwo.removeAttribute('disabled', '');
    resThree.classList.remove('disable');
    resThree.removeAttribute('disabled', '');

    squareAlert.classList.remove('alertY');

    clearInterval(interval);
    timer = localStorage.getItem('timer');
    counter.innerHTML = timer;
    return;
  }
  timer--;
  // prettier-ignore
  counter.innerHTML = timer;
}

function add() {
  timer++;

  localStorage.setItem('timer', timer);
  counter.innerHTML = timer;
}

function sub() {
  if (timer <= 1) return;

  timer--;
  localStorage.setItem('timer', timer);
  counter.innerHTML = timer;
}

function firstRes() {
  timer = 45;
  localStorage.setItem('timer', timer);
  counter.innerHTML = timer;
}

function secondRes() {
  timer = 60;
  localStorage.setItem('timer', timer);
  counter.innerHTML = timer;
}

function threeRes() {
  timer = 90;
  localStorage.setItem('timer', timer);
  counter.innerHTML = timer;
}

startButton.addEventListener('click', initTimer);
upButton.addEventListener('click', add);
downButton.addEventListener('click', sub);

resOne.addEventListener('click', firstRes);
resTwo.addEventListener('click', secondRes);
resThree.addEventListener('click', threeRes);
