
let authentication = angular.module("authentication",[])
.provider("auth",[function(){
  var config;
  this.init = function (options) {
    config = options;
  }
  this.$get = ['$rootScope', '$q', '$http','lock','authManager',
      function ($rootScope, $q, $http, lock, authManager) {
        var auth = {
          // var userProfile = JSON.parse(localStorage.getItem('profile')) || {},
          service_test: function () {
                    let deferred = $q.defer();

                      deferred.resolve();

                    return deferred.promise;
                  },
          userProfile:function(){return JSON.parse(localStorage.getItem('profile')) || {}},
          login:function(){   lock.show(); },
          logout:function()
          {
          localStorage.removeItem('id_token');
          localStorage.removeItem('profile');
          authManager.unauthenticate();
          // userProfile = {};
        },
        registerAuthenticationListener:function()
        {
          lock.on('authenticated', function(authResult) {
            localStorage.setItem('id_token', authResult.idToken);
            authManager.authenticate();

            lock.getProfile(authResult.idToken, function(error, profile) {
              if (error) {
                console.log(error);
              }

              localStorage.setItem('profile', JSON.stringify(profile));
              $rootScope.$broadcast('userProfileSet', profile);
            });
          });
        }
        };
        return auth
      }
  ]
}])
export default authentication;
