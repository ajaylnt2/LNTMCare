

import AlertDialogController from './alertDialog.controller';
import AlertDialogComponent from './alertDialog.component';
import AlertDialogTemplate from './alertDialog.web.html';

describe('AlertDialog', () => {
  let $rootScope; 
  let makeController;


  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;

    makeController = () => new AlertDialogController();
  }));

 

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => {
      const controller = makeController();
      expect(controller).to.have.property('name');
    });
  });




  describe('Component', () => {
    const component = AlertDialogComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(AlertDialogTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(AlertDialogController);
    });
  });
});
