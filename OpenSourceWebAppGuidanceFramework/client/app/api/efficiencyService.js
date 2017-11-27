import angular from 'angular';
import {
  projectConfig
} from '../config';

class efficiencyService {
  constructor($http, $q, $rootScope, store) {
    'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.store = store;
  }

  getPlantName() {
    return this.store.get('selectedPlant');
  }

  getAllAssets(selectedPlant, lineName) {
    this.dataObj = {
      PlantName: selectedPlant,
      LineName: lineName
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_all_assets,
      data: this.dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        return error;
      },
      dataType: 'json'
    });
  }

  getLineData() {
    var dataObj = {
      Name: this.getPlantName()
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_line_data,
      data: dataObj,
      success: function (response) {},
      error: function (error) {},
      dataType: 'json'
    });
  }

  getNormalCount(lineName) {
    var dataObj = {
      Name: lineName
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_normal_count,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {},
      dataType: 'json'
    });
  }

  getNonUrgentCount(lineName) {
    var dataObj = {
      Name: lineName
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_non_urgent_count,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {},
      dataType: 'json'
    });
  }

  getUrgentCount(lineName) {
    var dataObj = {
      Name: lineName
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_urgent_count,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {},
      dataType: 'json'
    });
  }

  getCriticalCount(lineName) {
    var dataObj = {
      Name: lineName
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_critical_count,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {},
      dataType: 'json'
    });
  }

  getTableData(lineName) {
    var dataObj = {
      Name: lineName
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_table_data,
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

  getData() {
    let $that = this;
    let deferred = this.$q.defer();

    this.$http.get('app/json/efficiencyData.json')
      .then((resp) => {
        deferred.resolve(resp);
      }, (err) => {
        deferred.reject(err);
      });
    return deferred.promise;
  }
}

export default efficiencyService;

