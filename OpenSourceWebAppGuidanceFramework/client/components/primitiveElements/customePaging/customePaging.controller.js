import {  projectConfig } from '../../../app/config';

class CustomePagingController {
  constructor($timeout, $scope, $interval) {
    'ngInject';
    this.name = 'paging';
    this.$interval = $interval;
    this.getEvents().then((response) => {
      this.result = JSON.parse(response);
      var names = Object.values(this.result);
      var log = [];
      log.push('All Events');
      angular.forEach(names, function(value, key) {
        this.push(value.Description);
      }, log);
      $scope.names=log;
    });
    $scope.reverseSort = false;

    $scope.allColumns = [];
    $scope.getFilteredData = [];
    $scope.filterDataObject = {};
    $scope.getColumnName = function (columnNames) {
      $scope.allColumns = columnNames;
    }

    $scope.filterdTest ='';
    $scope.selectName = function () {
       if(  $scope.selectedName == "All Events")
       {
           $scope.filterdTest = "";
       }else {
         $scope.filterdTest = $scope.selectedName;
       }
    }

    $scope.selectedName = "All Events"

    $(document).ready(function () {
      $('#media').carousel({
        pause: true,
        interval: false,
      });
    });

    //Sorting
    $scope.orderByMe = function (x, num, reverseSort) {
      if (x == 'events' && reverseSort == false) {
        $scope.myOrderBy = x;
      } else if (x == 'events' && reverseSort == true) {
        $scope.myOrderBy = '-' + x;
      } else if (x == 'created' && reverseSort == false) {

        $scope.myOrderBy = x;
      } else if (x == 'created' && reverseSort == true) {

        $scope.myOrderBy = '-' + x;

      } else if (x == 'lastupdated' && reverseSort == false) {

        $scope.myOrderBy = x;

      } else if (x == 'lastupdated' && reverseSort == true) {

        $scope.myOrderBy = x;

      } else if (x == 'user' && reverseSort == false) {

        $scope.myOrderBy = x;

      } else if (x == 'user' && reverseSort == true) {

        $scope.myOrderBy = x;

      } else {
        $scope.myOrderBy = '-' + x;
      }
    }

    //Pagination
    this.name = 'paging';
    $scope.currentPage;
    $scope.numPerPage;

    var obj =this;
    this.getData = function () {
        obj.getTableData().then((response) => {
          obj.result = JSON.parse(response);
          obj.filteredTodos = obj.result;
          obj.columns = ['Event', 'Created', 'Last Updated', 'Updated By'];
        });
    }
obj.$interval(function() { obj.getData();  }, projectConfig.set_interval);

    $scope.pageNumber = function (pageNum) {
      $scope.currentPage = pageNum;
    }

    $scope.$watch('currentPage + numPerPage', function () {
      var begin = (($scope.currentPage - 1) * $scope.numPerPage),
        end = begin + $scope.numPerPage;
 
    });
  }

  getTableData() {
      var dataObj = {
        Name:"Delivery Belt"
      };
      return $.ajax({
        type: "POST",
        url: projectConfig.api_base_url + "/" + projectConfig.get_all_eventslog,
        data: dataObj,
        success: function (response) {      
          return response;
        },
        error: function (error) {},
        dataType: 'json'
      });
  }

  getEvents () {
    var dataObj = {
      Name:"Delivery Belt"
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_events,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {},
      dataType: 'json'
    });
  }

}

export default CustomePagingController;
