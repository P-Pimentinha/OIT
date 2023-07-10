export default class Set {
  constructor(set = 1, completed = 0) {
    this.set = set;
    this.completed = completed;
  }

  //methods

  // adds one to set counter & adds one to completed when set reaches 5
  add(set) {
    this.set++;
    // if (this.set === 5) {
    //   this.set = 1;
    //   this.completed++;
    //   localStorage.setItem('completed', this.completed);
    //   completed.innerHTML = 'Done: ' + this.completed;
    // }
    localStorage.setItem('set', this.set);
    set.innerHTML = 'Set: ' + this.set;
  }

  //completes the set; adds one to Done and resets the set to one
  completeSet(completedEl, setEl) {
    this.completed++;
    this.set = 1;

    localStorage.setItem('completed', this.completed);
    completedEl.innerHTML = 'Done: ' + this.completed;

    localStorage.setItem('set', this.set);
    setEl.innerHTML = 'Set: ' + this.set;
  }

  resetSet(setEl, completedEl) {
    this.set = 1;
    this.completed = 0;

    localStorage.setItem('set', this.set);
    localStorage.setItem('completed', this.completed);

    setEl.innerHTML = 'Set: ' + this.set;
    completedEl.innerHTML = 'Done: ' + this.completed;
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
