import angular from 'angular';

class userService {
  constructor($http, $q, $rootScope) {
      'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.$rootScope = $rootScope;
  }

  // getUsers() {
  //   let $that = this;
  //   let deferred = this.$q.defer();
  //
  //   this.$http.get('app/frameworkPages/users/users.json')
  //     .then((resp) => {
  //       console.log(resp)
  //           deferred.resolve();
  //     }, (err) => {
  //       deferred.reject(err);
  //     });
  //   return deferred.promise;
  // }

  getUsers() {
     return this.$http.get('app/frameworkPages/users/users.json').then(response => response.data.data);
   }
}

export default userService;
