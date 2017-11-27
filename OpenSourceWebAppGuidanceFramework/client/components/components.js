import reusablecharts from './reusablecharts';
import listingElements from './listingElements';
import controlElements from './controlElements';
import primitiveElements from './primitiveElements';
import dialog from './dialog';
const components = angular.module('components', [
  reusablecharts.name,
  listingElements.name,
  controlElements.name,
  primitiveElements.name,
  dialog.name,
]);

export default components;
