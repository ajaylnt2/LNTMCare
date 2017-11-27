import ThresholdSliderController from './thresholdSlider.controller';
import ThresholdSliderComponent from './thresholdSlider.component';
import ThresholdSliderTemplate from './thresholdSlider.web.html';

describe('ThresholdSlider', () => {
  let $rootScope; 
  let makeController;

//   beforeEach(window.module(ThresholdSliderModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new ThresholdSliderController();
  }));

  describe('Controller', () => {
    // controller specs
    it('has a name property', () => {
      const controller = makeController();
      expect(controller).to.have.property('name');
    });
  });


  describe('Component', () => {
    const component = ThresholdSliderComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(ThresholdSliderTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(ThresholdSliderController);
    });
  });
});
