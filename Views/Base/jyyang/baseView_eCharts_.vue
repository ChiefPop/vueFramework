<template lang="pug">
  include baseView_eCharts_
</template>

<script>

import * as echarts from 'echarts';
import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  extends: commonView_Component,
  
  data() {
    return {
      myChart: null,
      echarsStyle: {
        width: '400px',
        height: '300px'
      },
      option: {
        
      },


    }
  },

  methods: {
    updateECharts(option) {
      this.option = option;
      if (this.myChart && option) {
        this.myChart.setOption(option);
      }
    },

    updateEChartsDynamic(option) {
      if (option.series.data) {
        this.option.series.data = option.series.data;
      }
      if (option.title) {
        this.option.title = option.title;
      }
      if (option.tooltip) {
        this.option.tooltip = option.tooltip;
      }
      if (option.xAxis) {
        this.option.xAxis = option.xAxis;
      }
      if (option.yAxis) {
        this.option.yAxis = option.yAxis;
      }
    
 
      this.myChart.setOption(this.option);
    }
  },

  created() {

  },

  mounted() {
    this.myChart = echarts.init(document.getElementById('echarts'));

    if (this.option) {
      this.myChart.setOption(this.option);
    }

    setInterval(() => {
      this.option.series[0].data.push(Math.random() * 10);
      this.option.series[0].data.shift();
      this.myChart.setOption(this.option);
    }, 1000);
  }
}
</script>
