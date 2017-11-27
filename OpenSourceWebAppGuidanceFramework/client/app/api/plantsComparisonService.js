import angular from 'angular';

class plantsComparisonService {
  constructor($http, $q, $rootScope) {
      'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.$rootScope = $rootScope;
  }

    getData() {
      let $that = this;
      let deferred = this.$q.defer();

      this.$http.get('app/json/plantComparison.json')
        .then((resp) => {
              deferred.resolve(resp);
        }, (err) => {
          deferred.reject(err);
        });
      return deferred.promise;
    }
}

export default plantsComparisonService;
