<template>
  <div class="component-list" @dragstart="handleDragStart">
    <div
      v-for="(element, index) in componentList"
      :key="index"
      class="list"
      draggable
      :data-index="index"
    >
      <a-icon :type="element.type" />
      {{ element.name }}
    </div>
  </div>
</template>

<script>
import componentList from '@/components/componentList.js';

export default {
  name: 'ComponentList',
  data() {
    return {
      componentList,
    };
  },
  methods: {
    // 拖动开始
    handleDragStart(e) {
      e.dataTransfer.setData('index', e.target.dataset.index);
    },
  },
};
</script>

<style lang="less" scoped>
.component-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .list {
    width: 45%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 16px;
    border: 1px solid #ddd;
    background-color: #fff;
    cursor: grab;
  }
}
</style>
