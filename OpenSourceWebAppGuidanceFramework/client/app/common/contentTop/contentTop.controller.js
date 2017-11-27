
class ContentTopController {
constructor(auth, $scope, $rootScope,$location,$state) {
  'ngInject';
    this.name = 'ContentTop';
      this.$watch(function () {
      this.activePageTitle = ($state.current.name).replace(/([a-z])([A-Z])/g, '$1 $2');
    });
  }
}

export default ContentTopController;
