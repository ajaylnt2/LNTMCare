
import BinarySwitchModule from './';
import BinarySwitchController from './binarySwitch.controller';
import BinarySwitchComponent from './binarySwitch.component';
import BinarySwitchTemplate from './binarySwitch.web.html';


describe('BinarySwitch', () => {
  let $rootScope;  // eslint-disable-line no-unused-vars
  let makeController;

  beforeEach(window.module(BinarySwitchModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new BinarySwitchController();
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
//       expect(BinarySwitchTemplate).to.match(/{{\s?vm\.name\s?}}/g);
//     });
//   });

  describe('Component', () => {
      // component/directive specs
    const component = BinarySwitchComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(BinarySwitchTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(BinarySwitchController);
    });
  });
});
