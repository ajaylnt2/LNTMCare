import NormalBootstrapTableModule from './';
import NormalBootstrapTableController from './normalbootstrapTable.controller';
import NormalBootstrapTableComponent from './normalbootstrapTable.component';
import NormalBootstrapTableTemplate from './normalbootstrapTable.web.html';

describe('NormalBootstrapTable', () => {
  let makeController;

  beforeEach(window.module(NormalBootstrapTableModule.name));
  beforeEach(inject(() => {
    makeController = () => new NormalBootstrapTableController();
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  it('has the name NormalBootstrapTable', () => {
    const controller = makeController();
    expect(controller).to.have.property('name');
  });

  describe('Template', () => {
    it('has rows in template', () => {
      expect(NormalBootstrapTableTemplate).to.match(/\s?vm\.rows\s?/g);
    });
    
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property', () => { // erase if removing this.name from the controller
      const controller = makeController();
      expect(controller).to.have.property('name');
    });    
  });

  describe('Component', () => {
      // component/directive specs
    const component = NormalBootstrapTableComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(NormalBootstrapTableTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(NormalBootstrapTableController);
    });
  });
});
