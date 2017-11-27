

import PromptDialogController from './promptDialog.controller';
import PromptDialogComponent from './promptDialog.component';
import PromptDialogTemplate from './promptDialog.web.html';

describe('Switch', () => {
  let $rootScope; // eslint-disable-line no-unused-vars
  let makeController;

//   beforeEach(window.module(SwitchModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new PromptDialogController();
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
    const component = PromptDialogComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(PromptDialogTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(PromptDialogController);
    });
  });
});
