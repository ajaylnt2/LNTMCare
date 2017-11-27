
import LoginModule from './';
import LoginController from './login.controller';
import LoginComponent from './login.component';
import LoginTemplate from './login.web.html';


describe('Login', () => {
  let $rootScope;  // eslint-disable-line no-unused-vars
  let makeController;

  beforeEach(window.module(LoginModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new LoginController();
  }));

  describe('Controller', () => {
    // controller specs
    it('has a showState property', () => { // erase if removing this.name from the controller
      const controller = makeController();
      expect(controller).to.have.property('showState');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has vm.loginError in template', () => {
      expect(LoginTemplate).to.match(/vm.loginError/);
    });
    it('has vm.error in template', () => {
      expect(LoginTemplate).to.match(/vm.error/);
    });   
  });

  describe('Component', () => {
      // component/directive specs
    const component = LoginComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(LoginTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(LoginController);
    });
  });
});
