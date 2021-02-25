<template>
  <div ref="barChart" class="chart"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'BarChart',
  props: {
    barTitleData: {
      type: Array,
    },
    barValueData: {
      type: Array,
    },
  },
  data() {
    return {
      chart: undefined,
    };
  },
  created() {
    let option = {
      title: {
        text: '元任务池中卫星安排时长',
        left: 'center',
        top: 'bottom',
        textStyle: {
          fontSize: 12,
          fontWeight: 'normal',
          color: '#333',
        },
      },
      grid: {
        top: 50,
        bottom: 50,
      },
      xAxis: {
        name: '卫星',
        type: 'category',
        data: this.barTitleData,
        axisLine: {
          show: true,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        name: '时间（min）',
        type: 'value',
        axisLine: {
          show: true,
        },
      },
      series: [
        {
          data: this.barValueData,
          type: 'bar',
          barWidth: '40%',
        },
      ],
    };

    this.$nextTick().then(() => {
      this.chart = echarts.init(this.$refs.barChart);
      this.chart.setOption(option);
    });
  },
};
</script>

<style lang="less" scoped>
.chart {
  height: 200px;
}
</style>
