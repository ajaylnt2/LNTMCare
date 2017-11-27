import angular from 'angular';
import {
  projectConfig
} from '../config';
class consumptionService {
  constructor($http, $q, $rootScope) {
    'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.$rootScope = $rootScope;
  }

  getHealthIndexValue(selectedAsset) {
    var dataObj = {
      Name: selectedAsset
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_health_index,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        return error;
      },
      dataType: 'json'
    });
  }
  getRPMValue(selectedAsset) {
    var dataObj = {
      Name: selectedAsset
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_rpm,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        return error;
      },
      dataType: 'json'
    });
  }
  getTotalRunningHours(selectedAsset) {
    var dataObj = {
      Name: selectedAsset
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_total_running_hours,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        return error;
      },
      dataType: 'json'
    });
  }
  getAverageTemperature(selectedAsset) {
    var dataObj = {
      Name: selectedAsset
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_average_temperature,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        return error;
      },
      dataType: 'json'
    });
  }
  getTimeToFailure(selectedAsset) {
    var dataObj = {
      Name: selectedAsset
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_time_to_failure,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        return error;
      },
      dataType: 'json'
    });
  }
  getAverageCurrent(selectedAsset) {
    var dataObj = {
      Name: selectedAsset
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_average_current,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        return error;
      },
      dataType: 'json'
    });
  }
  getAcceleration(selectedAsset) {
    var dataObj = {
      Name: selectedAsset
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_acceleration,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        return error;
      },
      dataType: 'json'
    });
  }
  getVelocity(selectedAsset) {
    var dataObj = {
      Name: selectedAsset
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_velocity,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        return error;
      },
      dataType: 'json'
    });
  }
  getDisplacement(selectedAsset) {
    var dataObj = {
      Name: selectedAsset
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_displacement,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        return error;
      },
      dataType: 'json'
    });
  }
  getLatestEvents(selectedAsset) {
    var dataObj = {
      Name: selectedAsset
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_latest_events,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        return error;
      },
      dataType: 'json'
    });
  }
  deleteEvent(Id, Status, TimeStamp) {
    var time = TimeStamp.replace('T', ' ');
    var dataObj = {
      ID: Id,
      status: Status,
      timeStamp: time
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.delete_event,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        return error;
      },
      dataType: 'json'
    });
  }
  getYearsForHistoricalTrends(selectedAsset) {
    var dataObj = {
      Name: selectedAsset
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_years_for_historical_trends,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        return error;
      },
      dataType: 'json'
    });
  }

  getHistoricalChartDataForYear(selectedAsset, tagId) {
    var dataObj = {
      Name: selectedAsset,
      TagId: tagId,
      Year: 2017
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_historical_chart_data_for_year,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        return error;
      },
      dataType: 'json'
    });
  }

  getHistoricalChartDataForYearMonth(selectedAsset, tagId, month) {
    var dataObj = {
      Name: selectedAsset,
      TagId: tagId,
      Year: 2017,
      Month: month
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_historical_chart_data_for_year_month,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        return error;
      },
      dataType: 'json'
    });
  }

  getSingleInstanceTimeStamps(startDate, endDate, tagId) {
    var dataObj = {
      Name: "Delivery Belt",
      TagId: tagId,
      StartDate: startDate,
      EndDate: endDate
    };
    return $.ajax({
      type: "POST",
      url: projectConfig.api_base_url + "/" + projectConfig.get_single_instance_time_stamps,
      data: dataObj,
      success: function (response) {
        return response;
      },
      error: function (error) {
        return error;
      },
      dataType: 'json'
    });
  }

  getData() {
    let $that = this;
    let deferred = this.$q.defer();

    this.$http.get('app/json/dashboardData.json')
      .then((resp) => {
        deferred.resolve(resp);
      }, (err) => {
        deferred.reject(err);
      });
    return deferred.promise;
  }
  // getGaugeData() {
  //   var dataObj = {
  //     assetId: 2,
  //     chartName: 'AssetTransactionParameter'
  //   };
  //   return $.ajax({
  //     type: "POST",
  //     url: projectConfig.api_base_url + "/" + projectConfig.get_gauge_data,
  //     data: dataObj,
  //     success: function (response) {
  //       return response;
  //     },
  //     error: function (error) {
  //       return error;
  //     },
  //     dataType: 'json'
  //   });
  // }
 
  // getVerticalData() {
  //   var dataObj = {
  //     assetId: 2,
  //     chartName: 'FFTVibrationVerticalPosition'
  //   };
  //   return $.ajax({
  //     type: "POST",
  //     url: projectConfig.api_base_url + "/" + projectConfig.get_vertical_data,
  //     data: dataObj,
  //     success: function (response) {
  //       return response;
  //     },
  //     error: function (error) {
  //       return error;
  //     },
  //     dataType: 'json'
  //   });
  // }  

}

export default consumptionService;

