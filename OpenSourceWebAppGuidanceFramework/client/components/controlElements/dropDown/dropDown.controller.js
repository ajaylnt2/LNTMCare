
class DropDownController {
  constructor() {
    'ngInject';

    this.name = 'dropDown';
    this.toggle = false;

  }
  onChange = function(year)
  {
    // console.log('year');
  }
  toggleUp() {
    this.toggle = true;
  }

  toggleDown() {
    this.toggle = false;
  }

  getClass() {
    if (this.toggle) {
      if (!this.icon) {
        return 'spacing toggle-up';
      }
      return `${this.icon} toggle-up`;
    }
    if (!this.icon) {
      return 'spacing toggle-down';
    }
    return `${this.icon} toggle-down`;
  }
}

export default DropDownController;
