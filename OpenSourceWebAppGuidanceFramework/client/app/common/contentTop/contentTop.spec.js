
import ContentTop from './contentTop';
import ContentTopController from './contentTop.controller';
import ContentTopComponent from './contentTop.component';
import ContentTopTemplate from './contentTop.html';

describe('contentTop', () => {
  let  $rootScope, $state, $location, $componentController, $compile;
  let makeController;

  beforeEach(window.module(ContentTop));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () =>
       new ContentTopController();
  }));

  beforeEach(inject(($injector) => {

    // $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
  }));

  // describe('Controller', () => {
  //   // controller specs
  //   let controller;
  //   it('has a name property', () => { // erase if removing this.name from the controller
  //     const controller = makeController();
  //     expect(controller).to.have.property('name');
  //   });
  // });

  describe('Component', () => {
      // component/directive specs
    const component = ContentTopComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(ContentTopTemplate);
    });

    it('uses `controller` syntax', () => {
      expect(component).to.have.property('controller');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(ContentTopController);
    });

  });
});
