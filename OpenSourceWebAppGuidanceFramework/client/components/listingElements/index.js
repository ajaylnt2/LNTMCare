
import listItem from './listItem';
import moreOptions from './moreOptions';

module.exports = angular
  .module('listingItems', [
    listItem.name,
    moreOptions.name,
  ]);
