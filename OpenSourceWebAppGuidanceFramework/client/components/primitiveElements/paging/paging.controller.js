import {  projectConfig } from '../../../app/config';

class PagingController {

  constructor($timeout, $scope,$location, store,$rootScope,$route, $state, $interval) {

    'ngInject';

    this.name = 'paging';
    this.$timeout = $timeout;
        this.$interval = $interval;
    this.runDialog();
    this.store = store;

    this.start=0;
    this.end=2;
    this.disablePrev=true;
    this.disableNext=false;
    this.sendData = function(selectedAsset) {
      this.store.set('selectedAsset', selectedAsset);
      $location.path("/plants/dashboard");
    };
    var obj =this;
    obj.$interval(function() { obj.getData(); }, projectConfig.set_interval);

    //Event handler for side bar item clicked
    $rootScope.$on('sideBarItemClicked', (event, data) => {
      this.lineName = data.selectedLine;
      this.store.set('selectedLine', this.lineName);
    });

    this.alertDialogProperties = {
         text: 'VIEW',
         type: 'primary',
         color: '#000000',
         backgroundColor: '#ed7500',
         onClick: (selectedAsset) => {
           this.store.set('selectedAsset', selectedAsset);
            $state.go('dashboard');
        }
       };
      this.alertDialogProperties1 = {
         text: 'VIEW',
         type: 'primary',
         color: '#000000',
         backgroundColor: '#ed7500',
         onClick: (selectedAsset) => {

           this.store.set('selectedAsset', selectedAsset);
        //   console.log("selectedAsset")
            $state.go('dashboard');

        }
       };
          this.alertDialogProperties1 = {

         text: 'VIEW',
         type: 'primary',
         color: '#000000',
         backgroundColor: '#ed7500',
         display:'none',
         onClick: (selectedAsset) => {

           this.store.set('selectedAsset', selectedAsset);

              $state.go('dashboard');

        }
       };
    $scope.reverseSort = false;
    $scope.allColumns = [];
    $scope.getFilteredData = [];
    $scope.filterDataObject = {};


    $scope.getColumnName = function (columnNames) {
      $scope.allColumns = columnNames;
    }

    $(document).ready(function () {
      $('#media').carousel({
        pause: true,
        interval: false,
      });
    });

    //Sorting
    $scope.orderByMe = function (x, num, reverseSort) {
      if (x == 'name' && reverseSort == false) {
        $scope.myOrderBy = x;
      } else if (x == 'name' && reverseSort == true) {
        $scope.myOrderBy = '-' + x;
      } else if (x == 'location' && reverseSort == false) {

        $scope.myOrderBy = x;

      } else if (x == 'location' && reverseSort == true) {

        $scope.myOrderBy = x;

      } else if (x == 'operatingzone' && reverseSort == false) {

        $scope.myOrderBy = x;

      } else if (x == 'operatingzone' && reverseSort == true) {

        $scope.myOrderBy = x;

      } else if (x == 'totalhrs' && reverseSort == false) {

        $scope.myOrderBy = x;

      } else if (x == 'totalhrs' && reverseSort == true) {

        $scope.myOrderBy = x;

      } else {
        $scope.myOrderBy = '-' + x;
      }
    }

    //Pagination
    this.name = 'paging';
    $scope.currentPage;
    $scope.numPerPage;

    this.initData = function(data){

      this.result = data;
    }
    this.initColumns = function (data) {
      this.columns = [];
      angular.forEach(data, function (item) {
        this.columns.push(item.replace(/([a-z])([A-Z])/g, '$1 $2'));
      }, this);
    }

    this.getData = function (data1, data2, data3, dataList) {
      this.getTableData($scope).then((response) => {
        var dataList = JSON.parse(response);
        this.$timeout(this.initColumns(Object.keys(dataList[0])));
        this.$timeout(this.initData(dataList));
        $scope.employeeArray = this.result;
        this.pagingData = {
          total: data1,
          page: data2,
          pagesize: data3
        }
        this.filteredTodos = [],
          $scope.currentPage = this.pagingData.page,
          $scope.numPerPage = this.pagingData.pagesize,
          $scope.maxSize = this.pagingData.total;
        var begin = (($scope.currentPage - 1) * $scope.numPerPage),

        end = begin + $scope.numPerPage;

        this.filteredTodos = $scope.employeeArray.slice(begin, end);
        if (this.filteredTodos.length == 0) {
          this.filteredTodos = $scope.employeeArray;
        }
      });

      this.getPopUpData($scope).then((response) => {

        $scope.detailsArray = JSON.parse(response)
        this.$timeout(function () {
          $scope.detailsArray = JSON.parse(response)
        }, 200);


      });
    }


    this.getTableData = function ($scope) {


      var dataObj = {
        Name: "Line 65"
      };
      return $.ajax({
        type: "POST",
        url: projectConfig.api_base_url + "/" + projectConfig.get_assets_name,
        data: dataObj,
        success: function (response) {
          store.set('AssetName', response);
          return response;
        },
        error: function (error) {},
        dataType: 'json'
      });
    }


    this.getPopUpData = function ($scope) {
      var dataObj = {
        Name: "Line 65"
      };
      return $.ajax({
        type: "POST",
        url: projectConfig.api_base_url + "/" + projectConfig.get_assets_status,
        data: dataObj,
        success: function (response) {
          store.set('AssetStatus', response);
          return response;
        },
        error: function (error) {},
        dataType: 'json'
      });
    }

    $scope.pageNumber = function (pageNum) {
      $scope.currentPage = pageNum;
    }
  }

     prvClick(aryList)
    {

        this.disableNext = false;
            this.start=this.start-2;
                this.end = this.end-1;
                console.log(this.start);
        if(this.start==0)
        {
          this.disablePrev=true;

        }


    this.disableNext = false;
    this.start = this.start - 2;
    this.end = this.end - 1;

    if (this.start == 0) {
      this.disablePrev = true;

    }


  }
  nextClick(aryList) {
    this.disablePrev = false;

    length = Object.keys(aryList).length;
    if (length < this.end - 1) {
      this.start = this.start + 2;
      this.end = this.end + 3;
    } else {

      this.start = this.start + 2;
      this.end = length;
      this.disableNext = true;

    }
  }
  $onChanges() {
    this.getData(this.total, this.page, this.pagesize, this.data);
  }


  runDialog() {
    var obj = this;
  }

  pop1() {
    var newEle = angular.element("<div class='red'>eswar</div>");
    var target = document.getElementById('target');
    angular.element(target).append(newEle);
  }
}

export default PagingController;
