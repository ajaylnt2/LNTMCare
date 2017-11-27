import {  projectConfig } from '../../config';
class NavbarController {

  constructor($state,store,myService,$interval, auth, $location, $timeout, $rootScope, $scope, sharedService,
    treeService) {

    'ngInject';
    this.name = 'navbar';
    this.auth = auth;
    this.$interval = $interval;
    this.$timeout = $timeout
    this.myService = myService;
    this.profile = [];
    this.topMenu = 'plant';
    this.userprofile = store.get('profile');
    this.profile = this.userprofile[0];
    this.sharedService = sharedService;
    this.treeService = treeService;
    this.$state=$state;
    var obj = this;
    $scope.$watch(function () {
      return myService.getAlarm();
    },
      function (newValue, oldValue) {

          if(newValue)
          {
            this.openEvents=newValue;
          }
        });
    var obj =this;

    obj.$interval(function() { obj.navInit(); }, projectConfig.set_interval);


    this.isActive = function (viewLocation) {
      var str = $location.path();
      var location = [];
      var location = str.split("/");
      return viewLocation === "/" + location[location.length - 1];
    };
  }

  navInit(){
    var obj=this;
    this.treeService.getPlants().then((response) => {
    obj.$timeout(this.selectedPlant = JSON.parse(response)[0].Name);
    })
    this.sharedService.getOpenEvents().then((response) => {
      obj.$timeout(this.openEvents = JSON.parse(response)[0].EventCount);
    })
  }

  init()
  {
    var obj = this;
    this.treeService.getPlants().then((response) => {
        obj.$timeout(this.plants = JSON.parse(response)[0].Name);
        this.sharedService.getLineItems(this.plants).then((response)=>{
        //console.log(JSON.parse(response));
        obj.$timeout(obj.linesData(JSON.parse(response)));
        });
      })
  }

  linesData(lines)
  {
  var linesData = [];
   angular.forEach(lines,function(data){
     linesData.push(data.Name);
   });
   this.lines = linesData
  }

  logoutClick() {
    var obj = this;
    obj.auth.logout();
    // obj.$location.path('/login');
    obj.$state.go("login");
  }
}

export default NavbarController;
