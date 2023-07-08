import Timer from './timer/Timer.js';

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
const timerObj = new Timer();

let timer = 50;
let interval;

// Sets the Initial Timer to the default value 60; or to the value in localStorage
// (function setTimer() {
//   const time = localStorage.getItem('timer');
//   if (time && time != 0) {
//     timer = time;
//   } else {
//     timer = 60;
//   }
//   counter.innerHTML = timer;
// })();

// Sets the Initial Timer to the default value 60; or to the value in localStorage
(function setTimer() {
  const time = localStorage.getItem('timer');
  if (time && time != 0) {
    timerObj.setTime(time);
  } else {
    timerObj.setTime(60);
  }
  counter.innerHTML = timerObj.getTime();
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
  if (timerObj.getTime() === 0) {
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
    timerObj.setTime(localStorage.getItem('timer'));
    counter.innerHTML = timerObj.getTime();
    return;
  }
  timerObj.subTimer(counter);
  console.log('hello');
  // prettier-ignore
  // counter.innerHTML = timerObj.getTime();
}

// function add() {
//   timer++;

//   localStorage.setItem('timer', timer);
//   counter.innerHTML = timer;
// }

// function sub() {
//   if (timer <= 1) return;

//   timer--;
//   localStorage.setItem('timer', timer);
//   counter.innerHTML = timer;
// }

// function firstRes() {
//   timer = 45;
//   localStorage.setItem('timer', timer);
//   counter.innerHTML = timer;
// }

// function secondRes() {
//   timer = 60;
//   localStorage.setItem('timer', timer);
//   counter.innerHTML = timer;
// }

// function threeRes() {
//   timer = 90;
//   localStorage.setItem('timer', timer);
//   counter.innerHTML = timer;
// }

startButton.addEventListener('click', initTimer);
upButton.addEventListener('click', timerObj.add.bind(timerObj, counter));
downButton.addEventListener('click', timerObj.sub.bind(timerObj, counter));

resOne.addEventListener('click', timerObj.setTimerOne.bind(timerObj, counter));
resTwo.addEventListener('click', timerObj.setTimerTwo.bind(timerObj, counter));
resThree.addEventListener(
  'click',
  timerObj.setTimerThree.bind(timerObj, counter)
);
