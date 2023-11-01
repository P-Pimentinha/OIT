import Timer from './timer/Timer.js';
import Set from './timer/Set.js';

const counter = document.querySelector('.counter');
const startButton = document.querySelector('.btnStart');
const upButton = document.querySelector('.btnUp');
const downButton = document.querySelector('.btnDown');
const resOne = document.querySelector('.res45');
const resTwo = document.querySelector('.res60');
const resThree = document.querySelector('.res90');
const squareAlert = document.querySelector('.alert');
const disableButtons = document.querySelector('.btnToDisable');
const disableButtonsTwo = document.querySelector('.btnToDisableTwo');

const timerObj = new Timer();
const setObj = new Set();

// let timer = 50;
let interval;

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
  // startButton.classList.add('disable');
  // startButton.setAttribute('disabled', '');
  // upButton.classList.add('disable');
  // upButton.setAttribute('disabled', '');
  // downButton.classList.add('disable');
  // downButton.setAttribute('disabled', '');

  // resOne.classList.add('disable');
  // resOne.setAttribute('disabled', '');
  // resTwo.classList.add('disable');
  // resTwo.setAttribute('disabled', '');
  // resThree.classList.add('disable');
  // resThree.setAttribute('disabled', '');

  disableButtons.classList.add('hide');
  disableButtons.setAttribute('hide', '');

  disableButtonsTwo.classList.add('hide');
  disableButtonsTwo.setAttribute('hide', '');

  squareAlert.classList.add('alertY');

  squareAlert.classList.remove('hide');
  squareAlert.removeAttribute('hide', '');

  interval = setInterval(timerFunc, 1000);
}

function timerFunc() {
  if (timerObj.getTime() === 0) {
    // startButton.classList.remove('disable');
    // startButton.removeAttribute('disabled', '');
    // upButton.classList.remove('disable');
    // upButton.removeAttribute('disabled', '');
    // downButton.classList.remove('disable');
    // downButton.removeAttribute('disabled', '');

    // resOne.classList.remove('disable');
    // resOne.removeAttribute('disabled', '');
    // resTwo.classList.remove('disable');
    // resTwo.removeAttribute('disabled', '');
    // resThree.classList.remove('disable');
    // resThree.removeAttribute('disabled', '');

    disableButtons.classList.remove('hide');
    disableButtons.removeAttribute('hide', '');

    disableButtonsTwo.classList.remove('hide');
    disableButtonsTwo.removeAttribute('hide', '');

    squareAlert.classList.add('hide');
    squareAlert.setAttribute('hide', '');
    clearInterval(interval);
    timerObj.setTime(localStorage.getItem('timer'));
    counter.innerHTML = timerObj.getTime();

    return;
  }
  timerObj.subTimer(counter);
  // prettier-ignore
  // counter.innerHTML = timerObj.getTime();
}

startButton.addEventListener('click', initTimer);
upButton.addEventListener('click', timerObj.add.bind(timerObj, counter));
downButton.addEventListener('click', timerObj.sub.bind(timerObj, counter));

resOne.addEventListener('click', timerObj.setTimerOne.bind(timerObj, counter));
resTwo.addEventListener('click', timerObj.setTimerTwo.bind(timerObj, counter));
resThree.addEventListener(
  'click',
  timerObj.setTimerThree.bind(timerObj, counter)
);
