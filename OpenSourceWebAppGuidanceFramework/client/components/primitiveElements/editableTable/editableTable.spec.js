
import EditableTableModule from './';
import EditableTableController from './editableTable.controller';
import EditableTableComponent from './editableTable.component';
import EditableTableTemplate from './editableTable.web.html';


describe('EditableTable', () => {
  let $rootScope;  // eslint-disable-line no-unused-vars
  let makeController;

  beforeEach(window.module(EditableTableModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new EditableTableController();
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property', () => { // erase if removing this.name from the controller
      const controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

//   describe('Template', () => {
//     // template specs
//     // tip: use regex to ensure correct bindings are used e.g., {{  }}
//     it('has text in template', () => {
//       expect(EditableTableTemplate).to.match(/{{vm.text}}/);
//     });
//   });

  describe('Component', () => {
      // component/directive specs
    const component = EditableTableComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(EditableTableTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(EditableTableController);
    });
  });
});
