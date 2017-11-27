
import DropDownModule from './';
import DropDownController from './dropDown.controller';
import DropDownComponent from './dropDown.component';
import DropDownTemplate from './dropDown.web.html';


describe('DropDown', () => {
  let $rootScope;  // eslint-disable-line no-unused-vars
  let makeController;

  beforeEach(window.module(DropDownModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new DropDownController();
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property', () => { // erase if removing this.name from the controller
      const controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

//   describe('Template', () => {
//     // template specs
//     // tip: use regex to ensure correct bindings are used e.g., {{  }}
//     it('has name in template [REMOVE]', () => {
//       expect(DropDownTemplate).to.match(/{{\s?vm\.name\s?}}/g);
//     });
//   });

  describe('Component', () => {
      // component/directive specs
    const component = DropDownComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(DropDownTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(DropDownController);
    });
  });
});
