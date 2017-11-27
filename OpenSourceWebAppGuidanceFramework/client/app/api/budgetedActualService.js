import angular from 'angular';

class budgetedActualService {
  constructor($http, $q, $rootScope) {
      'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.$rootScope = $rootScope;
  }

    getData() {
      let $that = this;
      let deferred = this.$q.defer();

      this.$http.get('app/json/actualBudgeted.json')
        .then((resp) => {
              deferred.resolve(resp);
        }, (err) => {
          deferred.reject(err);
        });
      return deferred.promise;
    }
  // getData() {
  //    return this.$http.get('app/frameworkPages/budgetedVsActual/actualBudgeted.json').then(response => response.data );
  //  }
}

export default budgetedActualService;
