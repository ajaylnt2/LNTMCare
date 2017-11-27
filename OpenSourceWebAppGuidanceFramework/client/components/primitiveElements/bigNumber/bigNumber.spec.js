
import BigNumberModule from './';
import BigNumberController from './bigNumber.controller';
import BigNumberComponent from './bigNumber.component';
import BigNumberTemplate from './bigNumber.web.html';


describe('BigNumber', () => {
  let $rootScope;  // eslint-disable-line no-unused-vars
  let makeController;

  beforeEach(window.module(BigNumberModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new BigNumberController();
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
    it('has name in template', () => {
      expect(BigNumberTemplate).to.match(/vm.title/);
    });
    it('has name in template', () => {
      expect(BigNumberTemplate).to.match(/vm.value/);
    });
    it('has name in template', () => {
      expect(BigNumberTemplate).to.match(/vm.unit/);
    });
  });

  describe('Component', () => {
      // component/directive specs
    const component = BigNumberComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(BigNumberTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(BigNumberController);
    });
  });
});
