
import ButtonElementModule from './';
import ButtonElementController from './buttonElement.controller';
import ButtonElementComponent from './buttonElement.component';
import ButtonElementTemplate from './buttonElement.web.html';


describe('ButtonElement', () => {
  let $rootScope;  // eslint-disable-line no-unused-vars
  let makeController;

  beforeEach(window.module(ButtonElementModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new ButtonElementController();
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

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has text in template', () => {
      expect(ButtonElementTemplate).to.match(/{{vm.text}}/);
    });
  });

  describe('Component', () => {
      // component/directive specs
    const component = ButtonElementComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(ButtonElementTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(ButtonElementController);
    });
  });
});
