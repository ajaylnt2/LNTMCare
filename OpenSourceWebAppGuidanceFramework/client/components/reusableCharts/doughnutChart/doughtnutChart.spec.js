import DoughnutChartController from './doughnutChart.controller';
import DoughnutChartComponent from './doughnutChart.component';
import DoughnutChartTemplate from './doughnutChart.web.html';

describe('DoughnutChartComponent', () => {
  let $rootScope; 
  let makeController;

//   beforeEach(window.module(DoughnutChartrModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new DoughnutChartController();
  }));

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => {
      const controller = makeController();
      expect(controller).to.have.property('name');
    });
  });


  describe('Component', () => {
    const component = DoughnutChartComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(DoughnutChartTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(DoughnutChartController);
    });
  });
});
