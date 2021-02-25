<template>
  <div class="bar-container">
    <h1 class="head-title">实时流程控制</h1>
    <div class="btn-container">
      <a-button
        v-if="isShow"
        type="primary"
        ghost
        size="small"
        class="refresh-button"
        @click="refreshDatas"
      >
        实时刷新
      </a-button>
      <a-switch default-checked @change="switchChange" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    switchChange(checked) {
      this.isShow = checked;
    },
    // 刷新数据
    refreshDatas() {},
  },
};
</script>

<style lang="less" scoped>
.bar-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .head-title {
    margin: 0;
    font-size: 24px;
  }

  .btn-container {
    margin-bottom: 2px;
    .refresh-button {
      margin-right: 8px;
    }
  }
}
</style>
