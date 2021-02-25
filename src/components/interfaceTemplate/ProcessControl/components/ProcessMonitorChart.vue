<template>
  <section class="layout-grid">
    <PieChart :chart-title="pieChartTitle[0]" :chart-data="pieChartData[0]" class="pie-0" />
    <PieChart :chart-title="pieChartTitle[1]" :chart-data="pieChartData[1]" class="pie-1" />
    <PieChart :chart-title="pieChartTitle[2]" :chart-data="pieChartData[2]" class="pie-2" />
    <PieChart :chart-title="pieChartTitle[3]" :chart-data="pieChartData[3]" class="pie-3" />

    <NodeChart :node-data="nodeData" class="node-chart" />
    <BarChart :bar-title-data="barTitleData" :bar-value-data="barValueData" class="bar-chart" />
  </section>
</template>

<script>
import PieChart from './PieChart';
import NodeChart from './NodeChart';
import BarChart from './BarChart';

export default {
  name: 'ProcessMonitorChart',
  components: {
    PieChart,
    NodeChart,
    BarChart,
  },
  data() {
    return {
      pieChartTitle: [
        '元任务池中安排卫星次数',
        '方案池安排卫星次数',
        '元任务池中目标安排次数',
        '方案池中目标安排次数',
      ],
      pieChartData: [
        [
          { value: 7, name: 'xx1' },
          { value: 2, name: 'xx2' },
          { value: 1, name: 'xx3' },
        ],
        [
          { value: 7, name: 'xx1' },
          { value: 2, name: 'xx2' },
          { value: 1, name: 'xx3' },
        ],
        [
          { value: 7, name: 'xx1' },
          { value: 2, name: 'xx2' },
          { value: 1, name: 'xx3' },
        ],
        [
          { value: 7, name: 'xx1' },
          { value: 2, name: 'xx2' },
          { value: 1, name: 'xx3' },
        ],
      ],
      barTitleData: ['xx-1', 'xx-2', 'xx-3', 'xx-4'],
      barValueData: [19, 10, 19, 10],
      nodeData: [{ wxdh: 'xx-1' }, { wxdh: 'xx-2' }, { wxdh: 'xx-3' }, { wxdh: 'xx-4' }],
    };
  },
};
</script>

<style lang="less" scoped>
.layout-grid {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  grid-template-rows: auto auto;
  grid-template-areas:
    'pie-0 node-chart pie-1'
    'pie-2 bar-chart pie-3';
  gap: 20px;
  .pie-0 {
    grid-area: pie-0;
  }
  .pie-1 {
    grid-area: pie-1;
  }
  .pie-2 {
    grid-area: pie-2;
    margin-top: 16%;
  }
  .pie-3 {
    grid-area: pie-3;
    margin-top: 16%;
  }
  .node-chart {
    grid-area: node-chart;
    margin-top: 5%;
  }
  .bar-chart {
    grid-area: bar-chart;
  }
}
</style>
