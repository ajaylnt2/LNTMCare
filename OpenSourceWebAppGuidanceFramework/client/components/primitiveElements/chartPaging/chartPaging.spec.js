
import ChartPagingModule from './';
import ChartPagingController from './chartPaging.controller';
import ChartPagingComponent from './chartPaging.component';
import ChartPagingTemplate from './chartPaging.web.html';

describe('ChartPaging', () => {
  let $rootScope;  // eslint-disable-line no-unused-vars
  let makeController;

  beforeEach(window.module(ChartPagingModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new ChartPagingController();
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
      expect(ChartPagingTemplate).to.match(/f.name/);
    });
    it('has age in template', () => {
      expect(ChartPagingTemplate).to.match(/f.age/);
    });
  });

  describe('Component', () => {
      // component/directive specs
    const component = ChartPagingComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(ChartPagingTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(ChartPagingController);
    });
  });
});
