<template>
  <div class="status-header">
    <div
      v-for="(item, index) in buttonData"
      :key="index"
      size="small"
      :style="{ backgroundColor: item.bgColor }"
      class="btn"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusHeader',
  data() {
    return {
      buttonData: [
        { text: '完成', bgColor: '#87d068' },
        { text: '失败', bgColor: '#f00' },
        { text: '正在执行', bgColor: '#00f' },
        { text: '待执行', bgColor: '#ccc' },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.status-header {
  display: flex;
  margin-left: 4px;
  .btn {
    color: #fff;
    padding: 2px 8px;
    border-radius: 2px;
    & + .btn {
      margin-left: 4px;
    }
  }
}
</style>
