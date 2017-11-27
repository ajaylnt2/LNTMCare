const authentication = angular.module('authentication1', ['angular-jwt'])
  .provider('auth', [function authfun(jwtHelper) {
    let config;
    this.$get = ['$rootScope', '$q', '$http', 'store', '$state', '$timeout', '$interval', 'jwtHelper',
      ($rootScope, $q, $http, store, $state, $timeout, $interval, jwtHelper) => {
        const auth = {
          isAuthenticated: false,
          authenticated() {
            const deferred = $q.defer();
            const interval = $interval(() => {
              if (auth.isAuthenticated) {
                $interval.cancel(interval);
                deferred.resolve();
              }
            }, 10);
            return deferred.promise;
          },
          userProfile:function(){return JSON.parse(localStorage.getItem('profile')) || {}},
          getProfile() {
            const token = store.get('token');
            const data = { token: `Bearer ${token}` };
            return $http({
              url: `http://localhost:3002/getProfile`,
              method: 'POST',
              data,
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => {
                auth.isAuthenticated = true;
                store.set('profile', response.data);
                return response.data;
              }, (response) => {
                // error getting profile
                // there might be cases where this request fails, but not under a 401 error.
                // not sure the best course of action there
                if (response.status === 401) {
                  // we had a token variable, but it wasn't valid, so return false for the profile
                  // and handle the state change in the profile promise
                  auth.isAuthenticated = true;
                  return false;
                }
                return undefined;
              });
          },
          register(data) {
            return $http({
              url: `http://localhost:3002/register`,
              method: 'PUT',
              data,
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then(response => response, response => response);
          },
          reset(data) {
            // Adding application URL dynamically
            data.app = config.app_name;// eslint-disable-line no-param-reassign
            // alert(JSON.stringify(data));
            return $http({
              url: `http://localhost:3002/reset`,
              method: 'POST',
              data,
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then(response => response, response => response);
          },
          changePassword(data) {
            return $http({
              url: `http://localhost:3002/changePassword`,
              method: 'POST',
              data,
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then(response => response, response => response);
          },
          service_test: function () {
                    let deferred = $q.defer();

                      deferred.resolve();

                    return deferred.promise;
                  },
          // data is expected to be an object w/ keys email and password
          login(data) {
              return $http({
                url: `http://localhost:3002/login`,
                method: 'POST',
                data,
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                  .then((response) => {
                    var tokenPayload = jwtHelper.decodeToken(response.data.token);
                    if(tokenPayload=="Authentication failed")
                    {
                        auth.isAuthenticated = false;
                        return undefined;
                    }else {
                      if (response.data) {
                        store.set('profile',tokenPayload);
                        store.set('token', response.data.token);
                        auth.isAuthenticated = true;
                        $rootScope.$broadcast('userProfileSet', response.data );
                        return response;
                      }
                    }
                    return undefined;
                  }, (response) => {
                    auth.isAuthenticated = false;
                    return response;
                  });

          },
          dummyLogin(data) {
             var dataObj = {
                UserId : data.userName,
                Password : data.password
            };
              this.result = null;
            return $.ajax({ type: "POST",
                url: 'http://192.168.33.25/Mcare/api/Mcare/Login',
                data: dataObj,
                success: function (response) {
                    store.set('profile', JSON.parse(response));
                    return JSON.parse(response);
                },
                error: function (error) {
                    return error;
                },
                dataType: 'json'
            });
          },
          logout() {
            const deferred = $q.defer();

              store.remove('profile');
              store.remove('token');
              deferred.resolve();
               $state.go("login");

            return deferred.promise;
          },
          retrieveToken(code) {
            return $http({
              url: `http://localhost:3002/retrieveToken`,
              method: 'POST',
              data: { code },
            }).then((response) => {
              store.set('token', response.data.token);
              store.set('profile', response.data.profile);
              store.set('loginInit', response.data.profile.email);
              auth.isAuthenticated = true;

              return response;
            })
          },
          getLoginType() {
            return config.auth_type;
          },
        };
        return auth;
      },
    ];
  }])


export default authentication;
