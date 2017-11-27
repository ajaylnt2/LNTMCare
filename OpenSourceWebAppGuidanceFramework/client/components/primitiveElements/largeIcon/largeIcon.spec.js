
import LargeIconModule from './';
import LargeIconController from './largeIcon.controller';
import LargeIconComponent from './largeIcon.component';
import LargeIconTemplate from './largeIcon.web.html';


describe('LargeIcon', () => {
  let $rootScope;  // eslint-disable-line no-unused-vars
  let makeController;

  beforeEach(window.module(LargeIconModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new LargeIconController();
  }));

  describe('Controller', () => {
    // controller specs
    it('has a name property', () => { // erase if removing this.name from the controller
      const controller = makeController();
      expect(controller).to.have.property('name');
    });

    it('has a coloroff property', () => { // erase if removing this.coloroff from the controller
      const controller = makeController();
      expect(controller).to.have.property('coloroff');
    });

    it('has a coloron property', () => { // erase if removing this.coloron from the controller
      const controller = makeController();
      expect(controller).to.have.property('coloron');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has property in template', () => {
      expect(LargeIconTemplate).to.match(/vm.state/);
    });
  });

  describe('Component', () => {
      // component/directive specs
    const component = LargeIconComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(LargeIconTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(LargeIconController);
    });
  });
});
