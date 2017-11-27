
import PagingModule from './';
import PagingController from './paging.controller';
import PagingComponent from './paging.component';
import PagingTemplate from './paging.web.html';

describe('Paging', () => {
  let $rootScope;  // eslint-disable-line no-unused-vars
  let makeController;

  beforeEach(window.module(PagingModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new PagingController();
  }));

//   describe('Controller', () => {
//     // controller specs
//     it('has a name property', () => { // erase if removing this.name from the controller
//       const controller = makeController();
//       expect(controller).to.have.property('name');
//     });
//   });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}  
    it('has name in template', () => {
      expect(PagingTemplate).to.match(/f.name/);
    });
    it('has age in template', () => {
      expect(PagingTemplate).to.match(/f.age/);
    });
  });

  describe('Component', () => {
      // component/directive specs
    const component = PagingComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(PagingTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(PagingController);
    });
  });
});
