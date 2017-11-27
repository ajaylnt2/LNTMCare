
import columnChart from './columnChart';
import pieChart from './pieChart';
import moonGauge from './moonGauge';
import doughnutChart from './doughnutChart';
import angularLineChart from './angularLineChart';
import columnLineChart from './columnLineChart';
import paretoChart from './paretoChart';
import semiGauge from './semiGauge';
import highchartsGauge from './highchartsGauge';



module.exports = angular
  .module('reusableCharts', [
    doughnutChart.name,
    pieChart.name,
    columnChart.name,
    moonGauge.name,
    angularLineChart.name,
    paretoChart.name,
    semiGauge.name,
    highchartsGauge.name,
    columnLineChart.name,


  ])
