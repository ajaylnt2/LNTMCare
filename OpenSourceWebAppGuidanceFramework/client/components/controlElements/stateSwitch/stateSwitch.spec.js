
import StateSwitchModule from './';
import StateSwitchController from './stateSwitch.controller';
import StateSwitchComponent from './stateSwitch.component';
import StateSwitchTemplate from './stateSwitch.web.html';

describe('StateSwitch', () => {
  let $rootScope; // eslint-disable-line no-unused-vars
  let makeController;

  beforeEach(window.module(StateSwitchModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new StateSwitchController();
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property', () => {
      const controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  

  describe('Component', () => {
    const component = StateSwitchComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(StateSwitchTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(StateSwitchController);
    });
  });
});
