

import MoreOptionsController from './moreOptions.controller';
import MoreOptionsComponent from './moreOptions.component';
import MoreOptionsTemplate from './moreOptions.web.html';

describe('moreOptions', () => {
  let $rootScope; 
  let makeController;

//   beforeEach(window.module(SwitchModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new MoreOptionsController();
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => {
      const controller = makeController();
      expect(controller).to.have.property('name');
    });
  });



  describe('Component', () => {
    const component = MoreOptionsComponent;

    // it('includes the intended template', () => {
    //   expect(component.template).to.equal(MoreOptionsTemplate);
    // });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(MoreOptionsController);
    });
  });
});
