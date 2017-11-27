
import ListItemController from './listItem.controller';
import ListItemComponent from './listItem.component';
import ListItemTemplate from './listItem.web.html';

describe('ListItem', () => {
  let $rootScope; // eslint-disable-line no-unused-vars
  let makeController;

  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new ListItemController();
  }));

  describe('Controller', () => {
    // controller specs
    it('has a size property', () => {
      const controller = makeController();
      expect(controller).to.have.property('size');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has title in template', () => {
      expect(ListItemTemplate).to.match(/vm.item.title/);
    });

     it('has description in template', () => {
      expect(ListItemTemplate).to.match(/vm\.item\.description/);
    });
     it('has subtitle in template', () => {
      expect(ListItemTemplate).to.match(/vm\.item\.subtitle/);
    });
  });

  describe('Component', () => {
    const component = ListItemComponent;


    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(ListItemController);
    });
  });
});
