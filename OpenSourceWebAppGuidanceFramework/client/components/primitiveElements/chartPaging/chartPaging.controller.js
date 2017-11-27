class ChartPagingController {
  constructor($timeout, $scope, consumptionService) {
    'ngInject';

    this.name = 'chartPaging';
    this.runDialog();
    $scope.reverseSort = false;
    $scope.allColumns = [];

    $scope.getColumnName = function (columnNames) {
      $scope.allColumns = columnNames;
    }
    $scope.currentPage;
    $scope.numPerPage;
    this.consumptionService = consumptionService;

    this.consumptionService.getYearsForHistoricalTrends()
        .then((response) => {
          var tagValues = JSON.parse(response);
          console.log(tagValues);
          // angular.forEach(tagValues, function (item) {
          //   this.timeStampValues1.push(item.Time_stamp);
          // }, this);
          // this.dropDownYears = {
          //   placeHolder: 'All Options',   
          //   model:this.timeStampValues1[0],
          //   options: this.timeStampValues1,
          //   onChange: (id) => {
          //   },
          // };
        });
    this.getData = function (data1, data2, data3, dataArray) {
      $scope.employeeArray = dataArray;
      this.pagingData = {
        total: data1,
        page: data2,
        pagesize: data3
      }
      if (this.pagingData.total > 0) {
        this.paginationFormat = [];
        for (var i = 1; i <= Math.ceil(this.pagingData.total / this.pagingData.pagesize); i++) {
          this.paginationFormat.push(i);
        }
      }

      $scope.filteredTodos = [], $scope.currentPage = this.pagingData.page, $scope.numPerPage = this.pagingData.pagesize, $scope.maxSize = this.pagingData.total;

    }

    $scope.pageNumber = function (pageNum) {
      $scope.currentPage = pageNum;
    }

    $scope.$watch('currentPage + numPerPage', function () {
      var begin = (($scope.currentPage - 1) * $scope.numPerPage),
        end = begin + $scope.numPerPage;
        if($scope.employeeArray!=null){
      $scope.filteredTodos = $scope.employeeArray.slice(begin, end);
        }

    });

  }

  runDialog() {
    this.alertDialogProperties = {
      text: 'view',
      type: 'default',
      color: '#000000',
      backgroundColor: '#ed7500',
      onClick: () => {}
    };
  }

}

export default ChartPagingController;
