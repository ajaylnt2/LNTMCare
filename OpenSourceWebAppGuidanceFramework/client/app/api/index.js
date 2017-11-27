 // import auth from './google_auth';
 import auth from './authentication';
 import Map from './mapService';
 import userService from './userService';
 import budgetedActualService from './budgetedActualService';
 import efficiencyService from './efficiencyService';
 import performanceService from './performanceService';
 import productionService from './productionService';
 import treeService from './treeService';
 import consumptionService from './consumptionService';
 import sharedService from './sharedService';
 import myService from './myService';
 import headerService from './headerService';
 import plantsComparisonService from './plantsComparisonService';
 let apiModule = angular.module('app.api', [
   auth.name,
   Map.name,
 ]).service('userService', userService)
 .service('budgetedActualService',budgetedActualService)
 .service('efficiencyService',efficiencyService)
 .service('performanceService',performanceService)
 .service('productionService',productionService)
 .service('treeService',treeService)
 .service('consumptionService',consumptionService)
 .service('sharedService',sharedService)
 .service('plantsComparisonService',plantsComparisonService)
 .factory('headerService', headerService)
 .factory('myService', myService);
 export default apiModule;
