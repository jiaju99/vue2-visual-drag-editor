<template>
  <div ref="pieChart" class="chart"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'PieChart',
  props: {
    chartTitle: String,
    chartData: Array,
  },
  data() {
    return {
      chart: undefined,
    };
  },
  created() {
    let option = {
      title: {
        text: this.chartTitle,
        left: 'center',
        top: 'bottom',
        textStyle: {
          fontSize: 12,
          fontWeight: 'normal',
          color: '#333',
        },
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: '次数',
          type: 'pie',
          radius: '70%',
          label: {
            show: false,
          },
          data: this.chartData,
        },
      ],
    };
    /* setTimeout(() => {
      this.chart = echarts.init(this.$refs.pieChart);
      this.chart.setOption(option);
    }, 500); */

    this.$nextTick().then(() => {
      this.chart = echarts.init(this.$refs.pieChart);
      this.chart.setOption(option);
    });
  },
};
</script>

<style lang="less" scoped>
.chart {
  height: 120px;
}
</style>
