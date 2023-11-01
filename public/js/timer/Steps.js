export default class Steps {
  constructor(goal = 10, steps = 0) {
    this.goal = goal;
    this.steps = steps;
  }

  getGoal() {
    return this.goal;
  }

  setGoal(value) {
    this.goal = value;
  }

  getSteps() {
    return this.steps;
  }

  setSteps(value) {
    this.steps = value;
  }
}
