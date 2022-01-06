import { formatCurrency, fTimeFrame } from 'utils';

//================================|| DASHBOARD - AREA CHART DATA ||================================//

export const areaChartData = {
  type: 'area',
  height: 109,
  options: {
    chart: {
      id: 'support-chart',
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 1,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
          return fTimeFrame(w.globals.categoryLabels[dataPointIndex], 'month-year') + ':  ' + formatCurrency(value);
        },
        title: {
          formatter: () => '',
        },
      },
      marker: {
        show: false,
      },
    },
  },
  series: [],
};
