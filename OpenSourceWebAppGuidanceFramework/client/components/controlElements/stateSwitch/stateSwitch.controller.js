
class StateSwitchController {
  constructor() {
    'ngInject';

    this.name='stateSwitch';
    // get ID so we can use id+button_name labels for the inputs and not conflict
    this.id = Math.random();
  }
}

export default StateSwitchController;
