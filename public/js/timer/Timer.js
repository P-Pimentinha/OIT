export default class Timer {
  constructor(timer = 60) {
    this.timer = timer;
  }

  //methods

  // Updates Timer on screen whithout changing the default value
  subTimer(counter) {
    this.timer--;
    counter.innerHTML = this.timer;
  }

  //adds 1 on the timer
  add(counter) {
    this.timer++;
    localStorage.setItem('timer', this.timer);
    counter.innerHTML = this.timer;
  }

  //subtracts 1 from the timer
  sub(counter) {
    if (this.timer <= 1) return;
    this.timer--;
    localStorage.setItem('timer', this.timer);
    counter.innerHTML = this.timer;
  }

  //sets timer to 45
  setTimerOne(counter) {
    this.timer = 45;
    localStorage.setItem('timer', this.timer);
    counter.innerHTML = this.timer;
  }

  //sets timer to 60
  setTimerTwo(counter) {
    this.timer = 60;
    localStorage.setItem('timer', this.timer);
    counter.innerHTML = this.timer;
  }

  //sets timer to 90
  setTimerThree(counter) {
    this.timer = 90;
    localStorage.setItem('timer', this.timer);
    counter.innerHTML = this.timer;
  }

  //getters & setters
  getTime() {
    return this.timer;
  }

  setTime(time) {
    this.timer = time;
  }
}
