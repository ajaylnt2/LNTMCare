import dropDown from './dropDown';
import binarySwitch from './binarySwitch';
import stateSwitch from './stateSwitch';
import thresholdSlider from './thresholdSlider';
module.exports = angular
    .module('controlElementComponents', [
      dropDown.name,
      binarySwitch.name,
      stateSwitch.name,
      thresholdSlider.name,
    ])
