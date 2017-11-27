import angular from 'angular';
import {
  projectConfig
} from '../config';

class sharedService {
  constructor($rootScope, store, $timeout) {
    'ngInject';
    this.$rootScope = $rootScope;
    this.yearValue = null;
    this.$timeout = $timeout;

  }

  getOpenEvents() {
    var dataObj = {
      ID: 1
    };

    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_open_events,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        console.log(error);
      },
      dataType: 'json'
    });
  }

  getLineItems(plant) {
    this.dataObj = {
      Name: plant
    }

    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_line_items,
      data: this.dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        console.log(error);
      },
      dataType: 'json'
    })

  }

  changeYear(yearValue) {
    this.yearValue = yearValue;
    this.broadcastYear();
  };

  changeHeader(headerText) {
    if (headerText == 'Summary')
      this.headerText = 'PLANT SUMMARY';
    else if (headerText == 'Energy Efficiency')
      this.headerText = 'ENERGY EFFICIENCY';
    else if (headerText == 'Utility Consumption & Cost')
      this.headerText = 'UTILITY - CONSUMPTION AND COST';
    else if (headerText == 'Budgeted Vs Actual')
      this.headerText = 'BUDGETED Vs ACTUAL';
    else if (headerText == 'Forecast')
      this.headerText = 'FORECAST';
    else if (headerText == 'Boiler ')
      this.headerText = 'BOILER PERFORMANCE';
    else if (headerText == 'Dryer ')
      this.headerText = 'DRYER PERFORMANCE';
    else if (headerText == 'Chiller ')
      this.headerText = 'CHILLER PERFORMANCE';
    else if (headerText == 'Air Compressor ')
      this.headerText = 'AIR COMPRESSOR PERFORMANCE';
    this.broadcastHeader();
  };

  broadcastYear() {
    this.$rootScope.$broadcast('yearChanged');
  };

  broadcastHeader() {
    this.$rootScope.$broadcast('headerChanged');
  };
}

export default sharedService;

