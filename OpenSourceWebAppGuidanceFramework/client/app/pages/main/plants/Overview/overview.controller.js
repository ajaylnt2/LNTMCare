import {  projectConfig } from '../../../../config';
class OverviewController {
  //Constructor called
  constructor($rootScope,$interval, $scope, auth, $http, efficiencyService, store, $route,$timeout) {
    'ngInject';
    this.name = 'overview';
    this.auth = auth;
    this.$timeout = $timeout;
    this.$interval = $interval;
    this.today = new Date();
    this.efficiencyService = efficiencyService;
    this.store=store;
    this.selectedPlant = this.efficiencyService.getPlantName();
    this.dataObj = {};
    this.lineName = "Line 65";
    var obj =this;

    obj.$interval(function() { obj.initData(); }, projectConfig.set_interval);
    this.dataObj = {
      PlantName : this.selectedPlant,
      LineName : this.lineName
    };

    //Event handler for side bar item clicked
    $rootScope.$on('sideBarItemClicked', (event, data) => {
      this.lineName = data.selectedLine;
      this.store.set('selectedLine', this.lineName);
      this.selectedPlant = data.selectedPlant;

    });

      }

    initData(){
      var obj=this;
      this.efficiencyService.getAllAssets(this.selectedPlant, this.lineName)
      .then((response) => {
        this.assetCount = JSON.parse(response).length;
        obj.$timeout(obj.initList(JSON.parse(response).length));
      });

      this.efficiencyService.getTableData(this.lineName).then((response) => {
        this.getPaginationData=JSON.parse(response)
        this.paginationData = {
          columns: [],
          data: []
        }
        this.pagingProperties = {
          total: this.paginationData.data.length,
          pagesize: 5,
          page: 1
        };

      });
      this.efficiencyService.getNormalCount(this.lineName).then((response) => {
        this.normalCount = JSON.parse(response)[0].NumberofNormalValue;
    //  obj.initList(JSON.parse(response)[0].NumberofNormalValue);

        obj.$timeout(  obj.initList(JSON.parse(response)[0].NumberofNormalValue));
      });

      this.efficiencyService.getNonUrgentCount(this.lineName).then((response) => {
        this.nonUrgentCount = JSON.parse(response)[0].NumberofNonurgentvalue;
          obj.$timeout(  obj.initList(JSON.parse(response)[0].NumberofNonurgentvalue));
      });

      this.efficiencyService.getUrgentCount(this.lineName).then((response) => {
        this.urgentCount = JSON.parse(response)[0].NumberofUrgentValue;
          obj.$timeout(  obj.initList(JSON.parse(response)[0].NumberofUrgentValue));
      });

      this.efficiencyService.getCriticalCount(this.lineName).then((response) => {
        this.criticalCount = JSON.parse(response)[0].NumberofCriticalValue;
          obj.$timeout(  obj.initList(JSON.parse(response)[0].NumberofCriticalValue));
      });

    }
initList(list)
{
  // console.log('normal count'+list);
}

}

export default OverviewController;
