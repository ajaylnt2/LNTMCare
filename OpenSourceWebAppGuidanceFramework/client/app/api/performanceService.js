import angular from 'angular';

class performanceService {
  constructor($http, $q, $rootScope) {
      'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.$rootScope = $rootScope;
  }

    getAirCompressorPerformance() {
      let $that = this;
      let deferred = this.$q.defer();
      this.$http.get('app/json/airCompressorPerformance.json')
        .then((resp) => {
              deferred.resolve(resp);
        }, (err) => {
          deferred.reject(err);
        });
      return deferred.promise;
    }
    getBoilerPerformance() {
      let $that = this;
      let deferred = this.$q.defer();
      this.$http.get('app/json/boilerPerformance.json')
        .then((resp) => {
              deferred.resolve(resp);
        }, (err) => {
          deferred.reject(err);
        });
      return deferred.promise;
    }
    getDryerPerformance() {
      let $that = this;
      let deferred = this.$q.defer();
      this.$http.get('app/json/dryerPerformance.json')
        .then((resp) => {
              deferred.resolve(resp);
        }, (err) => {
          deferred.reject(err);
        });
      return deferred.promise;
    }
    getChillerPerformance() {
      let $that = this;
      let deferred = this.$q.defer();
      this.$http.get('app/json/chillerPerformance.json')
        .then((resp) => {
              deferred.resolve(resp);
        }, (err) => {
          deferred.reject(err);
        });
      return deferred.promise;
    }


}

export default performanceService;
