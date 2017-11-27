import angular from 'angular';
import {
  projectConfig
} from '../config';

class treeService {
  constructor($http, $q, $rootScope) {
    'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.$rootScope = $rootScope;
  }
  getPlants() {
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_plants,
      success: function (response) {
        return response

      },
      error: function (error) {},
      dataType: 'json'
    });
  }
  getData() {
    let $that = this;
    let deferred = this.$q.defer();

    this.$http.get('app/frameworkPages/dashboardMain/plantsMain/tree/tree.json')
      .then((resp) => {
        deferred.resolve(resp);
      }, (err) => {
        deferred.reject(err);
      });
    return deferred.promise;
  }

}

export default treeService;

