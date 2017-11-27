
import PieChartModule from './';
import PieChartController from './pieChart.controller';
import PieChartComponent from './pieChart.component';
import PieChartTemplate from './pieChart.web.html';

describe('PieChart', () => {
  let $rootScope; // eslint-disable-line no-unused-vars
  let makeController;

  beforeEach(window.module(PieChartModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new PieChartController();
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  // describe('Controller', () => {
  //   // controller specs
  //   it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
  //     const controller = makeController();
  //     expect(controller).to.have.property('name');
  //   });
  // });

  // describe('Template', () => {
  //   // template specs
  //   // tip: use regex to ensure correct bindings are used e.g., {{  }}
  //   it('has name in template [REMOVE]', () => {
  //     expect(PieChartTemplate).to.match(/{{\s?vm\.name\s?}}/g);
  //   });
  // });

  describe('Component', () => {
      // component/directive specs
    const component = PieChartComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(PieChartTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(PieChartController);
    });
  });
});
