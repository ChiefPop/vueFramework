<script>
//******************************************************************************//
//  This file is created by jyyang    2020.12.22                                //
//  the user Info                                                               //
//******************************************************************************//
</script>

<template>
  
</template>

<script>
import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_';

const echarts = require('echarts');

export default {
  name: 'base_echarts',
  
  extends: common_Object,

  data() {
    return {
      charts_: {
        domID: '',

        chart: null
      },

      chartOptions: {
        
      }
    }
  },

  methods: {
    initChart(paramID) {
      if (!paramID && typeof paramID != 'string') return;

      this.charts_.domID = paramID;
      this.charts_.chart = echarts.init(document.getElementById(paramID));
    },

    setChart(paramOption) {
      if (typeof paramOption) {
        paramOption = this.chartOptions;
      }
      
      const chart = this.charts_.chart;

      chart.clear();
      chart.setOption(paramOption);
    },

    updateChart(paramOption) {
      this.setChartOption(paramOption);
      this.setChart();
    },

    updateSeriesData(paramData, paramIndex) {
      if (this.chartOptions.series.length <= paramIndex) return;

      this.chartOptions.series[paramIndex].data = paramData;
      this.setChart();
    },

    setChartOption(paramOption) {
      if (typeof paramOption != 'object') return;

      Object.keys(paramOption).forEach(key => {
        this.chartOptions[key] = paramOption[key];
      })
    },

    setChartType(paramType) {
      if (typeof paramType != 'string') return;

      this.chartOptions.series.forEach(item => {
        item.type = paramType;
      });
    },
  },

  created() {

  },

  mounted() {
    
  }
}
</script>