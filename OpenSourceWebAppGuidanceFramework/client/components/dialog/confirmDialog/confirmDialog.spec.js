

import ConfirmDialogController from './confirmDialog.controller';
import ConfirmDialogComponent from './confirmDialog.component';
import ConfirmDialogTemplate from './confirmDialog.web.html';

describe('confirmDialog', () => {
  let $rootScope; // eslint-disable-line no-unused-vars
  let makeController;

//   beforeEach(window.module(SwitchModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new ConfirmDialogController();
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
    const component = ConfirmDialogComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(ConfirmDialogTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(ConfirmDialogController);
    });
  });
});
