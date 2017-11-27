
let google_auth = angular.module("google_auth",[])
.provider("auth",[function(){
  var config;
  this.init = function (options) {
    config = options;
  }
  this.$get = ['$rootScope', '$q', '$http','lock','authManager','angularAuth0','$state',
      function ($rootScope, $q, $http, lock, authManager,angularAuth0,$state) {
        var auth = {
          // var userProfile = JSON.parse(localStorage.getItem('profile')) || {},
          service_test: function () {
                    let deferred = $q.defer();
                      deferred.resolve();
                    return deferred.promise;
                  },
          userProfile:function(){return JSON.parse(localStorage.getItem('profile')) || {}},
          login:function(data){
          var username = data.email;
            var password = data.password;

            angularAuth0.redirect.loginWithCredentials({
                  connection: 'Username-Password-Authentication',
                  username: username,
                  password: password,
                }, function(err) {
                  if (err) return alert(err.description);
                });
          },
          loginWithGoogle:  function () {
            angularAuth0.authorize({
              connection: 'google-oauth2'
            });
          },
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
export default google_auth;
