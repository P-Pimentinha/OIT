export default class Steps {
  constructor(goal = 10, steps = 0) {
    this.goal = goal;
    this.steps = steps;
    this.url = '/api/v1/steps';
    this.id = '';
    this.stepsArray = [];
  }

  async getGoal() {
    try {
      const { data } = await axios.get(this.url);

      const { steps } = data;

      this.goal = steps[0].goal;
      this.id = steps[0]._id;
      this.stepsArray[0] = steps;
      return this.goal;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  setGoal(value) {
    this.goal = value;
  }

  async getSteps() {
    try {
      const { data } = await axios.get(this.url);

      const { steps } = data;
      this.steps = steps[0].reached;
      return this.steps;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  setSteps(value) {
    this.steps = value;
  }

  updateGoal() {
    axios
      .patch(this.url, {
        id: this.id,
        goal: this.goal,
        reached: this.steps,
      })
      .then((response) => {
        console.log('Update successful:', response.data);
      })
      .catch((error) => {
        erreMessage('Something went wrong.');
      });
  }
}
