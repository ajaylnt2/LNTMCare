
import Navbar from './navbar';
import NavbarController from './navbar.controller';
import NavbarComponent from './navbar.component';
import NavbarTemplate from './navbar.html';

describe('Navbar', () => {
  let  $rootScope, $state, $location, $componentController, $compile;
  let makeController;

  beforeEach(window.module(Navbar));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () =>
       new NavbarController();
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
    const component = NavbarComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(NavbarTemplate);
    });

    it('uses `controller` syntax', () => {
      expect(component).to.have.property('controller');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(NavbarController);
    });

  });
});
