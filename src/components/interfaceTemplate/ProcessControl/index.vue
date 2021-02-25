<template>
  <div ref="box" class="box">
    <TopBar />
    <a-divider />
    <ProcessMonitorChart />
    <a-divider />
    <ProcessMonitorList />
  </div>
</template>

<script>
import TopBar from './components/TopBar';
import ProcessMonitorChart from './components/ProcessMonitorChart';
import ProcessMonitorList from './components/ProcessMonitorList';

export default {
  name: 'ProcessControl',
  components: {
    TopBar,
    ProcessMonitorChart,
    ProcessMonitorList,
  },
  inheritAttrs: false,
  props: {
    dataSource: Object,
    element: Object,
  },
};
</script>

<style lang="less" scoped>
.box {
  /deep/ .ant-divider {
    background-color: #000;
  }
  /deep/ .ant-divider-horizontal {
    margin: 4px 0 4px;
  }
}
</style>
