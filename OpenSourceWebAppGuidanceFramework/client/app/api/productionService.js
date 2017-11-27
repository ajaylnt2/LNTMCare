import angular from 'angular';
class productionService {
  constructor($http, $q) {
      'ngInject';
    this.$http = $http;
    this.$q = $q;
  }
    getData() {
      let $that = this;
      let deferred = this.$q.defer();
      this.$http.get('app/json/production.json')
        .then((resp) => {
              deferred.resolve(resp);
        }, (err) => {
          deferred.reject(err);
        });
      return deferred.promise;
    }
}

export default productionService;
