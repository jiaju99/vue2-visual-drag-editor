<template>
  <div class="node-container">
    <div class="node-process">
      <a-avatar size="large" class="node">需求受理</a-avatar>
      <NodeArrow />
      <a-avatar size="large" class="node">需求预处理</a-avatar>
      <NodeArrow />
      <a-avatar size="large" class="node">任务统筹</a-avatar>
      <NodeArrow />
      <a-avatar size="large" class="node">多星规划</a-avatar>
    </div>
    <div class="node-info">
      <div v-for="(item, index) in nodeData" :key="index" class="info">
        <span>{{ item.wxdh }}，</span>
        <span class="btn" @click="launchPlan(index)">启动计划</span>
      </div>
    </div>
  </div>
</template>

<script>
import NodeArrow from './NodeArrow';

export default {
  name: 'NodeChart',
  components: {
    NodeArrow,
  },
  props: {
    nodeData: Array,
  },
  data() {
    return {};
  },
  methods: {
    // 启动计划
    launchPlan(index) {},
  },
};
</script>

<style lang="less" scoped>
.node-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style lang="less" scoped>
.node-container {
  .node-process {
    width: 55%;
    display: flex;
    align-items: center;
    overflow: auto;
    .node {
      flex-shrink: 0;
      background-color: #87d068;
      border: solid 1px #000;
    }
  }

  .node-info {
    max-height: 70px;
    overflow: auto;
    border: solid 1px #000;
    font-size: 10px;
    padding: 6px;
    .info .btn {
      cursor: pointer;
    }
  }
}
</style>
