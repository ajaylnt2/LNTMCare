import {  projectConfig } from '../../config';
class SidebarController {
  constructor(auth, $location,$interval, $timeout, store, $rootScope, $scope, sharedService,treeService, $http) {
    'ngInject';
    this.name = 'sidebar';
    this.sharedService = sharedService;
    this.treeService = treeService
    this.$location = $location;
    this.$interval = $interval;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.businessHoursGrt48=false;
    this.selectedPlant = store.get('selectedPlant');
    var obj =this;
    this.$interval(function() { obj.init();}, projectConfig.set_interval);
    this.isActive = function (viewLocation) {
      if(viewLocation.Name === this.lines[0].Name){
        return true;
      }
      else{
        return false;
      }
    };

    $rootScope.$on('changeSideBarSelection', (event, data) => {
        this.lineName = data.someProp;
        this.isActive(this.lineName);
    });

    // this.$rootScope.$broadcast('sideBarItemClicked', {
    //   selectedLine: 'Line 65',
    //   selectedPlant: this.selectedPlant // send whatever you want
    // });
  }

  sendDataToComponent(lineName) {
    this.$rootScope.$broadcast('sideBarItemClicked', {
      selectedLine: lineName,
      selectedPlant: this.selectedPlant // send whatever you want
    });
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
  //   console.log(linesData);
  }
}

export default SidebarController;
