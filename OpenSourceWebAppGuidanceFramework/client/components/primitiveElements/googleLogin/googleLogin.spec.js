
import GoogleLoginModule from './';
import GoogleLoginController from './googleLogin.controller';
import GoogleLoginComponent from './googleLogin.component';
import GoogleLoginTemplate from './googleLogin.web.html';


describe('GoogleLogin', () => {
  let $rootScope;  // eslint-disable-line no-unused-vars
  let makeController;

  beforeEach(window.module(GoogleLoginModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new GoogleLoginController();
  }));

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
    it('has logo in template', () => {
      expect(GoogleLoginTemplate).to.match(/vm.logo/);
    });
    it('has alternative in template', () => {
      expect(GoogleLoginTemplate).to.match(/vm.alt/);
    });
    it('has tagline in template', () => {
      expect(GoogleLoginTemplate).to.match(/vm.tagline/);
    });
  });

  describe('Component', () => {
      // component/directive specs
    const component = GoogleLoginComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(GoogleLoginTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(GoogleLoginController);
    });
  });
});
