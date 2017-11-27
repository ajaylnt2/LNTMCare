import moment from 'moment';

import {  projectConfig } from '../../../../config';

class dashboardController {
  constructor($rootScope, myService, $scope, $location, $http,$interval,
    consumptionService, sharedService, $timeout, $window, store) {
    'ngInject';
    this.consumptionService = consumptionService;
    this.sharedService = sharedService;
    this.monthlyData = ['All','January', 'February','March', 'April','May', 'June','July', 'August','September', 'October','November', 'December'];

    this.selectedMonth = 'All';
    this.$timeout = $timeout;
    this.$interval = $interval;
    this.$scope = $scope;
    this.store = store;
    this.myService = myService;
    this.disableDropdownGraph1 = true;
    this.disableDropdownGraph2 = true;
    this.disableDropdownGraph3 = true;
    this.disableDropdownGraph4 = true;

    var obj=this;

    obj.$interval(function() { obj.initDashboard(); }, projectConfig.set_interval);


  }
    initDashboard()
    {
      var obj =this;

      //info first line
      // info first box
      this.timeHours = obj.store.get('AssetName');
      this.assetStatus = obj.store.get('AssetStatus');
      this.selectedAsset = obj.store.get('selectedAsset');
      this.selectedPlant = obj.store.get('selectedPlant');
      this.heading = 'DET -0671400362';
      this.totalOperatingTimes = JSON.parse(this.timeHours);
      this.assetStats = JSON.parse(this.assetStatus);
      angular.forEach(this.assetStats, function (item) {
        if (item.Name == obj.selectedAsset) {
          obj.status = item.Description;
        }
      });

      // info second box
      this.dataLoadedSuccessfully = false;
      var obj = this;
      this.consumptionService.getHealthIndexValue(this.selectedAsset).then((response) => {
        obj.$timeout(function () {
          obj.initList(JSON.parse(response)[0].Tagvalue)
        }, 100);
      });

    //info second line
    this.today = new Date();
    this.dateRangeEnd=new Date();

    this.today.setDate(this.today.getDate() - 7);

    var curr_date = this.today.getDate();
    var curr_month = this.today.getMonth();
    var curr_year = this.today.getFullYear();
    this.current = curr_date + "-" + curr_month + "-" + curr_year;
    this.dateRangeStart=this.today;

    this.consumptionService.getRPMValue(this.selectedAsset).then((response) => {
      this.overallRPM = JSON.parse(response)[0].Tagvalue;
    });
    this.consumptionService.getTotalRunningHours(this.selectedAsset).then((response) => {
      this.totalRunningHours = JSON.parse(response)[0].TimeStamp;
    });
    this.consumptionService.getAverageTemperature(this.selectedAsset).then((response) => {
      this.averageTemperature = JSON.parse(response)[0].Tagvalue;
    });
    this.consumptionService.getTimeToFailure(this.selectedAsset).then((response) => {
      var seconds = JSON.parse(response)[0].Tagvalue;
      this.daysToFailure = Math.floor(seconds / (3600 * 24));
      var hrs = Math.floor(seconds / 3600);
      var mts = Math.floor((seconds - (hrs * 3600)) / 60);
      this.hoursToFailure = hrs + "." + mts;
    });
    this.consumptionService.getAverageCurrent(this.selectedAsset).then((response) => {
      this.averageCurrent = JSON.parse(response)[0].Tagvalue;
    });

    //info page 3rd line
    //first box
    this.consumptionService.getAcceleration(this.selectedAsset).then((response) => {
      this.acceleration = JSON.parse(response)[0].Tagvalue;
    });
    this.consumptionService.getVelocity(this.selectedAsset).then((response) => {
      this.velocity = JSON.parse(response)[0].Tagvalue;
    });
    this.consumptionService.getDisplacement(this.selectedAsset).then((response) => {
      this.displacement = JSON.parse(response)[0].Tagvalue;
    });

    //second box
    this.consumptionService.getLatestEvents(this.selectedAsset).then((response) => {

      this.latestEvents = JSON.parse(response);
    });

    // trends tab

        this.input = [];
        this.runDropDown().then((response) => {
          this.result = JSON.parse(response);
          this.tagData = this.result;
          angular.forEach(this.result, function (item) {
            obj.input.push(item.Name + ' ' + item.Attributes);
          });
          this.pushDropDownValues(obj.input);
          this.listOnChangeDate();
        });

        this.historicalYears = [];
        this.runDropDown1().then((response) => {
          this.result1 = JSON.parse(response);
          this.historicalChartTypes = this.result1;
          angular.forEach(this.result1, function (item) {
            if (item.Attributes == null) {
            obj.historicalYears.push(item.Name);
            }
            else {
              obj.historicalYears.push(item.Name + ' ' + item.Attributes);
            }
          });
          this.pushDropDownValues1(obj.historicalYears);
        });

        this.yearData = [];
        this.consumptionService.getYearsForHistoricalTrends(this.selectedAsset).then((response) => {
          var years = JSON.parse(response);
          angular.forEach(years, function (yearItem) {
            obj.yearData.push(yearItem.Year);
          });
          this.pushDropDownValues2(obj.yearData);
          var historicalChart1 = this.historicalDropDownProperties1.model;
          var historicalChart2 = this.historicalDropDownProperties2.model;
          var historicalChart3 = this.historicalDropDownProperties3.model;
          var historicalChart4 = this.historicalDropDownProperties4.model;
          var item1 = historicalChart1.split("{");
          var item2 = historicalChart2.split("{");
          var item3 = historicalChart3.split("{");
          var item4 = historicalChart4.split("{");
          angular.forEach(this.historicalChartTypes, function (item) {
            if (item.Name == item1[0].trim() && item.Attributes == "{" + item1[1]) {
              this.tagId1 = item.Id;
            }
            if (item.Name == item2[0].trim() && item.Attributes == "{" + item2[1]) {
              this.tagId2 = item.Id;
            }
            if (item.Name == item3[0].trim() && item.Attributes == "{" + item3[1]) {
              this.tagId3 = item.Id;
            }
            if (item.Name == item4[0].trim() && item.Attributes == "{" + item4[1]) {
              this.tagId4 = item.Id;
            }
          }, this);
        });

        this.PlotLineChart();
        var paramValue = this;
        var chartHealthStatus = this;
        this.lineOptions = this.lineOptions;
        this.chartFFTAccelerationChart = this.chartFFTAccelerationChart;
        this.chartDisplacementVerticalFrequencyChart = this.chartDisplacementVerticalFrequencyChart;
        this.chartFFTDisplacementChart = this.chartFFTDisplacementChart;
        this.chartVelocityVerticalFrequencyChart = this.chartVelocityVerticalFrequencyChart;
        this.chartFFTVelocityChart = this.chartFFTVelocityChart;
        this.chartAccelerationVerticalFrequencyChart = this.chartAccelerationVerticalFrequencyChart;
        this.tabFocus = 'info';
        this.properties = ['NEWARK', 'RUNNING', '10846 hours'];

        // this.consumptionService.getHorizontalData()
        //   .then((response) => {
        //     if (response.length > 0) {
        //       var data = response;
        //       var FFTHchartData = JSON.parse(data);
        //       this.PlotLineChart();
        //       if (FFTHchartData.length > 0) {
        //         this.FFTAccelerationChart("FFTAcceleration", this.FetchDataFromDatabase(FFTHchartData));
        //       }
        //     }
        //   });

        // this.consumptionService.getVerticalData()
        //   .then((response) => {
        //     if (response.length > 0) {
        //       var data = response;
        //       var FFTV1chartData = JSON.parse(data);
        //       this.dataa = this.FetchDataFromDBForVPosition(FFTV1chartData);
        //
        //       this.linedata = this.getdata(this.dataa);
        //       this.data1 = this.getdata1(this.dataa);
        //       var chartProperties = [];
        //
        //       this.lineChartProperties8 = {
        //
        //         labels: this.linedata,
        //         data: [this.data1],
        //         options: {
        //           tooltips:  {
        //             //mode: "label",
        //             callbacks:  {
        //               label:  function (tooltipItem,  data) {
        //                 var  legend  =  new  Array();
        //                 for (var  i  in  data.datasets) {
        //                   legend.push(
        //                     "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
        //                   );
        //                 }
        //
        //                 return  legend;
        //               }
        //             }
        //           },
        //           scales: {
        //             yAxes: [{
        //               id: 'y-axis-1',
        //               type: 'linear',
        //               display: true,
        //               position: 'left',
        //               scaleLabel:  {
        //                 display:  true,
        //                 labelString:  'y-axis'
        //               }
        //             },
        //
        //             ],
        //             xAxes: [{
        //               ticks: {
        //                 autoSkip: true,
        //                 maxTicksLimit: 100
        //               },
        //               scaleLabel:  {
        //                 display:  true,
        //                 labelString:  'x-axis'
        //               }
        //             }]
        //           },
        //           elements: {
        //           }
        //         },
        //         datasetOverride: [{
        //           yAxisID: 'y-axis-1'
        //         }, {
        //           yAxisID: 'y-axis-2'
        //         }]
        //       }
        //
        //       chartProperties.push(this.lineChartProperties1, this.lineChartProperties2, this.lineChartProperties3, this.lineChartProperties4);
        //       this.chartProperties = [];
        //       this.chartProperties = chartProperties;
        //       this.chartPagingProperties = {
        //         total: this.chartProperties.length,
        //         pagesize: 4,
        //         page: 1
        //
        //       };
        //
        //       this.PlotLineChart();
        //       if (FFTV1chartData.length > 0) {
        //         this.FFTAccelerationVerticalFrequencyChart('FFTVPositionchart1', this.FetchDataFromDBForVPosition(FFTV1chartData), '');
        //       }
        //     }
        //   });

        // this.consumptionService.getDisplacementHorizontalData()
        //   .then((response) => {
        //     if (response.length > 0) {
        //       var data = response;
        //       var DisplacementHorizontalChartData = JSON.parse(data);
        //       this.PlotLineChart();
        //       if (DisplacementHorizontalChartData.length > 0) {
        //         this.FFTDisplacementChart("FFTDisplacementChart", this.FetchDataFromDatabase(DisplacementHorizontalChartData));
        //       }
        //     }
        //   });

        // this.consumptionService.getDisplacementVerticalFrequencyData()
        //   .then((response) => {
        //     if (response.length > 0) {
        //       var data = response;
        //       var DisplacementVerticalFrequencyChartData = JSON.parse(data);
        //       this.PlotLineChart();
        //       if (DisplacementVerticalFrequencyChartData.length > 0) {
        //         this.DisplacementVerticalFrequencyChart("FFTDisplacementRightChart", this.FetchDataFromDBForVPosition(DisplacementVerticalFrequencyChartData), '');
        //       }
        //     }
        //   });

        // this.consumptionService.getVelocityHorizontalData()
        //   .then((response) => {
        //     if (response.length > 0) {
        //       var data = response;
        //       var VelocityHorizontalChartData = JSON.parse(data);
        //       this.PlotLineChart();
        //       if (VelocityHorizontalChartData.length > 0) {
        //         this.FFTVelocityHorizontalChart("FFTVelocityChart", this.FetchDataFromDatabase(VelocityHorizontalChartData), '');
        //       }
        //     }
        //   });

        // this.consumptionService.getVelocityVerticalFrequencyData()
        //   .then((response) => {
        //     if (response.length > 0) {
        //       var data = response;
        //       var VelocityVerticalFrequencyChartData = JSON.parse(data);
        //       this.PlotLineChart();
        //       if (VelocityVerticalFrequencyChartData.length > 0) {
        //         this.VelocityVerticalFrequencyChart("FFTVelocityRightChart", this.FetchDataFromDBForVPosition(VelocityVerticalFrequencyChartData), 'FFT Velocity Vertical chart');
        //       }
        //     }
        //   });

        // this.consumptionService.getHorizontalPosition()
        //   .then((response) => {
        //     if (response != "" && response != undefined) {
        //       $scope.myData = JSON.parse(response);
        //       var data1 = [],
        //         res = [],
        //         chartDataString = [],
        //         chartData = [],
        //         chartDataString1 = [],
        //         chartData1 = [];
        //
        //       //Amplitute
        //       chartDataString = $scope.myData[1].param_value.replace(/["']/g, "");
        //       chartDataString = chartDataString.replace(/["[']/g, "")
        //       chartDataString = chartDataString.replace(/["]']/g, "");
        //       var splitdata = chartDataString.split(',');
        //       for (var i = 0; i < splitdata.length; i++) {
        //         var tempNumber = parseFloat(splitdata[i].replace("]", '')) / 4096;
        //         chartData.push(tempNumber);
        //       }
        //
        //       //Number
        //       chartDataString1 = $scope.myData[0].param_value.replace(/["']/g, "");
        //       chartDataString1 = chartDataString1.replace(/["[']/g, "")
        //       chartDataString1 = chartDataString1.replace(/["]']/g, "");
        //       var splitdata1 = chartDataString1.split(',');
        //       for (i = 0; i < splitdata1.length; i++) {
        //         var tempNo = parseFloat(splitdata1[i].replace("]", ''));
        //         chartData1.push(tempNo);
        //       }
        //
        //       for (i = 0; i < chartData.length; i++) {
        //         data1.push(chartData[i]);
        //       }
        //
        //       for (i = 0; i < chartData1.length; i++) {
        //         res.push([chartData1[i], data1[i]]);
        //       }
        //
        //       this.portraitVPositionChart(res, "customChart1");
        //     }
        //   });

        // this.consumptionService.getVerticalPosition()
        //   .then((response) => {
        //     // console.log(this.tagValues);
        //     if (response != "" && response != undefined) {
        //       $scope.myData1 = JSON.parse(response);
        //       var chartDataString1 = [],
        //         chartData1 = [];
        //       var vData = [],
        //         verticalRes = [],
        //         verticalDataString = [],
        //         verticalData = [],
        //         verticalDataString1 = [],
        //         verticalData1 = [];
        //
        //       //Amplitute
        //       verticalDataString = $scope.myData1[1].param_value.replace(/["']/g, "");
        //       verticalDataString = verticalDataString.replace(/["[']/g, "")
        //       verticalDataString = verticalDataString.replace(/["]']/g, "");
        //       var splitdata = verticalDataString.split(',');
        //       for (var i = 0; i < splitdata.length; i++) {
        //         var vtempNumber = parseFloat(splitdata[i].replace("]", '')) / 4096;
        //         verticalData.push(vtempNumber);
        //       }
        //
        //       //Number
        //       verticalDataString1 = $scope.myData1[0].param_value.replace(/["']/g, "");
        //       verticalDataString1 = verticalDataString1.replace(/["[']/g, "")
        //       verticalDataString1 = verticalDataString1.replace(/["]']/g, "");
        //       var splitdata1 = verticalDataString1.split(',');
        //       for (i = 0; i < splitdata1.length; i++) {
        //         var vtempNo = parseFloat(splitdata1[i].replace("]", ''));
        //         verticalData1.push(vtempNo);
        //       }
        //
        //       for (i = 0; i < verticalData.length; i++) {
        //         vData.push(verticalData[i]);
        //       }
        //
        //
        //       for (i = 0; i < verticalData1.length; i++) {
        //         verticalRes.push([verticalData1[i], vData[i]]);
        //       }
        //
        //       this.portraitVPositionChart(verticalRes, "SvgVertical1");
        //     }
        //   });
    }
  changeFormat(date,label){
    if(label=='dateRangeStart')
    {
    this.dateRangeStart = moment( date, 'MM-DD-YYYY HH:mm:ss',true).format("YYYY-MM-DD HH:mm:ss");

    }
    else if (label == 'dateRangeEnd') {
      this.dateRangeEnd = moment(date, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss")
    }
  }

  yearChange1() {
    this.historicalChartNameChange1();
    this.historicalChartNameChange2();
    this.historicalChartNameChange3();
    this.historicalChartNameChange4();
  }

  monthChange1() {
   //   console.log(typeof this.selectedMonth);
    this.dailyData=[];
   var month =new Date(this.selectedMonth+'-1-01').getMonth()+1;

    var days =  [];
    var numOfDays = new Date(2017,month, 0).getDate();

    for(var i=1;i<=numOfDays;i++)
    {
      days.push(i);
    }
this.dailyData = days;
    this.historicalChartChangeByMonth1();
    this.historicalChartChangeByMonth2();
    this.historicalChartChangeByMonth3();
    this.historicalChartChangeByMonth4();
  }

  historicalChartNameChange1() {
    var obj = this;
    var selectedYear = obj.yearDropDown.model;
    var selectedChart = obj.historicalDropDownProperties1.model;
    if (selectedYear && selectedChart) {
      var items = selectedChart.split("{");
      angular.forEach(this.historicalChartTypes, function (item) {
        if (item.Name == items[0].trim() && item.Attributes == "{" + items[1]) {
          this.tagId = item.Id;
        }
        else if (item.Name == items[0].trim() && item.Attributes == null) {
          this.tagId = item.Id;
        }
      }, this);
      this.chartValues = [];
      this.consumptionService.getHistoricalChartDataForYear(this.selectedAsset, this.tagId)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            this.chartValues.push(item.Tagvalue);
          }, this);
          this.index = [];
          for (var i = 0; i < this.chartValues.length; i++) {
            this.index.push(i);
          }
          this.labeldata = this.index;
          this.historicalChartProperties1 = {
            labels: this.labeldata,
            data: [this.chartValues],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                    maxTicksLimit: 18
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              }
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.historicalChartProperties1.colors = [{
            borderColor: '#02f4b3',
            backgroundColor: '#02f4b3',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  historicalChartChangeByMonth1() {
    var obj = this;
    var selectedYear = obj.yearDropDown.model;
    var selectedMonth = obj.selectedMonth;
    var selectedChart = obj.historicalDropDownProperties1.model;
    if (selectedYear && selectedChart && selectedMonth) {
      var items = selectedChart.split("{");
      angular.forEach(this.historicalChartTypes, function (item) {
        if (item.Name == items[0].trim() && item.Attributes == "{" + items[1]) {
          this.tagId = item.Id;
        }
        else if (item.Name == items[0].trim() && item.Attributes == null) {
          this.tagId = item.Id;
        }
      }, this);
      this.chartValues = [];
      this.month = this.monthlyData.indexOf(this.selectedMonth);
      this.consumptionService.getHistoricalChartDataForYearMonth(this.selectedAsset, this.tagId, this.month)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            this.chartValues.push(item.Tagvalue);
          }, this);
          this.index = [];
          for (var i = 0; i < this.chartValues.length; i++) {
            this.index.push(i);
          }
          this.labeldata = this.index;
          this.historicalChartProperties1 = {
            labels: this.labeldata,
            data: [this.chartValues],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                    maxTicksLimit: 18
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              }
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.historicalChartProperties1.colors = [{
            borderColor: '#02f4b3',
            backgroundColor: '#02f4b3',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  historicalChartNameChange2() {
    var obj = this;
    var selectedYear = obj.yearDropDown.model;
    var selectedChart = obj.historicalDropDownProperties2.model;
    if (selectedYear && selectedChart) {
      var items = selectedChart.split("{");
      angular.forEach(this.historicalChartTypes, function (item) {
        if (item.Name == items[0].trim() && item.Attributes == "{" + items[1]) {
          this.tagId = item.Id;
        }
        else if (item.Name == items[0].trim() && item.Attributes == null) {
          this.tagId = item.Id;
        }
      }, this);
      this.chartValues = [];
      this.consumptionService.getHistoricalChartDataForYear(this.selectedAsset, this.tagId)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            this.chartValues.push(item.Tagvalue);
          }, this);
          this.index = [];
          for (var i = 0; i < this.chartValues.length; i++) {
            this.index.push(i);
          }
          this.labeldata = this.index;
          this.historicalChartProperties2 = {
            labels: this.labeldata,
            data: [this.chartValues],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                    maxTicksLimit: 18
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              }
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.historicalChartProperties2.colors = [{
            borderColor: '#0094ff',
            backgroundColor: '#0094ff',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  historicalChartChangeByMonth2() {
    var obj = this;
    var selectedYear = obj.yearDropDown.model;
    var selectedMonth = obj.selectedMonth;
    var selectedChart = obj.historicalDropDownProperties2.model;
    if (selectedYear && selectedChart && selectedMonth) {
      var items = selectedChart.split("{");
      angular.forEach(this.historicalChartTypes, function (item) {
        if (item.Name == items[0].trim() && item.Attributes == "{" + items[1]) {
          this.tagId = item.Id;
        }
        else if (item.Name == items[0].trim() && item.Attributes == null) {
          this.tagId = item.Id;
        }
      }, this);
      this.chartValues = [];
      this.month = this.monthlyData.indexOf(this.selectedMonth);
      this.consumptionService.getHistoricalChartDataForYearMonth(this.selectedAsset, this.tagId, this.month)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            this.chartValues.push(item.Tagvalue);
          }, this);
          this.index = [];
          for (var i = 0; i < this.chartValues.length; i++) {
            this.index.push(i);
          }
          this.labeldata = this.index;
          this.historicalChartProperties2 = {
            labels: this.labeldata,
            data: [this.chartValues],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                    maxTicksLimit: 18
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              }
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.historicalChartProperties2.colors = [{
            borderColor: '#0094ff',
            backgroundColor: '#0094ff',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  historicalChartNameChange3() {
    var obj = this;
    var selectedYear = obj.yearDropDown.model;
    var selectedChart = obj.historicalDropDownProperties3.model;
    if (selectedYear && selectedChart) {
      var items = selectedChart.split("{");
      angular.forEach(this.historicalChartTypes, function (item) {
        if (item.Name == items[0].trim() && item.Attributes == "{" + items[1]) {
          this.tagId = item.Id;
        }
        else if (item.Name == items[0].trim() && item.Attributes == null) {
          this.tagId = item.Id;
        }
      }, this);
      this.chartValues = [];
      this.consumptionService.getHistoricalChartDataForYear(this.selectedAsset, this.tagId)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            this.chartValues.push(item.Tagvalue);
          }, this);
          this.index = [];
          for (var i = 0; i < this.chartValues.length; i++) {
            this.index.push(i);
          }
          this.labeldata = this.index;
          this.historicalChartProperties3 = {
            labels: this.labeldata,
            data: [this.chartValues],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                    maxTicksLimit: 18
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              }
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.historicalChartProperties3.colors = [{
            borderColor: '#eef334',
            backgroundColor: '#eef334',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  historicalChartChangeByMonth3() {
    var obj = this;
    var selectedYear = obj.yearDropDown.model;
    var selectedMonth = obj.selectedMonth;
    var selectedChart = obj.historicalDropDownProperties3.model;
    if (selectedYear && selectedChart && selectedMonth) {
      var items = selectedChart.split("{");
      angular.forEach(this.historicalChartTypes, function (item) {
        if (item.Name == items[0].trim() && item.Attributes == "{" + items[1]) {
          this.tagId = item.Id;
        }
        else if (item.Name == items[0].trim() && item.Attributes == null) {
          this.tagId = item.Id;
        }
      }, this);
      this.chartValues = [];
      this.month = this.monthlyData.indexOf(this.selectedMonth);
      this.consumptionService.getHistoricalChartDataForYearMonth(this.selectedAsset, this.tagId, this.month)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            this.chartValues.push(item.Tagvalue);
          }, this);
          this.index = [];
          for (var i = 0; i < this.chartValues.length; i++) {
            this.index.push(i);
          }
          this.labeldata = this.index;
          this.historicalChartProperties3 = {
            labels: this.labeldata,
            data: [this.chartValues],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                    maxTicksLimit: 18
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              }
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.historicalChartProperties3.colors = [{
            borderColor: '#02f4b3',
            backgroundColor: '#02f4b3',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  historicalChartNameChange4() {
    var obj = this;
    var selectedYear = obj.yearDropDown.model;
    var selectedChart = obj.historicalDropDownProperties4.model;
    if (selectedYear && selectedChart) {
      var items = selectedChart.split("{");
      angular.forEach(this.historicalChartTypes, function (item) {
        if (item.Name == items[0].trim() && item.Attributes == "{" + items[1]) {
          this.tagId = item.Id;
        }
        else if (item.Name == items[0].trim() && item.Attributes == null) {
          this.tagId = item.Id;
        }
      }, this);
      this.chartValues = [];
      this.consumptionService.getHistoricalChartDataForYear(this.selectedAsset, this.tagId)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            this.chartValues.push(item.Tagvalue);
          }, this);
          this.index = [];
          for (var i = 0; i < this.chartValues.length; i++) {
            this.index.push(i);
          }
          this.labeldata = this.index;
          this.historicalChartProperties4 = {
            labels: this.labeldata,
            data: [this.chartValues],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                    maxTicksLimit: 18
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              }
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.historicalChartProperties4.colors = [{
            borderColor: '#f2a034',
            backgroundColor: '#f2a034',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  historicalChartChangeByMonth4() {
    var obj = this;
    var selectedYear = obj.yearDropDown.model;
    var selectedMonth = obj.selectedMonth;
    var selectedChart = obj.historicalDropDownProperties4.model;
    if (selectedYear && selectedChart && selectedMonth) {
      var items = selectedChart.split("{");
      angular.forEach(this.historicalChartTypes, function (item) {
        if (item.Name == items[0].trim() && item.Attributes == "{" + items[1]) {
          this.tagId = item.Id;
        }
        else if (item.Name == items[0].trim() && item.Attributes == null) {
          this.tagId = item.Id;
        }
      }, this);
      this.chartValues = [];
      this.month = this.monthlyData.indexOf(this.selectedMonth);
      this.consumptionService.getHistoricalChartDataForYearMonth(this.selectedAsset, this.tagId, this.month)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            this.chartValues.push(item.Tagvalue);
          }, this);
          this.index = [];
          for (var i = 0; i < this.chartValues.length; i++) {
            this.index.push(i);
          }
          this.labeldata = this.index;
          this.historicalChartProperties4 = {
            labels: this.labeldata,
            data: [this.chartValues],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                    maxTicksLimit: 18
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              }
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.historicalChartProperties4.colors = [{
            borderColor: '#f2a034',
            backgroundColor: '#f2a034',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  listOnChangeDate() {
    var obj = this;
    var startDate = obj.dateRangeStart;
    var endDate = obj.dateRangeEnd
    var dropDown1 = obj.dropDownProperties1.model;
    var dropDown2 = obj.dropDownProperties2.model;
    var dropDown3 = obj.dropDownProperties3.model;
    var dropDown4 = obj.dropDownProperties4.model;
    if (startDate && endDate && dropDown1 && dropDown2 && dropDown3 && dropDown4) {
      startDate = moment(startDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
      endDate = moment(endDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
      if (startDate == 'Invalid date') {
        startDate = obj.dateRangeStart;
      }
      if (endDate == 'Invalid date') {
        endDate = obj.dateRangeEnd;
      }
      this.disableDropdownGraph1 = false;
      this.disableDropdownGraph2 = false;
      this.disableDropdownGraph3 = false;
      this.disableDropdownGraph4 = false;
      var item1 = dropDown1.split("{");
      var item2 = dropDown2.split("{");
      var item3 = dropDown3.split("{");
      var item4 = dropDown4.split("{");
      angular.forEach(this.tagData, function (item) {
        if (item.Name == item1[0].trim() && item.Attributes == "{" + item1[1]) {
          this.tagId1 = item.Id;
        }
        if (item.Name == item2[0].trim() && item.Attributes == "{" + item2[1]) {
          this.tagId2 = item.Id;
        }
        if (item.Name == item3[0].trim() && item.Attributes == "{" + item3[1]) {
          this.tagId3 = item.Id;
        }
        if (item.Name == item4[0].trim() && item.Attributes == "{" + item4[1]) {
          this.tagId4 = item.Id;
        }
      }, this);
      this.timeStampValues1 = [];
      this.timeStampValues2 = [];
      this.timeStampValues3 = [];
      this.timeStampValues4 = [];
      this.chartValues1 = [];
      this.consumptionService.getSingleInstanceTimeStamps(startDate, endDate, this.tagId1)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            this.timeStampValues1.push(item.Time_stamp);
          }, this);
          var uniqueTimeStamps1 = this.timeStampValues1.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
          })
          this.dropDownProperties5 = {
            placeHolder: 'All Options',

            model:uniqueTimeStamps1[0],

            options: uniqueTimeStamps1,
            onChange: (id) => {
            },
          };
          angular.forEach(tagValues, function (item) {
            if (item.Time_stamp == this.timeStampValues1[0]) {
              this.chartValues1.push(item.Tagvalue);
            }
          }, this);
          angular.forEach(this.chartValues1, function (lineitem) {
            this.linedata = lineitem.split('[');
            this.linedata = this.linedata[1].split(']');
            this.linedata = this.linedata[0].split(',');
            this.datapoints = [];
            for (var i = 0; i < this.linedata.length; i++) {
              if (this.linedata[i] != '' && this.linedata[i] != '...,') {
                this.datapoints.push(this.linedata[i]);
              }
            }
          }, this);
          this.index = [];
          for (var i = 0; i < this.datapoints.length; i++) {
            this.index.push(this.datapoints.indexOf(this.datapoints[i]));
          }
          this.labeldata = this.index;
          this.lineChartProperties1 = {
            labels: this.labeldata,
            data: [this.datapoints],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                    maxTicksLimit: 18,
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              }
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.lineChartProperties1.colors = [{
            borderColor: '#02f4b3',
            backgroundColor: '#02f4b3',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
      this.chartValues2 = [];
      this.consumptionService.getSingleInstanceTimeStamps(startDate, endDate, this.tagId2)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            this.timeStampValues2.push(item.Time_stamp);
          }, this);
          var uniqueTimeStamps2 = this.timeStampValues2.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
          })
          this.dropDownProperties6 = {
            placeHolder: 'All Options',

            model:uniqueTimeStamps2[0],

            options: uniqueTimeStamps2,
            onChange: (id) => {
            },
          };
          angular.forEach(tagValues, function (item) {
            if (item.Time_stamp == this.timeStampValues2[0]) {
              this.chartValues2.push(item.Tagvalue);
            }
          }, this);
          angular.forEach(this.chartValues2, function (lineitem) {
            this.linedata = lineitem.split('[');
            this.linedata = this.linedata[1].split(']');
            this.linedata = this.linedata[0].split(',');
            this.datapoints = [];
            for (var i = 0; i < this.linedata.length; i++) {
              if (this.linedata[i] != '' && this.linedata[i] != '...,') {
                this.datapoints.push(this.linedata[i]);
              }
            }
          }, this);
          this.index = [];
          for (var i = 0; i < this.datapoints.length; i++) {
            this.index.push(this.datapoints.indexOf(this.datapoints[i]));
          }
          this.labeldata = this.index;
          this.lineChartProperties2 = {
            labels: this.labeldata,
            data: [this.datapoints],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                    maxTicksLimit: 18
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              }
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.lineChartProperties2.colors = [{
            borderColor: '#0094ff',
            backgroundColor: '#0094ff',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
      this.chartValues3 = [];
      this.consumptionService.getSingleInstanceTimeStamps(startDate, endDate, this.tagId3)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            this.timeStampValues3.push(item.Time_stamp);
          }, this);
          var uniqueTimeStamps3 = this.timeStampValues3.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
          })
          // console.log(uniqueTimeStamps3);
          this.dropDownProperties7 = {
            placeHolder: 'All Options',

            model:uniqueTimeStamps3[0],

            options: uniqueTimeStamps3,
            onChange: (id) => {
            },
          };
          angular.forEach(tagValues, function (item) {
            if (item.Time_stamp == this.timeStampValues3[0]) {
              this.chartValues3.push(item.Tagvalue);
            }
          }, this);
          angular.forEach(this.chartValues3, function (lineitem) {
            this.linedata = lineitem.split('[');
            this.linedata = this.linedata[1].split(']');
            this.linedata = this.linedata[0].split(',');
            this.datapoints = [];
            for (var i = 0; i < this.linedata.length; i++) {
              if (this.linedata[i] != '' && this.linedata[i] != '...,') {
                this.datapoints.push(this.linedata[i]);
              }
            }
          }, this);
          this.index = [];
          for (var i = 0; i < this.datapoints.length; i++) {
            this.index.push(this.datapoints.indexOf(this.datapoints[i]));
          }
          this.labeldata = this.index;
          this.lineChartProperties3 = {
            labels: this.labeldata,
            data: [this.datapoints],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                    maxTicksLimit: 18
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              }
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.lineChartProperties3.colors = [{
            borderColor: '#eef334',
            backgroundColor: '#eef334',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
      this.chartValues4 = [];
      this.consumptionService.getSingleInstanceTimeStamps(startDate, endDate, this.tagId4)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            this.timeStampValues4.push(item.Time_stamp);
          }, this);
          this.$scope.$apply();
          var uniqueTimeStamps4 = this.timeStampValues4.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
          })
          this.dropDownProperties8 = {
            placeHolder: 'All Options',
            model: uniqueTimeStamps4[0],
            options: uniqueTimeStamps4,
            onChange: (id) => {
            },
          };
          angular.forEach(tagValues, function (item) {
            if (item.Time_stamp == this.timeStampValues4[0]) {
              this.chartValues4.push(item.Tagvalue);
            }
          }, this);
          this.$scope.$apply();
          angular.forEach(this.chartValues4, function (lineitem) {
            this.linedata = lineitem.split('[');
            this.linedata = this.linedata[1].split(']');
            this.linedata = this.linedata[0].split(',');
            this.datapoints = [];
            for (var i = 0; i < this.linedata.length; i++) {
              if (this.linedata[i] != '' && this.linedata[i] != '...,') {
                this.datapoints.push(this.linedata[i]);
              }
            }
          }, this);
          this.index = [];
          for (var i = 0; i < this.datapoints.length; i++) {
            this.index.push(this.datapoints.indexOf(this.datapoints[i]));
          }
          this.labeldata = this.index;
          this.lineChartProperties4 = {
            labels: this.labeldata,
            data: [this.datapoints],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                    maxTicksLimit: 18
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              }
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.lineChartProperties4.colors = [{
            borderColor: '#f2a034',
            backgroundColor: '#f2a034',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  chartNameChange1() {
    var obj = this;
    var startDate = obj.dateRangeStart;
    var endDate = obj.dateRangeEnd
    var dropDown = obj.dropDownProperties1.model;
    if (startDate && endDate && dropDown) {
      startDate = moment(startDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
      endDate = moment(endDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
      if (startDate == 'Invalid date') {
        startDate = obj.dateRangeStart;
      }
      if (endDate == 'Invalid date') {
        endDate = obj.dateRangeEnd;
      }
      this.disableDropdownGraph1 = false;
      this.disableDropdownGraph2 = false;
      this.disableDropdownGraph3 = false;
      this.disableDropdownGraph4 = false;
      var items = dropDown.split("{");
      angular.forEach(this.tagData, function (item) {
        if (item.Name == items[0].trim() && item.Attributes == "{" + items[1]) {
          this.tagId = item.Id;
        }
      }, this);
      this.timeStampValues = [];
      this.chartValues = [];
      this.consumptionService.getSingleInstanceTimeStamps(startDate, endDate, this.tagId)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            this.timeStampValues.push(item.Time_stamp);
          }, this);
          var uniqueTimeStamps = this.timeStampValues.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
          })
          this.dropDownProperties5 = {
            placeHolder: 'All Options',
            model: uniqueTimeStamps[0],
            options: uniqueTimeStamps,
            onChange: (id) => {
            },
          };
          this.$scope.$apply();
          angular.forEach(tagValues, function (item) {
            if (item.Time_stamp == this.timeStampValues[0]) {
              this.chartValues.push(item.Tagvalue);
            }
          }, this);
          this.datapoints = [];
          angular.forEach(this.chartValues, function (lineitem) {
            this.linedata = lineitem.split('[');
            this.linedata = this.linedata[1].split(']');
            this.linedata = this.linedata[0].split(',');
            for (var i = 0; i < this.linedata.length; i++) {
              if (this.linedata[i] != '' && this.linedata[i] != '...,') {
                this.datapoints.push(this.linedata[i]);
              }
            }
          }, this);
          this.index = [];
          for (var i = 0; i < this.datapoints.length; i++) {
            this.index.push(this.datapoints.indexOf(this.datapoints[i]));
          }
          this.labeldata = this.index;
          this.lineChartProperties1 = {
            labels: this.labeldata,
            data: [this.datapoints],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                    maxTicksLimit: 18
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              }
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.lineChartProperties1.colors = [{
            borderColor: '#02f4b3',
            backgroundColor: '#02f4b3',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  getChartDataBasedOnTimeStamp1() {
    var obj = this;
    var startDate = obj.dateRangeStart;
    var endDate = obj.dateRangeEnd
    var dropDown = obj.dropDownProperties1.model;
    var selectedTime = obj.dropDownProperties5.model;
    if (startDate && endDate && dropDown) {
      startDate = moment(startDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
      endDate = moment(endDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
      if (startDate == 'Invalid date') {
        startDate = obj.dateRangeStart;
      }
      if (endDate == 'Invalid date') {
        endDate = obj.dateRangeEnd;
      }
      this.disableDropdownGraph1 = false;
      this.disableDropdownGraph2 = false;
      this.disableDropdownGraph3 = false;
      this.disableDropdownGraph4 = false;
      var items = dropDown.split("{");
      angular.forEach(this.tagData, function (item) {
        if (item.Name == items[0].trim() && item.Attributes == "{" + items[1]) {
          this.tagId = item.Id;
        }
      }, this);
      this.chartValues = [];
      this.consumptionService.getSingleInstanceTimeStamps(startDate, endDate, this.tagId)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            if (item.Time_stamp == selectedTime) {
              this.chartValues.push(item.Tagvalue);
            }
          }, this);
          angular.forEach(this.chartValues, function (lineitem) {
            this.linedata = lineitem.split('[');
            this.linedata = this.linedata[1].split(']');
            this.linedata = this.linedata[0].split(',');
            this.datapoints = [];
            for (var i = 0; i < this.linedata.length; i++) {
              if (this.linedata[i] != '' && this.linedata[i] != '...,') {
                this.datapoints.push(this.linedata[i]);
              }
            }
          }, this);
          this.index = [];
          for (var i = 0; i < this.datapoints.length; i++) {
            this.index.push(this.datapoints.indexOf(this.datapoints[i]));
          }
          this.labeldata = this.index;
          this.lineChartProperties1 = {
            labels: this.labeldata,
            data: [this.datapoints],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              },
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.lineChartProperties1.colors = [{
            borderColor: '#02f4b3',
            backgroundColor: '#02f4b3',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  chartNameChange2() {
    var obj = this;
    var startDate = obj.dateRangeStart;
    var endDate = obj.dateRangeEnd
    var dropDown = obj.dropDownProperties2.model;
    if (startDate && endDate && dropDown) {
      startDate = moment(startDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
      endDate = moment(endDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
      if (startDate == 'Invalid date') {
        startDate = obj.dateRangeStart;
      }
      if (endDate == 'Invalid date') {
        endDate = obj.dateRangeEnd;
      }
      this.disableDropdownGraph1 = false;
      this.disableDropdownGraph2 = false;
      this.disableDropdownGraph3 = false;
      this.disableDropdownGraph4 = false;
      var items = dropDown.split("{");
      angular.forEach(this.tagData, function (item) {
        if (item.Name == items[0].trim() && item.Attributes == "{" + items[1]) {
          this.tagId = item.Id;
        }
      }, this);
      this.timeStampValues = [];
      this.chartValues = [];
      this.consumptionService.getSingleInstanceTimeStamps(startDate, endDate, this.tagId)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            this.timeStampValues.push(item.Time_stamp);
          }, this);
          var uniqueTimeStamps = this.timeStampValues.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
          })
          this.dropDownProperties6 = {
            placeHolder: 'All Options',
            model: uniqueTimeStamps[0],
            options: uniqueTimeStamps,
            onChange: (id) => {
            },
          };
          this.$scope.$apply();
          angular.forEach(tagValues, function (item) {
            if (item.Time_stamp == this.timeStampValues[0]) {
              this.chartValues.push(item.Tagvalue);
            }
          }, this);
          this.datapoints = [];
          angular.forEach(this.chartValues, function (lineitem) {
            this.linedata = lineitem.split('[');
            this.linedata = this.linedata[1].split(']');
            this.linedata = this.linedata[0].split(',');
            for (var i = 0; i < this.linedata.length; i++) {
              if (this.linedata[i] != '' && this.linedata[i] != '...,') {
                this.datapoints.push(this.linedata[i]);
              }
            }
          }, this);
          this.index = [];
          for (var i = 0; i < this.datapoints.length; i++) {
            this.index.push(this.datapoints.indexOf(this.datapoints[i]));
          }
          this.labeldata = this.index;
          this.lineChartProperties2 = {
            labels: this.labeldata,
            data: [this.datapoints],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              }
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.lineChartProperties2.colors = [{
            borderColor: '#0094ff',
            backgroundColor: '#0094ff',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  getChartDataBasedOnTimeStamp2() {
    var obj = this;
    var startDate = obj.dateRangeStart;
    var endDate = obj.dateRangeEnd
    var dropDown = obj.dropDownProperties2.model;
    var selectedTime = obj.dropDownProperties6.model;
    if (startDate && endDate && dropDown) {
      startDate = moment(startDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
      endDate = moment(endDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
      if (startDate == 'Invalid date') {
        startDate = obj.dateRangeStart;
      }
      if (endDate == 'Invalid date') {
        endDate = obj.dateRangeEnd;
      }
      this.disableDropdownGraph1 = false;
      this.disableDropdownGraph2 = false;
      this.disableDropdownGraph3 = false;
      this.disableDropdownGraph4 = false;
      var items = dropDown.split("{");
      angular.forEach(this.tagData, function (item) {
        if (item.Name == items[0].trim() && item.Attributes == "{" + items[1]) {
          this.tagId = item.Id;
        }
      }, this);
      this.chartValues = [];
      this.consumptionService.getSingleInstanceTimeStamps(startDate, endDate, this.tagId)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            if (item.Time_stamp == selectedTime) {
              this.chartValues.push(item.Tagvalue);
            }
          }, this);
          angular.forEach(this.chartValues, function (lineitem) {
            this.linedata = lineitem.split('[');
            this.linedata = this.linedata[1].split(']');
            this.linedata = this.linedata[0].split(',');
            this.datapoints = [];
            for (var i = 0; i < this.linedata.length; i++) {
              if (this.linedata[i] != '' && this.linedata[i] != '...,') {
                this.datapoints.push(this.linedata[i]);
              }
            }
          }, this);
          this.index = [];
          for (var i = 0; i < this.datapoints.length; i++) {
            this.index.push(this.datapoints.indexOf(this.datapoints[i]));
          }
          this.labeldata = this.index;
          this.lineChartProperties2 = {
            labels: this.labeldata,
            data: [this.datapoints],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',

                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              },
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.lineChartProperties2.colors = [{
            borderColor: '#0094ff',
            backgroundColor: '#0094ff',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  chartNameChange3() {
    var obj = this;
    var startDate = obj.dateRangeStart;
    var endDate = obj.dateRangeEnd
    var dropDown = obj.dropDownProperties3.model;
    if (startDate && endDate && dropDown) {
      startDate = moment(startDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
      endDate = moment(endDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
      if (startDate == 'Invalid date') {
        startDate = obj.dateRangeStart;
      }
      if (endDate == 'Invalid date') {
        endDate = obj.dateRangeEnd;
      }
      this.disableDropdownGraph1 = false;
      this.disableDropdownGraph2 = false;
      this.disableDropdownGraph3 = false;
      this.disableDropdownGraph4 = false;
      var items = dropDown.split("{");
      angular.forEach(this.tagData, function (item) {
        if (item.Name == items[0].trim() && item.Attributes == "{" + items[1]) {
          this.tagId = item.Id;
        }
      }, this);
      this.timeStampValues = [];
      this.chartValues = [];
      this.consumptionService.getSingleInstanceTimeStamps(startDate, endDate, this.tagId)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            this.timeStampValues.push(item.Time_stamp);
          }, this);
          var uniqueTimeStamps = this.timeStampValues.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
          })
          this.dropDownProperties7 = {
            placeHolder: 'All Options',

            model:uniqueTimeStamps[0],

            options: uniqueTimeStamps,
            onChange: (id) => {
            },
          };
          this.$scope.$apply();
          angular.forEach(tagValues, function (item) {
            if (item.Time_stamp == this.timeStampValues[0]) {
              this.chartValues.push(item.Tagvalue);
            }
          }, this);
          this.datapoints = [];
          angular.forEach(this.chartValues, function (lineitem) {
            this.linedata = lineitem.split('[');
            this.linedata = this.linedata[1].split(']');
            this.linedata = this.linedata[0].split(',');
            for (var i = 0; i < this.linedata.length; i++) {
              if (this.linedata[i] != '' && this.linedata[i] != '...,') {
                this.datapoints.push(this.linedata[i]);
              }
            }
          }, this);
          this.index = [];
          for (var i = 0; i < this.datapoints.length; i++) {
            this.index.push(this.datapoints.indexOf(this.datapoints[i]));
          }
          this.labeldata = this.index;
          this.lineChartProperties3 = {
            labels: this.labeldata,
            data: [this.datapoints],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              }
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.lineChartProperties3.colors = [{
            borderColor: '#eef334',
            backgroundColor: '#eef334',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  getChartDataBasedOnTimeStamp3() {
    var obj = this;
    var startDate = obj.dateRangeStart;
    var endDate = obj.dateRangeEnd
    var dropDown = obj.dropDownProperties3.model;
    var selectedTime = obj.dropDownProperties7.model;
    if (startDate && endDate && dropDown) {
      startDate = moment(startDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
      endDate = moment(endDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
      if (startDate == 'Invalid date') {
        startDate = obj.dateRangeStart;
      }
      if (endDate == 'Invalid date') {
        endDate = obj.dateRangeEnd;
      }
      this.disableDropdownGraph1 = false;
      this.disableDropdownGraph2 = false;
      this.disableDropdownGraph3 = false;
      this.disableDropdownGraph4 = false;
      var items = dropDown.split("{");
      angular.forEach(this.tagData, function (item) {
        if (item.Name == items[0].trim() && item.Attributes == "{" + items[1]) {
          this.tagId = item.Id;
        }
      }, this);
      this.chartValues = [];
      this.consumptionService.getSingleInstanceTimeStamps(startDate, endDate, this.tagId)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            if (item.Time_stamp == selectedTime) {
              this.chartValues.push(item.Tagvalue);
            }
          }, this);
          angular.forEach(this.chartValues, function (lineitem) {
            this.linedata = lineitem.split('[');
            this.linedata = this.linedata[1].split(']');
            this.linedata = this.linedata[0].split(',');
            this.datapoints = [];
            for (var i = 0; i < this.linedata.length; i++) {
              if (this.linedata[i] != '' && this.linedata[i] != '...,') {
                this.datapoints.push(this.linedata[i]);
              }
            }
          }, this);

            this.index=[];
            for (var i = 0; i < this.datapoints.length; i++) {
              this.index.push(this.datapoints.indexOf(this.datapoints[i]));
            }

          this.labeldata = this.index;
          this.lineChartProperties3 = {
            labels: this.labeldata,
            data: [this.datapoints],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              },
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }

          this.lineChartProperties3.colors = [{
            borderColor: '#eef334',
            backgroundColor: '#eef334',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  chartNameChange4() {
    var obj = this;
    var startDate = obj.dateRangeStart;
    var endDate = obj.dateRangeEnd
    var dropDown = obj.dropDownProperties4.model;
    if (startDate && endDate && dropDown) {
      startDate = moment(startDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
      endDate = moment(endDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
      if (startDate == 'Invalid date') {
        startDate = obj.dateRangeStart;
      }
      if (endDate == 'Invalid date') {
        endDate = obj.dateRangeEnd;
      }
      this.disableDropdownGraph1 = false;
      this.disableDropdownGraph2 = false;
      this.disableDropdownGraph3 = false;
      this.disableDropdownGraph4 = false;
      var items = dropDown.split("{");
      angular.forEach(this.tagData, function (item) {
        if (item.Name == items[0].trim() && item.Attributes == "{" + items[1]) {
          this.tagId = item.Id;
        }
      }, this);
      this.timeStampValues = [];
      this.chartValues = [];
      this.consumptionService.getSingleInstanceTimeStamps(startDate, endDate, this.tagId)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            this.timeStampValues.push(item.Time_stamp);
          }, this);
          var uniqueTimeStamps = this.timeStampValues.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
          })
          this.dropDownProperties8 = {
            placeHolder: 'All Options',

            model:uniqueTimeStamps[0],

            options: uniqueTimeStamps,
            onChange: (id) => {
            },
          };
          angular.forEach(tagValues, function (item) {
            if (item.Time_stamp == this.timeStampValues[0]) {
              this.chartValues.push(item.Tagvalue);
            }
          }, this);
          this.datapoints = [];
          angular.forEach(this.chartValues, function (lineitem) {
            this.linedata = lineitem.split('[');
            this.linedata = this.linedata[1].split(']');
            this.linedata = this.linedata[0].split(',');
            for (var i = 0; i < this.linedata.length; i++) {
              if (this.linedata[i] != '' && this.linedata[i] != '...,') {
                this.datapoints.push(this.linedata[i]);
              }
            }
          }, this);
          this.index = [];
          for (var i = 0; i < this.datapoints.length; i++) {
            this.index.push(this.datapoints.indexOf(this.datapoints[i]));
          }
          this.labeldata = this.index;
          this.lineChartProperties4 = {
            labels: this.labeldata,
            data: [this.datapoints],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              }
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }
          this.lineChartProperties4.colors = [{
            borderColor: '#f2a034',
            backgroundColor: '#f2a034',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  getChartDataBasedOnTimeStamp4(){

    var obj = this;
    var startDate = obj.dateRangeStart;
    var endDate = obj.dateRangeEnd
    var dropDown = obj.dropDownProperties4.model;
    var selectedTime = obj.dropDownProperties8.model;

    if(startDate && endDate && dropDown)
    {
      startDate = moment( startDate, 'MM-DD-YYYY HH:mm:ss',true).format("YYYY-MM-DD HH:mm:ss");
      endDate = moment( endDate, 'MM-DD-YYYY HH:mm:ss',true).format("YYYY-MM-DD HH:mm:ss");
      if(startDate=='Invalid date')
      {

        startDate = obj.dateRangeStart;
      }
      if (endDate == 'Invalid date') {
        endDate = obj.dateRangeEnd;
      }
      this.disableDropdownGraph1 = false;
      this.disableDropdownGraph2 = false;
      this.disableDropdownGraph3 = false;
      this.disableDropdownGraph4 = false;
      var items = dropDown.split("{");
      angular.forEach(this.tagData, function (item) {
        if (item.Name == items[0].trim() && item.Attributes == "{" + items[1]) {
          this.tagId = item.Id;
        }
      }, this);
      this.chartValues = [];
      this.consumptionService.getSingleInstanceTimeStamps(startDate, endDate, this.tagId)
        .then((response) => {
          var tagValues = JSON.parse(response);
          angular.forEach(tagValues, function (item) {
            if (item.Time_stamp == selectedTime) {
              this.chartValues.push(item.Tagvalue);
            }
          }, this);
          angular.forEach(this.chartValues, function (lineitem) {
            this.linedata = lineitem.split('[');
            this.linedata = this.linedata[1].split(']');
            this.linedata = this.linedata[0].split(',');
            this.datapoints = [];
            for (var i = 0; i < this.linedata.length; i++) {
              if (this.linedata[i] != '' && this.linedata[i] != '...,') {
                this.datapoints.push(this.linedata[i]);
              }
            }
          }, this);

            this.index=[];
            for (var i = 0; i < this.datapoints.length; i++) {
              this.index.push(this.datapoints.indexOf(this.datapoints[i]));
            }

          this.labeldata = this.index;
          this.lineChartProperties4 = {
            labels: this.labeldata,
            data: [this.datapoints],
            options: {
              tooltips:  {
                callbacks:  {
                  label:  function (tooltipItem,  data) {
                    var  legend  =  new  Array();
                    for (var  i  in  data.datasets) {
                      legend.push(
                        "Value: "  +  parseFloat(data.datasets[i].data[tooltipItem.index])
                      );
                    }
                    return  legend;
                  }
                }
              },
              scales: {
                yAxes: [{
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  scaleLabel:  {
                    display:  true,
                    labelString:  'y-axis'
                  }
                }],
                xAxes: [{
                  position: 'bottom',
                  ticks: {
                    userCallback: function (label, index) {
                      if (index == 0) {
                        return 0;
                      }
                      else {
                        return label;
                      }
                    },
                    autoSkip: true,
                  },
                  scaleLabel:  {
                    display:  true,
                    labelString:  'x-axis'
                  }
                }]
              },
            },
            datasetOverride: [{ yAxisID: 'y-axis-1' }]
          }

          this.lineChartProperties4.colors = [{
            borderColor: '#f2a034',
            backgroundColor: '#f2a034',
            fill: false /* this option hide background-color */
          }];
          this.$scope.$apply();
        });
    }
  }

  initList(list) {
    this.value = list;
    this.upperLimit = 100;
    this.lowerLimit = 0;
    this.unit = "";
    this.precision = 2;
    this.ranges = [
      {
        min: 0,
        max: 10,
        color: 'red'
      },
      {
        min: 10,
        max: 20,
        color: 'orange'
      },
      {
        min: 20,
        max: 40,
        color: 'yellow'
      },
      {
        min: 40,
        max: 100,
        color: 'green'
      }
    ];
    this.dataLoadedSuccessfully = true;
  }
  clickTab(type) {
    this.tabFocus = type;
  }

 clickCheck(type) {
   var obj= this;
  obj.consumptionService.deleteEvent(type.EventID,type.Status,type.TimeStamp).then((response) => {
      obj.consumptionService.getLatestEvents(obj.selectedAsset).then((response) => {
        obj.latestEvents = JSON.parse(response);

    });
    // this.$scope.$apply();
    });
     obj.sharedService.getOpenEvents().then((response) => {
      obj.openEvents = JSON.parse(response)[0].EventCount;
     var events =  obj.openEvents;
      obj.myService.setAlarm(obj.openEvents);

    })
  }
  clickTime(type) {
    this.timeBorder = type;
  }
  dayTab(type) {
    this.dwm = type;
  }
  weekTab(type) {
    this.wdm = type;
  }
  monthTab(type) {
    this.mwd = type;
  }
  statusTab(type) {
    this.daily = type;
  }
  dayTab2(type) {
    this.weekly = type;
  }
  dayTab3(type) {
    this.monthly = type;
  }
  dayTab4(type) {
    this.day = type;
  }
  dayTab5(type) {
    this.week = type;
  }

  PlotLineChart() {
    this.lineOptions = {
      chart: {
        zoomType: 'x',
        style: {
          fontWeight: 'normal'
        },
        backgroundColor: '#242425',
        marginRight: 5,

      },
      exporting: {
        enabled: false
      },
      tooltip: {
        style: {
          fontWeight: 'bold',

        },
        crosshairs: true
      },
      title: {
        text: ''
      },
      yAxis: {
        title: {
          text: '',
          min: 0,
          max: 10,
          style: {
            fontWeight: 'bold'
          }
        },
      },

      plotOptions: {
        series: {
          lineWidth: 1,
          pointStart: 0,
          color: '#048E60',
        }
      },

    }
  }
  portraitVPositionChart(graphData, chartName1) {
    var min, max, oldMin, oldMax, width, height;
    var titleText = '',
      lineColor = '';
    if (chartName1 == "customChart" || chartName1 == "customChart1") {
      titleText = ''; //Acceleration Time Domain (1H) "Vibration-Horizontal Position ";
      lineColor = "rgb(174, 133, 201)";
    } else {
      titleText = ''; //Acceleration Time Domain (1V)   "Vibration-Vertical Position ";
      lineColor = "#0073b7";
    }

    // Highcharts.chart(chartName1, {
    //   chart: {
    //     spacingBottom: 10,
    //     zoomType: 'x',
    //     backgroundColor: '#171717',
    //   },
    //   exporting: {
    //     enabled: false
    //   },
    //   tooltip: {
    //     style: {
    //       fontWeight: 'bold'
    //     }
    //   },
    //   title: {
    //     text: titleText
    //   },
    //   plotOptions: {
    //     series: {
    //       lineWidth: 1,
    //       pointStart: 0,
    //       color: lineColor
    //     }
    //   },
    //   yAxis: {
    //     title: {
    //       text: '(g)',
    //       style: {
    //         fontWeight: 'bold'
    //       }
    //     },
    //     plotLines: [{
    //       value: 0,
    //       color: 'black',
    //       dashStyle: 'solid',
    //       width: 1,
    //     }]
    //   },
    //   xAxis: {
    //     plotLines: [{
    //       value: 0,
    //       color: 'gray',
    //       dashStyle: 'solid',
    //       width: 1,
    //     }]
    //   },
    //   series: [{
    //     name: 'Time',
    //     data: graphData
    //   }]
    // });
  }

  VelocityVerticalFrequencyChart(VerticalPositionChart, resVdata, temptitle1) {
    var ytext, plotColor;

    temptitle1 = ''; //Velocity (1V)
    ytext = "(mm/s pk)";
    plotColor = '#ff5400'; // '#800000';

    if (this.chartVelocityVerticalFrequencyChart) {
      this.chartVelocityVerticalFrequencyChart.series[0].setData(resVdata, true);
    } else {
      // this.chartVelocityVerticalFrequencyChart = Highcharts.chart(VerticalPositionChart, Highcharts.merge(this.lineOptions, {
      //   chart: {
      //     zoomType: 'x',
      //     style: {
      //       fontWeight: 'normal'
      //     },
      //     backgroundColor: '#171717',
      //   },
      //   exporting: {
      //     enabled: false
      //   },
      //   tooltip: {
      //     style: {
      //       fontWeight: 'bold'

      //     },
      //     crosshairs: true
      //   },
      //   title: {
      //     text: temptitle1
      //   },

      //   yAxis: {
      //     title: {
      //       text: ytext,
      //       min: 0,
      //       max: 10,
      //       style: {
      //         fontWeight: 'bold',
      //         fontSize: '12px'
      //       }
      //     },

      //   },
      //   plotOptions: {
      //     series: {
      //       lineWidth: 1,
      //       pointStart: 0,
      //       color: plotColor,
      //     }
      //   },
      //   series: [{
      //     name: 'Frequency (Hz)',
      //     data: resVdata,
      //     min: 0,
      //     max: 10
      //   }]

      // }));
    }
  }

  FFTVelocityHorizontalChart(FFTVelocityChartId, res, temptitle) {
    var ytext, plotColor;
    temptitle = ''; //Velocity (1H)
    ytext = "(mm/s pk)";
    plotColor = '#ff5400'; // '#800000';


    if (this.chartFFTVelocityChart) {
      this.chartFFTVelocityChart.series[0].setData(res, true);
    } else {
      // this.chartFFTVelocityChart = Highcharts.chart(FFTVelocityChartId, Highcharts.merge(this.lineOptions, {
      //   chart: {
      //     zoomType: 'x',
      //     style: {
      //       fontWeight: 'normal'
      //     },
      //     backgroundColor: '#171717',
      //   },
      //   exporting: {
      //     enabled: false
      //   },
      //   tooltip: {
      //     style: {
      //       fontWeight: 'bold',

      //     },
      //     crosshairs: true
      //   },
      //   title: {
      //     text: temptitle
      //   },
      //   yAxis: {
      //     title: {
      //       text: ytext,
      //       min: 0,
      //       max: 10,
      //       style: {
      //         fontWeight: 'bold'
      //       }
      //     },
      //   },

      //   plotOptions: {
      //     series: {
      //       lineWidth: 1,
      //       pointStart: 0,
      //       color: plotColor,

      //     }
      //   },

      //   series: [{
      //     name: 'Frequency (Hz)',
      //     data: res,
      //     min: 0,
      //     max: 10
      //   }]
      // }));
    }
  }

  DisplacementVerticalFrequencyChart(DisplacementVerticalPositionChart, resVdata, temptitle1) {
    var ytext, plotColor;

    temptitle1 = ''; //Displacement (1V)
    ytext = "(um pk-pk)";
    plotColor = '#f8fd36'; //718E04

    if (this.chartDisplacementVerticalFrequencyChart) {
      this.chartDisplacementVerticalFrequencyChart.series[0].setData(resVdata, true);
    } else {
      // this.chartDisplacementVerticalFrequencyChart = Highcharts.chart(DisplacementVerticalPositionChart, Highcharts.merge(this.lineOptions, {
      //   chart: {
      //     zoomType: 'x',
      //     style: {
      //       fontWeight: 'normal'
      //     },
      //     backgroundColor: '#171717',
      //   },
      //   exporting: {
      //     enabled: false
      //   },
      //   tooltip: {
      //     style: {
      //       fontWeight: 'bold'

      //     },
      //     crosshairs: true
      //   },
      //   title: {
      //     text: temptitle1
      //   },

      //   yAxis: {
      //     title: {
      //       text: ytext,
      //       min: 0,
      //       max: 10,
      //       style: {
      //         fontWeight: 'bold',
      //         fontSize: '12px'
      //       }
      //     },

      //   },
      //   plotOptions: {
      //     series: {
      //       lineWidth: 1,
      //       pointStart: 0,
      //       color: plotColor,
      //     }
      //   },
      //   series: [{
      //     name: 'Frequency (Hz)',
      //     data: resVdata,
      //     min: 0,
      //     max: 10
      //   }]

      // }));
    }
  }

  FFTDisplacementChart(FFTDisplacementChartId, res) {
    var temptitle, ytext, plotColor;

    temptitle = ''; //Displacement (1H)
    ytext = "(um pk-pk)";
    plotColor = '#f8fd36'; //718E04

    if (this.chartFFTDisplacementChart) {
      this.chartFFTDisplacementChart.series[0].setData(res, true);
    } else {
      // this.chartFFTDisplacementChart = Highcharts.chart(FFTDisplacementChartId, Highcharts.merge(this.lineOptions, {
      //   chart: {
      //     zoomType: 'x',
      //     style: {
      //       fontWeight: 'normal'
      //     },
      //     backgroundColor: '#171717',
      //   },
      //   exporting: {
      //     enabled: false
      //   },
      //   tooltip: {
      //     style: {
      //       fontWeight: 'bold',

      //     },
      //     crosshairs: true
      //   },
      //   title: {
      //     text: temptitle
      //   },
      //   yAxis: {
      //     title: {
      //       text: ytext,
      //       min: 0,
      //       max: 10,
      //       style: {
      //         fontWeight: 'bold'
      //       }
      //     },
      //   },

      //   plotOptions: {
      //     series: {
      //       lineWidth: 1,
      //       pointStart: 0,
      //       color: plotColor,

      //     }
      //   },

      //   series: [{
      //     name: 'Frequency (Hz)',
      //     data: res,
      //     min: 0,
      //     max: 10
      //   }]
      // }));
    }
  }

  FFTAccelerationVerticalFrequencyChart(VerticalPositionChart, resVdata1, temptitle1) {
    var plotColor;
    //plotColor = '#2A048E';
    plotColor = '#03f5b4'; //'#2A048E';
    temptitle1 = ''; //Acceleration (1V)

    if (this.chartAccelerationVerticalFrequencyChart) {
      this.chartAccelerationVerticalFrequencyChart.series[0].setData(resVdata1, true);
    } else {
      // this.chartAccelerationVerticalFrequencyChart = Highcharts.chart(VerticalPositionChart, Highcharts.merge(this.lineOptions, {
      //   chart: {
      //     zoomType: 'x',
      //     style: {
      //       fontWeight: 'normal'
      //     },
      //     backgroundColor: '#171717',
      //   },
      //   exporting: {
      //     enabled: false
      //   },
      //   tooltip: {
      //     style: {
      //       fontWeight: 'bold',

      //     },
      //     crosshairs: true
      //   },
      //   title: {
      //     text: temptitle1
      //   },

      //   yAxis: {
      //     title: {
      //       text: '(g pk)',
      //       min: 0,
      //       max: 10,
      //       style: {
      //         fontWeight: 'bold',
      //         fontSize: '12px'
      //       }
      //     },

      //   },
      //   plotOptions: {
      //     series: {
      //       lineWidth: 1,
      //       pointStart: 0,
      //       color: plotColor,
      //     }
      //   },
      //   series: [{
      //     name: 'Frequency (Hz)',
      //     data: resVdata1,
      //     min: 0,
      //     max: 10
      //   }]

      // }));
    }
  }

  // FetchDataFromDBForVPosition(VVchartData) {
  //   var dataV = [],
  //     resV = [],
  //     FFTVchartData = [],
  //     FFTVchartData1 = [],
  //     FFTVchartDataString = [],
  //     FFTVVchartData = [],
  //     FFTVVchartData1 = [],
  //     FFTVVchartDataString = [];
  //
  //   //Amplitute
  //   FFTVchartDataString = VVchartData[1].param_value.replace(/["']/g, "");
  //   FFTVchartDataString = FFTVchartDataString.replace(/["[']/g, "")
  //   FFTVchartDataString = FFTVchartDataString.replace(/["]']/g, "");
  //
  //   var splitdataV = FFTVchartDataString.split(',');
  //
  //   for (i = 0; i < splitdataV.length; i++) {
  //     var tempNoV = parseFloat(splitdataV[i].replace("]", ''));
  //     FFTVchartData.push(tempNoV);
  //   }
  //
  //   //Frequency
  //   FFTVVchartDataString = VVchartData[0].param_value.replace(/["']/g, "");
  //   FFTVVchartDataString = FFTVVchartDataString.replace(/["[']/g, "")
  //   FFTVVchartDataString = FFTVVchartDataString.replace(/["]']/g, "");
  //
  //   var splitdataV1 = FFTVVchartDataString.split(',');
  //
  //   for (var i = 0; i < splitdataV1.length; i++) {
  //     FFTVchartData1.push(parseFloat(splitdataV1[i].replace("]", '')));
  //   }
  //
  //   //Arrange data in [x,y] format
  //   for (i = 0; i < FFTVchartData.length; i++) {
  //     dataV.push(FFTVchartData[i]);
  //   }
  //
  //   for (i = 0; i < FFTVchartData1.length; i++) {
  //     resV.push([FFTVchartData1[i], dataV[i]]);
  //   }
  //
  //   return resV;
  // }

  // FetchDataFromDatabase(resultData) {
  //
  //   var data1 = [],
  //     res = [],
  //     FFTchartData = [],
  //     FFTchartData1 = [],
  //     FFTchartDataString = [],
  //     FFTHchartDataString = [];
  //   //Amplitute
  //   FFTchartDataString = resultData[1].param_value.replace(/["']/g, "");
  //   FFTchartDataString = FFTchartDataString.replace(/["[']/g, "")
  //   FFTchartDataString = FFTchartDataString.replace(/["]']/g, "");
  //   var splidata = FFTchartDataString.split(',');
  //
  //   for (var i = 0; i < splidata.length; i++) {
  //     var tempNumber = parseFloat(splidata[i].replace("]", ''));
  //     FFTchartData.push(tempNumber);
  //   }
  //
  //   //Frequency
  //   FFTHchartDataString = resultData[0].param_value.replace(/["']/g, "");
  //   FFTHchartDataString = FFTHchartDataString.replace(/["[']/g, "")
  //   FFTHchartDataString = FFTHchartDataString.replace(/["]']/g, "");
  //   var splidata1 = FFTHchartDataString.split(',');
  //   for (i = 0; i < splidata1.length; i++) {
  //     var tempNo = parseFloat(splidata1[i].replace("]", ''));
  //     FFTchartData1.push(tempNo);
  //   }
  //
  //   for (i = 0; i < FFTchartData.length; i++) {
  //     data1.push(FFTchartData[i]);
  //   }
  //
  //   for (i = 0; i < FFTchartData1.length; i++) {
  //     res.push([FFTchartData1[i], data1[i]]);
  //   }
  //
  //   return res;
  // }


  HealthStatusChart(data) {
    var clr;
    if (parseFloat(data) >= 0 && parseFloat(data) <= 5) {
      clr = 'red';
    } else if (parseFloat(data) >= 5 && parseFloat(data) <= 15) {
      clr = 'orange';
    } else if (parseFloat(data) >= 15 && parseFloat(data) <= 40) {
      clr = '#DDDF0D';
    } else if (parseFloat(data) >= 40 && parseFloat(data) <= 100) {
      clr = 'green';
    }

    this.motorStatusInImage(data);

    $("#healthStatusPercentage h1").text(data + " %");
    if (this.chartHealthStatus) {
      var pointChart = this.chartHealthStatus.series[0].points[0];
      pointChart.update(parseFloat(data));
    } else {
      var gaugeOptions = {
        chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
          backgroundColor: '#171717',
        },
        exporting: {
          enabled: false
        },
        title: null,
        pane: {
          center: ['50%', '85%'],
          size: '130%',
          startAngle: -90,
          endAngle: 90,
          background: {
            backgroundColor: '#EEE',
            innerRadius: '90%',
            outerRadius: '100%',
            shape: 'arc'
          }
        },

        tooltip: {
          enabled: false
        },

        yAxis: {
          lineWidth: 0,
          minorTickInterval: 15, //'auto',
          minorTickWidth: 0,
          minorTickLength: 0,
          minorTickPosition: 'inside',
          minorTickColor: 'white', //#666

          tickPixelInterval: 15,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 5,
          tickColor: 'white', //#666
          offset: -30,

          title: {
            y: -70
          },
          labels: {
            distance: -15,
            step: 2,
            style: {
              color: 'white',
              fontSize: "10px"
            }
          },

        },

        plotOptions: {
          solidgauge: {
            innerRadius: '90%',
            dataLabels: {
              y: 5,
              borderWidth: 0,
              useHTML: true
            }
          },
          gauge: {
            dial: {
              backgroundColor: 'silver',
              borderColor: 'black',
              rearLength: '0%'
            }
          }
        }
      }
      this.chartHealthStatus = Highcharts.chart('containerHealthStatus', Highcharts.merge(gaugeOptions, {
        pane: {
          center: ['50%', '85%'],
          size: '100%',
          startAngle: -90,
          endAngle: 90,
          background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
            innerRadius: '10',
            outerRadius: '20',
            shape: 'circle'
          }
        },
        yAxis: {
          tickInterval: 10,
          min: 0,
          max: 100,
          title: {
            text: 'Health Index (%)',
            style: {
              fontSize: "17px",
              color: '#f8fd36', // Dark theme bg color #
            }
          },
          plotBands: [{
            thickness: 30,
            from: 40,
            to: 100,
            color: 'green', //  #55BF3B
            // thickness: '10%'
          }, {
            thickness: 30,
            from: 15,
            to: 40,
            color: '#DDDF0D', // yellow
            // thickness: '10%'
          }, {
            thickness: 30,
            from: 5,
            to: 15,
            color: 'orange', //   #DF5353
            // thickness: '10%'
          }, {
            thickness: 30,
            from: 0,
            to: 5,
            color: 'red', //   #DF5353
            // thickness: '10%'
          }],
        },

        exporting: {
          enabled: false
        },
        series: [{
          name: 'ht',
          data: [parseFloat(data)],
          dataLabels: {
            style: {
              fontSize: "30px"
            },
            color: "white",
            backgroundColor: clr,
            formatter: function () {

              //var s;
              //s = '<span style="font-size: 25px;">' + this.point.y + '</span>';
              //return s;
            },
            x: 80,
            y: -10,
            zIndex: 25
          },
          tooltip: {
            valueSuffix: 'ht'
          },
        }]

      }));
    }
  }

  motorStatusInImage(data) {
    if (data >= 40 && data <= 100) {
      $("#statusImage").attr("src", "images/AssetInfoG.png");
    } else if (data >= 15 && data <= 40) {
      $("#statusImage").attr("src", "images/AssetInforY.png");
    } else if (data >= 5 && data <= 15) {
      $("#statusImage").attr("src", "images/AssetInfoO.png");
    } else if (data >= 0 && data <= 5) {
      $("#statusImage").attr("src", "images/AssetInfoR.png");
    }
  }

  runDropDown() {
    this.dropDown = true;
    this.result = null;
    var obj = this;
    obj.input = [];
    obj.selectedValue = '';
    var asset = obj.store.get('selectedAsset');
    var dataObj = {
      Name: asset,
      Flag: true
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.run_drop_down,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) { },
      dataType: 'json'
    });
  }

  runDropDown1() {
    this.dropDown = true;
    this.result = null;
    var obj = this;
    obj.input = [];
    obj.selectedValue = '';
    var asset = obj.store.get('selectedAsset');
    var dataObj = {
      Name: asset,
      Flag: false
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.run_drop_down1,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) { },
      dataType: 'json'
    });
  }

  pushDropDownValues(input) {

    var unique = input.filter(function (elem, index, self) {
      return index == self.indexOf(elem);
    })

    this.dropDownProperties1 = {
      placeHolder: 'All Options',
      model: input[0],
      options: input,
    };
    this.dropDownProperties9 = {
      placeHolder: 'All',
      model: 'All',
      options: ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    };

    this.dropDownProperties2 = {
      placeHolder: 'All Options',
      model: input[1],
      options: input,
      onChange: () => { },
    };
    this.dropDownProperties3 = {
      placeHolder: 'All Options',
      model: input[2],
      options: input,
      onChange: () => { },
    };
    this.dropDownProperties4 = {
      placeHolder: 'All Options',
      model: input[3],
      options: input,
      onChange: () => { },
    };
  }

  pushDropDownValues1(input) {
    var unique = input.filter(function (elem, index, self) {
      return index == self.indexOf(elem);
    })

    this.historicalDropDownProperties1 = {
      placeHolder: 'All Options',
      model: input[0],
      options: input,
    };
    this.historicalDropDownProperties2 = {
      placeHolder: 'All Options',
      model: input[1],
      options: input,
    };
    this.historicalDropDownProperties3 = {
      placeHolder: 'All Options',
      model: input[2],
      options: input,
    };
    this.historicalDropDownProperties4 = {
      placeHolder: 'All Options',
      model: input[3],
      options: input,
    };
  }

  pushDropDownValues2(input) {
    var unique = input.filter(function (elem, index, self) {
      return index == self.indexOf(elem);
    })

    this.yearDropDown = {
      placeHolder: 'All Options',
      model: input[0],
      options: input,
    };
  }




  gaugeChart() {
    this.guageChartProperties = {
      chart: {
        type: 'solidgauge',
        marginTop: 50,
        height: 290,
        width: 300
      },

      title: {
        text: 'Health Index',
        style: {
          color: '#ffffff',
          fontSize: '24px'
        },
      },


      tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {
          fontSize: '16px'
        },
        pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold; text-align: center">{point.y}%</span>',
        positioner: function (labelWidth, labelHeight) {
          return {
            x: 200 - labelWidth / 2,
            y: 180
          };
        }
      },

      pane: {
        startAngle: -140,
        endAngle: 140,
        background: [{ // Track for Move
          outerRadius: '103%',
          innerRadius: '95%',
          backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
          borderWidth: 0,
          shape: 'arc'
        }]
      },

      yAxis: {
        reversed: true,
        max: 100,
        min: 0,
        lineWidth: 0,
        minorTickLength: 0,
        tickPositions: [0, 100],
        labels: {
          distance: 30,
          enabled: true,
          x: 0,
          y: 0,
          format: '{value} %',
          style: {
            fontSize: 16
          },
        }
      },

      plotOptions: {
        solidgauge: {
          borderWidth: '7px',
          dataLabels: {
            enabled: false
          },
          linecap: 'round',
          stickyTracking: false
        },
      },

      series: [{
        name: 'Your Score',
        borderColor: Highcharts.getOptions().colors[0],
        data: [{
          color: Highcharts.getOptions().colors[0],
          radius: '100%',
          innerRadius: '100%',
          y: 0
        }],
      }, {
        name: 'Department Average',
        borderColor: Highcharts.getOptions().colors[1],
        data: [{
          color: Highcharts.getOptions().colors[1],
          radius: '100%',
          innerRadius: '100%',
          y: 5
        }]
      }, {
        name: 'Department Average',
        borderColor: Highcharts.getOptions().colors[2],
        data: [{
          color: Highcharts.getOptions().colors[2],
          radius: '100%',
          innerRadius: '100%',
          y: 6
        }]
      }]
    }
  }

  getdata(data) {

    this.labeldata = [];
    for (var i = 0; i < data.length; i++) {

      var value = data[i];

      var label = value[0];

      this.labeldata.push(label);
    }
    return this.labeldata;
  };

  getdata1(data) {
    this.cleardata = [];
    for (var i = 0; i < data.length; i++) {

      var value = data[i];

      var dataaa = value[1];

      this.cleardata.push(dataaa);
    }
    return this.cleardata;
  };
  getdata(data) {

    this.labeldata = [];
    for (var i = 0; i < data.length; i++) {

      var value = data[i];

      var label = value[0];

      this.labeldata.push(label);
    }
    return this.labeldata;
  };

  getindex(data) {
    this.index = [];
    this.datas = [];
    this.datas = data;
    console.log(data.length);
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      this.index.push(data.indexOf(data[i]));
    }
    return this.index;
  }
}

export default dashboardController;
