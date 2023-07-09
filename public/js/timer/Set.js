export default class Set {
  constructor(set = 1) {
    this.set = set;
  }

  //methods
  add(set) {
    this.set++;
    if (this.set === 5) this.set = 1;
    localStorage.setItem('set', this.set);
    set.innerHTML = 'Set: ' + this.set;
  }

  //getters & setters
  getSet() {
    return this.set;
  }

  setSet(set) {
    this.set = set;
  }
}
