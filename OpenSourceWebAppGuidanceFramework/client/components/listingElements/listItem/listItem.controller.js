
class ListItemController {
  constructor($interval, $timeout, $injector) {
    'ngInject';

    this.$interval = $interval;
    this.$timeout = $timeout;


    this.size = 'lg';
    this.validWidths = ['sm', 'md', 'lg'];

    this.checkInterval = 16;
  }

  checkForMediaUpdate() {
    if (this.stopInterval) {
      this.$interval.cancel(this.stopInterval);
    }
    this.stopInterval = this.$interval(() => {

      const newSize = 'lg';
      if (this.size !== newSize) {
        this.$timeout(() => {
          this.size = newSize;
        });
      }
    }, this.checkInterval, 0, false);
  }

  $onChanges(changes) {
    if (changes.width) {
      if (this.validWidths.indexOf(changes.width.currentValue) > -1) {

        this.$interval.cancel(this.stopInterval);
        this.size = changes.width.currentValue;
      }
    }
  }

  $postLink() {
    // $postLink gets called after $onChanges, so we need to check
    // if a valid width was given when the list was initialized
    // this has the drawback of not being callable after initial rendering, so if
    // we start with a valid width and it goes undefined, we will not be responsive to
    // media query changes
    if (this.validWidths.indexOf(this.width) === -1) {
      this.checkForMediaUpdate();
    }
  }
}

export default ListItemController;
