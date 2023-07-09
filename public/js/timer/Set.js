export default class Set {
  constructor(set = 1, completed = 0) {
    this.set = set;
    this.completed = completed;
  }

  //methods
  add(set, completed) {
    this.set++;
    if (this.set === 5) {
      this.set = 1;
      this.completed++;
      localStorage.setItem('completed', this.completed);
      completed.innerHTML = 'Done: ' + this.completed;
    }
    localStorage.setItem('set', this.set);
    set.innerHTML = 'Set: ' + this.set;
  }

  //getters & setters
  getCompleted() {
    return this.completed;
  }

  setCompleted(completed) {
    this.completed = completed;
  }

  getSet() {
    return this.set;
  }

  setSet(set) {
    this.set = set;
  }
}
