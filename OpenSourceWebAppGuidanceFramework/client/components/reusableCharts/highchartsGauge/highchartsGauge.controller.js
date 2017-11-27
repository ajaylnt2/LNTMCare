

class HighchartsGaugeController {
  constructor($scope, $timeout,$attrs){
    'ngInject';
    this.name = 'highchartsGauge';
     this.highchartsdata();
         $timeout(function () {
        //    console.log($attrs.data);
    },1115);

    // console.log(this.data); // this will return undefined
            setTimeout(function () {
                // console.log(this.data);    // this will return the actual value...
            }, 1000);
  }
    highchartsdata(){

var gaugeOptions = {

    chart: {
        type: 'solidgauge'
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

// The speed gauge
var chartSpeed = Highcharts.chart('container-speed', Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 200,
        title: {
            text: 'Speed'
        }
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Speed',
        data: [80],
        dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                   '<span style="font-size:12px;color:silver">km/h</span></div>'
        },
        tooltip: {
            valueSuffix: ' km/h'
        }
    }]

}));

   }

}

export default HighchartsGaugeController;
