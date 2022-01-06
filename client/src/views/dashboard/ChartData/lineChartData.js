import { formatCurrency } from 'utils';

//================================|| DASHBOARD - LINE CHART DATA ||================================//

export const lineChartData = {
  type: 'line',
  height: 90,
  options: {
    chart: {
      id: 'id',
      group: 'IncomeExpense',
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#fff'],
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
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
        // formatter: (val) => formatCurrency(val),
        formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
          return w.globals.categoryLabels[dataPointIndex] + ':  ' + formatCurrency(value);
        },
        title: {
          formatter: () => '',
          // formatter: (seriesName) => seriesName,
        },
      },
      marker: {
        show: false,
      },
    },
  },
  series: [],
};
