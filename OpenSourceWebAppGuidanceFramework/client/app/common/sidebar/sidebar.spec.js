
import Sidebar from './sidebar';
import SidebarController from './sidebar.controller';
import SidebarComponent from './sidebar.component';
import SidebarTemplate from './sidebar.html';

describe('Sidebar', () => {
  let  $rootScope, $state, $location, $componentController, $compile;
  let makeController;

  beforeEach(window.module(Sidebar));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () =>
       new SidebarController();
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
    const component = SidebarComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(SidebarTemplate);
    });

    it('uses `controller` syntax', () => {
      expect(component).to.have.property('controller');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(SidebarController);
    });

  });
});
