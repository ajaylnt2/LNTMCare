
class LargeIconController {
  constructor() {
    'ngInject';

    this.name = 'largeIcon';
    this.coloroff = this.coloroff || '#101420';
    this.coloron = this.coloron || '#0ac410';
    this.tagcolor = '#101420';
    this.state = this.state || false;
    this.size = this.size || '128px';
  }

  stateColor(data) {
    if (data) {
      return this.coloron;
    }
    return this.coloroff;
  }
}

export default LargeIconController;
