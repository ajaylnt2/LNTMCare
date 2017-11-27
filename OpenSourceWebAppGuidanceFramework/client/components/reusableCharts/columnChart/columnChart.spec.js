
import ColumnChartModule from './';
import ColumnChartController from './columnChart.controller';
import ColumnChartComponent from './columnChart.component';
import ColumnChartTemplate from './columnChart.web.html';

describe('ColumnChart', () => {
  let $rootScope;  // eslint-disable-line no-unused-vars
  let makeController;

  beforeEach(window.module(ColumnChartModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new ColumnChartController();
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
  //     expect(ColumnChartTemplate).to.match('div');
  //   });
  // });

  describe('Component', () => {
      // component/directive specs
    const component = ColumnChartComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(ColumnChartTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(ColumnChartController);
    });
  });
});
